const titleCandidates = ["name", "title", "username", "team", "label", "productName"];
const descriptionCandidates = ["description", "summary", "body", "bio", "content"];
const imageCandidates = [
  "image",
  "imageUrl",
  "avatar",
  "logo",
  "photo",
  "thumbnail",
  "crest",
  "icon",
];

function findMatchingField(object, candidates) {
  if (!object || typeof object !== "object" || Array.isArray(object)) {
    return null;
  }

  const loweredMap = Object.keys(object).reduce((accumulator, key) => {
    accumulator[key.toLowerCase()] = key;
    return accumulator;
  }, {});

  return candidates.find((candidate) => loweredMap[candidate.toLowerCase()]) ?? null;
}

export function findTitleField(object) {
  const match = findMatchingField(object, titleCandidates);
  if (!match) {
    return null;
  }

  return Object.keys(object).find((key) => key.toLowerCase() === match.toLowerCase()) ?? null;
}

export function findDescriptionField(object) {
  const match = findMatchingField(object, descriptionCandidates);
  if (!match) {
    return null;
  }

  return Object.keys(object).find((key) => key.toLowerCase() === match.toLowerCase()) ?? null;
}

export function findImageField(object) {
  const match = findMatchingField(object, imageCandidates);
  if (!match) {
    return null;
  }

  return Object.keys(object).find((key) => key.toLowerCase() === match.toLowerCase()) ?? null;
}
