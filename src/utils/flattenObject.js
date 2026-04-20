export function flattenObject(object, prefix = "") {
  if (object === null || typeof object !== "object" || Array.isArray(object)) {
    return prefix ? { [prefix]: object } : {};
  }

  return Object.entries(object).reduce((accumulator, [key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      return {
        ...accumulator,
        ...flattenObject(value, nextKey),
      };
    }

    accumulator[nextKey] = value;
    return accumulator;
  }, {});
}

export function formatValue(value) {
  if (value === null) {
    return "null";
  }

  if (value === undefined) {
    return "undefined";
  }

  if (Array.isArray(value)) {
    return value.length ? JSON.stringify(value, null, 2) : "[]";
  }

  if (typeof value === "object") {
    return Object.keys(value).length ? JSON.stringify(value, null, 2) : "{}";
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  return String(value);
}
