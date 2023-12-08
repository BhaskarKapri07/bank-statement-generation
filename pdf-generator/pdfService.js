const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generatePDF = (transactions, userEmail) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, `${userEmail}-transactions.pdf`);

  doc.pipe(fs.createWriteStream(filePath));

  doc.info.Title = "Transactions";
  doc.info.Author = "Banking App";

  doc.fontSize(20).text("Transactions", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Statement for ${userEmail}`, { align: "center" });
  doc.moveDown(2);

  doc.fontSize(12).text("Date", { continued: true }).text("Amount", 150);

  transactions.forEach((transaction) => {
    doc
      .text(transaction.date_of_transaction, { continued: true })
      .text(`$${transaction.amount}`, 150);
  });

  doc.end();

  return filePath;
};

module.exports = {
  generatePDF,
};
