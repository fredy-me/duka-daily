import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { SHOP } from "./mock";

type Column = { header: string; dataKey: string };

function buildPdf(opts: {
  title: string;
  period: string;
  columns: Column[];
  rows: Record<string, string | number>[];
  footers?: { label: string; value: string | number }[];
}) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(SHOP.name, 14, 20);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(SHOP.address, 14, 26);
  doc.setDrawColor(0);
  doc.setLineWidth(0.4);
  doc.line(14, 29, 196, 29);

  // Title
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40);
  doc.text(opts.title, 14, 37);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(`Kipindi: ${opts.period}`, 14, 43);

  // Table
  doc.setTextColor(20);
  autoTable(doc, {
    startY: 48,
    head: [opts.columns.map((c) => c.header)],
    body: opts.rows.map((r) => opts.columns.map((c) => String(r[c.dataKey] ?? ""))),
    styles: { fontSize: 10, cellPadding: 2.5 },
    headStyles: { fillColor: [20, 20, 20], textColor: 255, fontSize: 10 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { left: 14, right: 14 },
  });

  let y = (doc as any).lastAutoTable?.finalY ?? 60;

  // Footers
  if (opts.footers) {
    y += 6;
    for (const f of opts.footers) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(f.label, 14, y);
      doc.text(String(f.value), 196, y, { align: "right" });
      y += 6;
    }
  }

  // Footer
  const generated = new Date().toLocaleString("sw-TZ");
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(130);
  doc.text(`Imetengenezwa: ${generated}`, 14, 290);

  return doc;
}

export function downloadFile(doc: jsPDF, filename: string) {
  doc.save(filename);
}

export function reportsPdf(opts: {
  title: string;
  period: string;
  columns: Column[];
  rows: Record<string, string | number>[];
  footers?: { label: string; value: string | number }[];
  filename: string;
}) {
  const doc = buildPdf(opts);
  downloadFile(doc, opts.filename);
}
