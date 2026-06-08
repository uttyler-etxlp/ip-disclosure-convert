export function safeText(val) {
  return (val || "").toString().replace(/[<>]/g, "").trim();
}

export function normalize(str) {
  return str.toLowerCase().replace(/[_ ]/g, "");
}