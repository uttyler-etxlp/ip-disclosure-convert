import { normalize } from './utils.js';

export const TEMPLATE_FIELDS = [
  "descriptive_title",
  "corresponding_contributor",
  "other_contributors",
  "summary",
  "unusual_features",
  "differ_from_present",
  "problems_solved",
  "advantages",
  "ip_types_selected"
];

export function autoMap(headers) {
  const mapping = {};

  TEMPLATE_FIELDS.forEach(field => {
    const match = headers.find(h =>
      normalize(h).includes(normalize(field))
    );
    mapping[field] = match || "";
  });

  return mapping;
}

export function saveMapping(map) {
  localStorage.setItem("fieldMap", JSON.stringify(map));
}

export function loadMapping() {
  return JSON.parse(localStorage.getItem("fieldMap") || "{}");
}