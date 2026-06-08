export function safeText(val) {
  if (!val) return "";

  let cleaned = val.toString().replace(/[<>]/g, "").trim();

  // Normalize for comparison
  const normalized = cleaned.toLowerCase();

  // ❌ Known "junk" / label-only values → treat as empty
  const INVALID_VALUES = [
    "descriptive title of invention:",
    "corresponding contributor:",
    "other contributors:",
    "summary:",
    "what particular features of the invention are unusual?",
    "how does it differ from present technology?",
    "what problem(s) does it solve?",
    "what advantages over current technologies does it possess?",
    "types of intellectual property:",
    "if, other:"
  ];

  // If value exactly matches or is just a label → remove it
  if (
    INVALID_VALUES.includes(normalized) ||
    normalized.endsWith(":") && normalized.length < 80
  ) {
    return "";
  }

  return cleaned;
}

export function normalize(str) {
  return str.toLowerCase().replace(/[_ ]/g, "");
}
