import { safeText } from './utils.js';

export function generateDocuments(templateContent, rows, mapping) {
  const zip = new JSZip();

  rows.forEach((row, i) => {
    const data = buildData(row, mapping);

    const doc = new docxtemplater(new PizZip(templateContent), {
      paragraphLoop: true,
      linebreaks: true
    });

    doc.render(data);

    const blob = doc.getZip().generate({ type: "blob" });

    const filename = (data.descriptive_title || `file_${i}`)
      .replace(/[^a-z0-9]/gi, "_");

    zip.file(filename + ".docx", blob);
  });

  return zip.generateAsync({ type: "blob" });
}

function buildData(row, mapping) {
  const obj = {};

  Object.keys(mapping).forEach(key => {
    obj[key] = safeText(row[mapping[key]]);
  });

  return obj;
}