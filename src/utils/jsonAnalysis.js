import {
  detectBooleanFields,
  detectDateLike,
  detectDateLikeFields,
  detectImageLikeField,
  detectImageLikeFields,
  detectNumericFields,
  detectPotentialTitleField,
  detectPotentialTitleFields,
  detectStringFields,
  getAllKeysFromItems,
  inferFieldTypes,
  isPlainObject,
  isPrimitive,
} from "./schemaDetection.js";

const MAX_STRUCTURE_KEYS = 10;
const COLLECTION_SAMPLE_LIMIT = 5;
const DISCRIMINATOR_FIELDS = [
  "type",
  "kind",
  "category",
  "event",
  "class",
  "__typename",
];

function getTopLevelKeys(data) {
  if (Array.isArray(data)) {
    return getAllKeysFromItems(data);
  }

  if (isPlainObject(data)) {
    return Object.keys(data);
  }

  return [];
}

function normalizeRootType(data) {
  if (Array.isArray(data)) {
    return "array";
  }

  if (isPlainObject(data)) {
    return "object";
  }

  return "primitive";
}

export function getRootType(data) {
  return normalizeRootType(data);
}

export function getValueType(value, key = "") {
  if (Array.isArray(value)) {
    if (!value.length) {
      return "array";
    }

    const objectCount = value.filter(isPlainObject).length;
    const primitiveCount = value.filter(isPrimitive).length;

    if (objectCount === value.length) {
      return "array<object>";
    }

    if (primitiveCount === value.length) {
      return "array<primitive>";
    }

    return "array<mixed>";
  }

  if (isPlainObject(value)) {
    return "object";
  }

  if (value === null) {
    return "null";
  }

  if (typeof value === "string" && detectImageLikeField(key, value)) {
    return "image-url";
  }

  if (typeof value === "string" && detectDateLike(value)) {
    return "date";
  }

  return typeof value;
}

function formatPath(segments) {
  return segments.reduce((path, segment) => {
    if (segment === "[]") {
      return `${path}[]`;
    }

    return path ? `${path}.${segment}` : segment;
  }, "");
}

function getLastNamedSegment(segments) {
  for (let index = segments.length - 1; index >= 0; index -= 1) {
    if (segments[index] !== "[]") {
      return segments[index];
    }
  }

  return "root";
}

function getPathDepth(segments) {
  return segments.filter((segment) => segment !== "[]").length;
}

function getCollectionKind(items) {
  if (!items.length) {
    return "array-empty";
  }

  const objectCount = items.filter(isPlainObject).length;
  const primitiveCount = items.filter(isPrimitive).length;

  if (objectCount === items.length) {
    return "array-of-objects";
  }

  if (primitiveCount === items.length) {
    return "array-of-primitives";
  }

  return "array-mixed";
}

function getSchemaSignature(item) {
  return Object.entries(item)
    .map(([key, value]) => `${key}:${getValueType(value, key)}`)
    .sort()
    .join("|");
}

function getBestDiscriminatorField(items) {
  const objectItems = items.filter(isPlainObject);

  if (objectItems.length < 2) {
    return null;
  }

  const candidates = DISCRIMINATOR_FIELDS.map((field) => {
    const values = objectItems
      .map((item) => item[field])
      .filter((value) => isPrimitive(value) && value !== null && value !== "");
    const uniqueValues = new Set(values.map(String));

    return {
      field,
      coverage: values.length / objectItems.length,
      uniqueCount: uniqueValues.size,
    };
  });

  return (
    candidates
      .filter((candidate) => candidate.coverage >= 0.6 && candidate.uniqueCount > 1)
      .sort(
        (left, right) =>
          right.coverage - left.coverage || right.uniqueCount - left.uniqueCount,
      )[0]?.field || null
  );
}

function buildSchemaGroups(items) {
  const objectItems = items.filter(isPlainObject);

  if (!objectItems.length) {
    return [];
  }

  const discriminatorField = getBestDiscriminatorField(objectItems);
  const groups = new Map();

  objectItems.forEach((item) => {
    const schemaSignature = getSchemaSignature(item);
    const discriminatorValue = discriminatorField ? item[discriminatorField] : null;
    const groupKey =
      discriminatorField && discriminatorValue !== undefined && discriminatorValue !== null
        ? `${discriminatorField}:${String(discriminatorValue)}`
        : schemaSignature;
    const label =
      discriminatorField && discriminatorValue !== undefined && discriminatorValue !== null
        ? `${discriminatorField}: ${String(discriminatorValue)}`
        : `schema ${groups.size + 1}`;

    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        id: groupKey,
        label,
        discriminatorField,
        signature: schemaSignature,
        items: [],
      });
    }

    groups.get(groupKey).items.push(item);
  });

  return Array.from(groups.values())
    .map((group) => ({
      ...group,
      itemCount: group.items.length,
      fields: getAllKeysFromItems(group.items),
      fieldTypes: inferFieldTypes(group.items),
    }))
    .sort((left, right) => right.itemCount - left.itemCount || left.label.localeCompare(right.label));
}

