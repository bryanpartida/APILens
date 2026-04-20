function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function getAllKeys(data) {
  if (Array.isArray(data)) {
    return Array.from(
      new Set(data.filter(isPlainObject).flatMap((item) => Object.keys(item))),
    );
  }

  if (isPlainObject(data)) {
    return Object.keys(data);
  }

  return [];
}

export function getRootMetadata(data) {
  const rootType = Array.isArray(data)
    ? "array"
    : data === null
      ? "null"
      : typeof data === "object"
        ? "object"
        : typeof data;
  const keys = getAllKeys(data);

  return {
    rootType,
    itemCount: Array.isArray(data) ? data.length : null,
    keys,
  };
}
