import { isPlainObject } from "./schemaDetection.js";

export function truncateText(text, maxLength = 120) {
  const stringValue = String(text);

  if (stringValue.length <= maxLength) {
    return stringValue;
  }

  return `${stringValue.slice(0, maxLength - 3)}...`;
}

export function formatValue(value) {
  if (value === null) {
    return "null";
  }

  if (value === undefined) {
    return "undefined";
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  if (typeof value === "number") {
    return Number.isInteger(value) ? String(value) : value.toLocaleString();
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return JSON.stringify(value, null, 2);
  }

  if (isPlainObject(value)) {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}

export function summarizeValue(value) {
  if (Array.isArray(value)) {
    if (!value.length) {
      return "Array (0 items)";
    }

    const objectCount = value.filter(
      (item) => item !== null && typeof item === "object" && !Array.isArray(item),
    ).length;

    if (objectCount === value.length) {
      return `Array of ${value.length} objects`;
    }

    return `Array of ${value.length} items`;
  }

  if (value !== null && typeof value === "object") {
    return `Nested object (${Object.keys(value).length} fields)`;
  }

  return truncateText(formatValue(value), 140);
}