function buildObjectSummary(object, pathSegments) {
  const primitiveFields = Object.entries(object)
    .filter(([, value]) => isPrimitive(value))
    .map(([key, value]) => ({
      key,
      value,
      type: getValueType(value, key),
    }));

  return {
    path: formatPath(pathSegments),
    key: getLastNamedSegment(pathSegments),
    depth: getPathDepth(pathSegments),
    keyCount: Object.keys(object).length,
    primitiveFields,
    nestedFieldCount: Object.keys(object).length - primitiveFields.length,
  };
}

function getRepresentativeObject(items) {
  return items
    .filter(isPlainObject)
    .slice(0, COLLECTION_SAMPLE_LIMIT)
    .reduce((sample, item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (!(key in sample) && value !== undefined) {
          sample[key] = value;
        }
      });

      return sample;
    }, {});
}

function getStructureSummary(label, value) {
  if (Array.isArray(value)) {
    const kind = getCollectionKind(value);
    const kindLabel =
      kind === "array-of-objects"
        ? "objects"
        : kind === "array-of-primitives"
          ? "items"
          : kind === "array-empty"
            ? "empty"
            : "mixed";

    return `array[${value.length}]${kindLabel === "empty" ? "" : ` ${kindLabel}`}`;
  }

  if (isPlainObject(value)) {
    return `object (${Object.keys(value).length} keys)`;
  }

  return getValueType(value, label);
}

function buildStructureNode(label, value, depth = 0) {
  const node = {
    label,
    type: normalizeRootType(value),
    summary: getStructureSummary(label, value),
    children: [],
  };

  if (Array.isArray(value)) {
    if (!value.length) {
      return node;
    }

    const kind = getCollectionKind(value);

    if (kind === "array-of-objects") {
      const sampleObject = getRepresentativeObject(value);
      node.children = Object.entries(sampleObject)
        .slice(0, MAX_STRUCTURE_KEYS)
        .map(([key, childValue]) => buildStructureNode(key, childValue, depth + 1));
    } else if (kind === "array-of-primitives") {
      const sampleTypes = Array.from(new Set(value.map((item) => getValueType(item))));
      node.children = sampleTypes.map((type) => ({
        label: "item",
        type: "primitive",
        summary: type,
        children: [],
      }));
    } else {
      const sampleValue = value.find((item) => item !== undefined);
      if (sampleValue !== undefined) {
        node.children = [buildStructureNode("item", sampleValue, depth + 1)];
      }
    }

    return node;
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value);
    node.children = entries
      .slice(0, MAX_STRUCTURE_KEYS)
      .map(([key, childValue]) => buildStructureNode(key, childValue, depth + 1));

    if (entries.length > MAX_STRUCTURE_KEYS) {
      node.children.push({
        label: `+${entries.length - MAX_STRUCTURE_KEYS} more fields`,
        type: "meta",
        summary: "",
        children: [],
      });
    }
  }

  return node;
}

function getObjectFieldInsights(object) {
  const primitiveEntries = Object.entries(object).filter(([, value]) => isPrimitive(value));

  return {
    numericFields: primitiveEntries
      .filter(([, value]) => typeof value === "number")
      .map(([key]) => key),
    stringFields: primitiveEntries
      .filter(
        ([key, value]) =>
          typeof value === "string" &&
          !detectDateLike(value) &&
          !detectImageLikeField(key, value),
      )
      .map(([key]) => key),
    booleanFields: primitiveEntries
      .filter(([, value]) => typeof value === "boolean")
      .map(([key]) => key),
    dateLikeFields: primitiveEntries
      .filter(([, value]) => detectDateLike(value))
      .map(([key]) => key),
    imageFields: primitiveEntries
      .filter(([key, value]) => detectImageLikeField(key, value))
      .map(([key]) => key),
    titleFields: primitiveEntries
      .filter(([key]) => detectPotentialTitleField(key))
      .map(([key]) => key),
    collectionFields: Object.entries(object)
      .filter(([, value]) => Array.isArray(value))
      .map(([key]) => key),
  };
}

