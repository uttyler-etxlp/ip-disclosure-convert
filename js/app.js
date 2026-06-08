console.log("App loaded successfully");
``

import { parseCSV } from './parser.js';
import { autoMap, saveMapping, loadMapping, TEMPLATE_FIELDS } from './mapper.js';
import { generateDocuments } from './docgen.js';

let rows = [];
let headers = [];
let mapping = {};

const fileInput = document.getElementById("csvFile");
const preview = document.getElementById("preview");
const mappingUI = document.getElementById("mappingUI");
const generateBtn = document.getElementById("generateBtn");
const status = document.getElementById("status");

fileInput.addEventListener("change", e => {
  parseCSV(e.target.files[0], data => {
    rows = data;
    if (!rows || rows.length === 0) {
  alert("CSV appears to be empty or invalid.");
  return;
}

headers = Object.keys(rows[0]).filter(h => h.trim() !== "");
``
    init();
  });
});

function init() {
  console.log("Initializing UI");

  mapping = loadMapping();

  if (!Object.keys(mapping).length) {
    mapping = autoMap(headers);
  }

  renderPreview();
  renderMappingUI();
}

function renderPreview() {
  let html = "<table class='border text-xs'><tr>";

  headers.forEach(h => html += `<th class="border px-1">${h}</th>`);
  html += "</tr>";

  rows.slice(0, 3).forEach(r => {
    html += "<tr>";
    headers.forEach(h => html += `<td class="border px-1">${r[h] || ""}</td>`);
    html += "</tr>";
  });

  preview.innerHTML = html + "</table>";
}

function renderMappingUI() {
  let html = "<h3 class='font-semibold'>Field Mapping</h3>";

  TEMPLATE_FIELDS.forEach(f => {
    html += `
      <div class="mb-2">
        <label class="block">${f}</label>
        <select data-field="${f}" class="border w-full">
          ${headers.map(h =>
            `<option value="${h}" ${mapping[f] === h ? "selected" : ""}>${h}</option>`
          )}
        </select>
      </div>
    `;
  });

  mappingUI.innerHTML = html;

  document.querySelectorAll("select").forEach(s => {
    s.addEventListener("change", e => {
      mapping[e.target.dataset.field] = e.target.value;
      saveMapping(mapping);
    });
  });
}

generateBtn.addEventListener("click", async () => {
  try {
    status.innerText = "Processing...";
    generateBtn.disabled = true;

    const res = await fetch("./template.docx");

    if (!res.ok) {
      throw new Error("template.docx not found");
    }

    const template = await res.arrayBuffer();

    const blob = await generateDocuments(template, rows, mapping);

    saveAs(blob, "outputs.zip");

    status.innerText = "Done!";
  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
    status.innerText = "Error occurred";
  } finally {
    generateBtn.disabled = false;
  }
});
