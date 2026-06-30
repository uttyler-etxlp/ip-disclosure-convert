Papa.parse(csv, {
  header: false
});

const labels = rows[1];
const dataRows = rows.slice(3);
