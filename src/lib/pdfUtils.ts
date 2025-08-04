import jsPDF from 'jspdf';
import { FormData } from '@/types/form';

export function generatePDF(data: FormData) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("User Details", 20, 20);
  doc.setFontSize(12);

  doc.text(`Name: ${data.name}`, 20, 40);
  doc.text(`Email: ${data.email}`, 20, 50);
  doc.text(`Phone: ${data.phone}`, 20, 60);
  doc.text(`Position: ${data.position}`, 20, 70);
  doc.text("Description:", 20, 80);
  doc.text(data.description || "N/A", 20, 90, { maxWidth: 170 });

  doc.save("user-details.pdf");
}
