function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function getNumericFields(object) {
  if (!isPlainObject(object)) {
    return [];
  }

  return Object.entries(object)
    .filter(([, value]) => typeof value === "number" && Number.isFinite(value))
    .map(([key]) => key);
}

export function inferFieldTypes(data) {
  const records = Array.isArray(data) ? data.filter(isPlainObject) : [data].filter(isPlainObject);
  const fieldTypes = {};

  records.forEach((record) => {
    Object.entries(record).forEach(([key, value]) => {
      const nextType = Array.isArray(value) ? "array" : value === null ? "null" : typeof value;

      if (!fieldTypes[key]) {
        fieldTypes[key] = new Set();
      }

      fieldTypes[key].add(nextType);
    });
  });

  return Object.fromEntries(
    Object.entries(fieldTypes).map(([key, value]) => [key, Array.from(value)]),
  );
}