function scoreCollection(collection) {
  let score = 0;

  if (collection.kind === "array-of-objects") {
    score += 120;
  } else if (collection.kind === "array-of-primitives") {
    score += 45;
  }

  if (collection.path === "root") {
    score += 60;
  }

  score += Math.min(collection.itemCount, 50);
  score += Math.max(0, 24 - collection.depth * 5);
  score += collection.titleFields.length ? 16 : 0;
  score += collection.imageFields.length ? 10 : 0;
  score += collection.dateLikeFields.length ? 8 : 0;
  score += /data|items|results|records|list|movies|players|teams|matches|products|users/i.test(
    collection.key,
  )
    ? 12
    : 0;
  score += collection.schemaGroups.length > 1 ? 6 : 0;
  score -= collection.isDerived ? 18 : 0;

  return score;
}

function analyzeCollection(items, pathSegments, options = {}) {
  const objectItems = items.filter(isPlainObject);
  const primitiveItems = items.filter(isPrimitive);
  const kind = getCollectionKind(items);
  const fields = objectItems.length ? getAllKeysFromItems(objectItems) : ["value"];
  const fieldTypes = objectItems.length
    ? inferFieldTypes(objectItems)
    : items.length
      ? { value: Array.from(new Set(items.map((item) => getValueType(item)))) }
      : {};
  const schemaGroups = buildSchemaGroups(objectItems);

  const collection = {
    path: options.path || formatPath(pathSegments),
    key: options.key || getLastNamedSegment(pathSegments),
    depth: getPathDepth(pathSegments),
    itemCount: items.length,
    objectItemCount: objectItems.length,
    primitiveItemCount: primitiveItems.length,
    items,
    kind,
    fields,
    fieldTypes,
    schemaGroups,
    isDerived: Boolean(options.isDerived),
    sourcePath: options.sourcePath || null,
    groupLabel: options.groupLabel || null,
    numericFields: objectItems.length ? detectNumericFields(objectItems) : [],
    stringFields: objectItems.length ? detectStringFields(objectItems) : [],
    booleanFields: objectItems.length ? detectBooleanFields(objectItems) : [],
    dateLikeFields: objectItems.length ? detectDateLikeFields(objectItems) : [],
    imageFields: objectItems.length ? detectImageLikeFields(objectItems) : [],
    titleFields: objectItems.length ? detectPotentialTitleFields(objectItems) : [],
  };

  return {
    ...collection,
    score: scoreCollection(collection),
  };
}

function inspectNestedData(data) {
  const collectionMap = new Map();
  const nestedObjectMap = new Map();

  function addCollection(value, pathSegments) {
    const path = formatPath(pathSegments);
    if (!path || collectionMap.has(path)) {
      return;
    }

    const collection = analyzeCollection(value, pathSegments);
    collectionMap.set(path, collection);

    const objectItems = value.filter(isPlainObject);
    const primitiveItems = value.filter(isPrimitive);

    if (collection.kind === "array-mixed" && objectItems.length) {
      const objectPath = `${path}.objects`;
      if (!collectionMap.has(objectPath)) {
        collectionMap.set(
          objectPath,
          analyzeCollection(objectItems, [...pathSegments, "objects"], {
            path: objectPath,
            key: "objects",
            isDerived: true,
            sourcePath: path,
            groupLabel: "Object items",
          }),
        );
      }
    }

    if (collection.kind === "array-mixed" && primitiveItems.length) {
      const valuePath = `${path}.values`;
      if (!collectionMap.has(valuePath)) {
        collectionMap.set(
          valuePath,
          analyzeCollection(primitiveItems, [...pathSegments, "values"], {
            path: valuePath,
            key: "values",
            isDerived: true,
            sourcePath: path,
            groupLabel: "Primitive values",
          }),
        );
      }
    }

    collection.schemaGroups
      .filter((group) => collection.schemaGroups.length > 1 && group.items.length)
      .slice(0, 6)
      .forEach((group, index) => {
        const suffix = group.label
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") || `schema-${index + 1}`;
        const groupPath = `${path}#${suffix}`;

        if (collectionMap.has(groupPath)) {
          return;
        }

        collectionMap.set(
          groupPath,
          analyzeCollection(group.items, [...pathSegments, suffix], {
            path: groupPath,
            key: suffix,
            isDerived: true,
            sourcePath: path,
            groupLabel: group.label,
          }),
        );
      });
  }

  function addNestedObject(value, pathSegments) {
    const path = formatPath(pathSegments);
    if (!path || nestedObjectMap.has(path)) {
      return;
    }

    nestedObjectMap.set(path, buildObjectSummary(value, pathSegments));
  }

  function walk(value, pathSegments) {
    if (Array.isArray(value)) {
      addCollection(value, pathSegments);

      value
        .filter(isPlainObject)
        .slice(0, COLLECTION_SAMPLE_LIMIT)
        .forEach((item) => {
          Object.entries(item).forEach(([key, childValue]) => {
            const childPath = [...pathSegments, "[]", key];

            if (Array.isArray(childValue)) {
              walk(childValue, childPath);
            } else if (isPlainObject(childValue)) {
              addNestedObject(childValue, childPath);
              walk(childValue, childPath);
            }
          });
        });

      return;
    }

    if (isPlainObject(value)) {
      Object.entries(value).forEach(([key, childValue]) => {
        const childPath = [...pathSegments, key];

        if (Array.isArray(childValue)) {
          walk(childValue, childPath);
        } else if (isPlainObject(childValue)) {
          addNestedObject(childValue, childPath);
          walk(childValue, childPath);
        }
      });
    }
  }

  if (Array.isArray(data)) {
    walk(data, ["root"]);
  } else if (isPlainObject(data)) {
    walk(data, []);
  }

  return {
    collections: Array.from(collectionMap.values()).sort(
      (left, right) =>
        Number(left.isDerived) - Number(right.isDerived) ||
        left.depth - right.depth ||
        right.score - left.score,
    ),
    nestedObjects: Array.from(nestedObjectMap.values()),
  };
}

