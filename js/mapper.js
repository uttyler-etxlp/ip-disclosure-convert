import { normalize } from './utils.js';

export const TEMPLATE_FIELDS = [
  "descriptive_title",
  "corresponding_contributor",
  "other_contributors",
  "contributor_form_url",
  "summary",
  "unusual_features",
  "differ_from_present",
  "problems_solved",
  "advantages",
  "ip_types_selected",
  "ip_types_other",
  "attach_pages_url",
  "material_incorporated",
  "what_material",
  "source_selected",
  "source_ut_lab",
  "source_company",
  "source_other_institution",
  "source_other",
  "material_covered_by_agreement",
  "agreement_copy_url",
  "potential_uses_selected",
  "potential_uses_other",
  "affects_diseases",
  "list_indication",
  "companies_interested",
  "worked_with_companies",
  "list_companies",
  "has_publications",
  "aided_by_grant",
  "pending_grant",
  "encumbered"
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
