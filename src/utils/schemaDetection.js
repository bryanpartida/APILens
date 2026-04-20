const IMAGE_KEYWORDS = [
  "image",
  "imageurl",
  "avatar",
  "logo",
  "photo",
  "thumbnail",
  "icon",
  "poster",
  "cover",
  "banner",
  "crest",
];

const TITLE_KEYWORDS = [
  "name",
  "title",
  "label",
  "username",
  "team",
  "productname",
  "headline",
];

export function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function isPrimitive(value) {
  return value === null || (typeof value !== "object" && typeof value !== "function");
}

export function detectDateLike(value) {
  if (typeof value !== "string") {
    return false;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return false;
  }

  const looksDateLike =
    /^\d{4}-\d{2}-\d{2}/.test(trimmed) ||
    /^\d{4}\/\d{2}\/\d{2}/.test(trimmed) ||
    /^[A-Z][a-z]{2,8}\s+\d{1,2},\s+\d{4}$/.test(trimmed);

  return looksDateLike && !Number.isNaN(Date.parse(trimmed));
}

export function detectImageLikeField(key, value) {
  if (typeof value !== "string") {
    return false;
  }

  const normalizedKey = key.toLowerCase();
  const normalizedValue = value.toLowerCase();

  return (
    IMAGE_KEYWORDS.some((keyword) => normalizedKey.includes(keyword)) ||
    /^https?:\/\//.test(normalizedValue) &&
      /\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/i.test(normalizedValue) ||
    normalizedValue.includes("images.unsplash.com") ||
    normalizedValue.includes("cloudinary") ||
    normalizedValue.includes("imgur")
  );
}

export function detectPotentialTitleField(key) {
  return TITLE_KEYWORDS.some((keyword) => key.toLowerCase() === keyword);
}

function getArrayValueType(value) {
  if (!Array.isArray(value)) {
    return "unknown";
  }

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

export function getFieldValueType(key, value) {
  if (Array.isArray(value)) {
    return getArrayValueType(value);
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

export function getAllKeysFromItems(items) {
  return Array.from(
    new Set(items.filter(isPlainObject).flatMap((item) => Object.keys(item))),
  );
}

export function inferFieldTypes(items) {
  const fieldTypes = {};

  items.filter(isPlainObject).forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (!fieldTypes[key]) {
        fieldTypes[key] = new Set();
      }

      fieldTypes[key].add(getFieldValueType(key, value));
    });
  });

  return Object.fromEntries(
    Object.entries(fieldTypes).map(([key, types]) => [key, Array.from(types)]),
  );
}

function detectFieldsByPredicate(items, predicate) {
  return Array.from(
    new Set(
      items
        .filter(isPlainObject)
        .flatMap((item) =>
          Object.entries(item)
            .filter(([key, value]) => predicate(key, value))
            .map(([key]) => key),
        ),
    ),
  );
}

export function detectNumericFields(items) {
  return detectFieldsByPredicate(
    items,
    (_, value) => typeof value === "number" && Number.isFinite(value),
  );
}

export function detectStringFields(items) {
  return detectFieldsByPredicate(
    items,
    (key, value) =>
      typeof value === "string" &&
      !detectDateLike(value) &&
      !detectImageLikeField(key, value),
  );
}

export function detectBooleanFields(items) {
  return detectFieldsByPredicate(items, (_, value) => typeof value === "boolean");
}

export function detectDateLikeFields(items) {
  return detectFieldsByPredicate(items, (_, value) => detectDateLike(value));
}

export function detectImageLikeFields(items) {
  return detectFieldsByPredicate(items, (key, value) => detectImageLikeField(key, value));
}

export function detectPotentialTitleFields(items) {
  return detectFieldsByPredicate(
    items,
    (key, value) => typeof value === "string" && detectPotentialTitleField(key),
  );
}