export function findCollections(data) {
  return inspectNestedData(data).collections;
}

function buildRootSummary(data, collections, nestedObjects) {
  const rootType = normalizeRootType(data);

  if (rootType === "object") {
    const primitiveFields = Object.entries(data)
      .filter(([, value]) => isPrimitive(value))
      .map(([key, value]) => ({
        key,
        value,
        type: getValueType(value, key),
      }));

    return {
      kind: "root-object",
      primitiveFields,
      nestedObjects: nestedObjects.filter((item) => item.depth === 1),
      collectionFields: collections.filter((collection) => collection.depth === 1),
      fieldInsights: getObjectFieldInsights(data),
    };
  }

  if (rootType === "array") {
    const rootCollection = collections.find((collection) => collection.path === "root") || null;

    return {
      kind: "root-array",
      itemCount: data.length,
      rootCollection,
      primitiveFields: [],
      nestedObjects: [],
      collectionFields: rootCollection ? [rootCollection] : [],
      fieldInsights: rootCollection
        ? {
            numericFields: rootCollection.numericFields,
            stringFields: rootCollection.stringFields,
            booleanFields: rootCollection.booleanFields,
            dateLikeFields: rootCollection.dateLikeFields,
            imageFields: rootCollection.imageFields,
            titleFields: rootCollection.titleFields,
            collectionFields: ["root"],
          }
        : {
            numericFields: [],
            stringFields: [],
            booleanFields: [],
            dateLikeFields: [],
            imageFields: [],
            titleFields: [],
            collectionFields: [],
          },
    };
  }

  return {
    kind: "root-primitive",
    value: data,
    valueType: getValueType(data),
    primitiveFields: [],
    nestedObjects: [],
    collectionFields: [],
    fieldInsights: {
      numericFields: typeof data === "number" ? ["value"] : [],
      stringFields: typeof data === "string" ? ["value"] : [],
      booleanFields: typeof data === "boolean" ? ["value"] : [],
      dateLikeFields: detectDateLike(data) ? ["value"] : [],
      imageFields: typeof data === "string" && detectImageLikeField("value", data) ? ["value"] : [],
      titleFields: [],
      collectionFields: [],
    },
  };
}

export function getRootSummary(data) {
  const { collections, nestedObjects } = inspectNestedData(data);
  return buildRootSummary(data, collections, nestedObjects);
}

export function analyzeJson(data) {
  const rootType = normalizeRootType(data);
  const topLevelKeys = getTopLevelKeys(data);
  const { collections, nestedObjects } = inspectNestedData(data);

  return {
    data,
    rootType,
    topLevelKeys,
    collectionCount: collections.length,
    nestedObjectCount: nestedObjects.length,
    rootSummary: buildRootSummary(data, collections, nestedObjects),
    collections,
    nestedObjects,
    structureOverview: buildStructureNode("root", data),
  };
}
