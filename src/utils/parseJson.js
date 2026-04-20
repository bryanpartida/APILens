export function safeParseJson(input) {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      data: null,
      error: "Paste some JSON first so APILens has something to analyze.",
    };
  }

  try {
    return {
      data: JSON.parse(trimmed),
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: `That JSON could not be parsed. ${error.message}`,
    };
  }
}
