// ResultPDFExport.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SchoolName } from '../../actions/api';

export const exportResultPDF = ({
  studentInfo,
  subjects,
  resultTypes,
  results,
}) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFontSize(16);
  doc.text(SchoolName, pageWidth / 2, 15, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Student Name: ${studentInfo.name}`, 14, 30);
  doc.text(`Roll No: ${studentInfo.rollNo}`, 14, 38);
  doc.text(`Class: ${studentInfo.class}`, 14, 46);
  doc.text(`Section: ${studentInfo.section}`, 14, 54);

  // Build table data
  const tableHead = ['Result Type', ...subjects.map((s) => s.name)];
  const tableBody = resultTypes.map((type) => {
    const row = [type.type];
    subjects.forEach((subject) => {
      const match = results.find(
        (r) => r.resultType === type.id && r.subjectId === subject.id
      );
      row.push(match ? match.marks : '-');
    });
    return row;
  });

  // Table
  doc.autoTable({
    head: [tableHead],
    body: tableBody,
    startY: 65,
    styles: { halign: 'center' },
  });

  const finalY = doc.previousAutoTable.finalY || 100;

  // Signature lines
  doc.text('Guardian Signature: ____________________', 14, finalY + 20);
  doc.text(
    'Principal Signature: ___________________',
    pageWidth / 2 + 10,
    finalY + 20
  );

  // Save PDF
  doc.save(`${studentInfo.name.replace(/\s+/g, '_')}_result.pdf`);
};
