import {
  detectDateLike,
  detectImageLikeField,
  detectPotentialTitleField,
  isPrimitive,
} from "./schemaDetection.js";

const titleCandidates = ["name", "title", "username", "team", "label", "productName"];
const descriptionCandidates = ["description", "summary", "body", "bio", "content", "overview"];

function getCaseInsensitiveField(object, candidates, predicate = null) {
  if (!object || typeof object !== "object" || Array.isArray(object)) {
    return null;
  }

  const entries = Object.entries(object);
  const loweredMap = Object.fromEntries(
    entries.map(([key, value]) => [key.toLowerCase(), { key, value }]),
  );

  for (const candidate of candidates) {
    const match = loweredMap[candidate.toLowerCase()];
    if (match && (!predicate || predicate(match.key, match.value))) {
      return match.key;
    }
  }

  return null;
}

export function findTitleField(object) {
  return (
    getCaseInsensitiveField(object, titleCandidates, (_, value) => typeof value === "string") ||
    Object.keys(object || {}).find((key) => detectPotentialTitleField(key)) ||
    null
  );
}

export function findDescriptionField(object) {
  return getCaseInsensitiveField(
    object,
    descriptionCandidates,
    (_, value) => typeof value === "string",
  );
}

export function findImageField(object) {
  if (!object || typeof object !== "object" || Array.isArray(object)) {
    return null;
  }

  return (
    Object.keys(object).find((key) => detectImageLikeField(key, object[key])) || null
  );
}

function getStatPriority(key, value) {
  const normalizedKey = key.toLowerCase();

  if (typeof value === "number") {
    return normalizedKey.includes("year") ? 120 : 95;
  }

  if (detectDateLike(value)) {
    return 90;
  }

  if (typeof value === "boolean") {
    return 75;
  }

  if (typeof value === "string") {
    if (/(role|status|type|team|department|genre|category)/i.test(normalizedKey)) {
      return 88;
    }

    if (value.length <= 32) {
      return 65;
    }
  }

  return 20;
}

export function getPreviewStats(object) {
  const titleField = findTitleField(object);
  const descriptionField = findDescriptionField(object);
  const imageField = findImageField(object);
  const excludedFields = new Set([titleField, descriptionField, imageField].filter(Boolean));

  return Object.entries(object || {})
    .filter(([key, value]) => !excludedFields.has(key) && isPrimitive(value) && value !== null)
    .map(([key, value]) => ({
      key,
      value,
      priority: getStatPriority(key, value),
    }))
    .sort((left, right) => right.priority - left.priority)
    .slice(0, 3)
    .map(({ key, value }) => ({ key, value }));
}

export function choosePrimaryCollection(data, collections) {
  if (!collections.length) {
    return null;
  }

  const objectCollections = collections.filter(
    (collection) => collection.kind === "array-of-objects",
  );

  if (Array.isArray(data)) {
    const rootCollection = objectCollections.find((collection) => collection.path === "root");
    if (rootCollection) {
      return rootCollection;
    }
  }

  if (objectCollections.length) {
    return [...objectCollections].sort((left, right) => right.score - left.score)[0];
  }

  const primitiveCollections = collections.filter(
    (collection) => collection.kind === "array-of-primitives",
  );

  return [...primitiveCollections].sort((left, right) => right.score - left.score)[0] || null;
}
