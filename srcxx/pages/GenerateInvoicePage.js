import React, { useEffect, useState } from "react";
import PDFInvoiceJAI from "../components/PDFInvoiceJAI";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import PDFInvoiceAMA from '../components/PDFInvoiceAMA';





export default function GenerateInvoicePage() {
  const navigate = useNavigate();
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("invoicePayload");
    if (stored) {
      setPayload(JSON.parse(stored));
    } else {
      alert("⚠️ No invoice data found. Redirecting...");
      navigate("/");
    }
  }, []);

  const handleDownloadPDF = () => {
    const element = document.getElementById("pdf-invoice");
    const opt = {
      margin: 0.5,
      filename: `Invoice_${payload?.buyer?.invoiceNumber || "JAI"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  if (!payload) return null;

  const { cart, buyer, grandTotal } = payload;

  return (
    <div className="p-6">
      {/* ✅ Action Buttons */}
      <div className="flex justify-center gap-4 mb-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          🖨️ Print Invoice
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          📥 Download PDF
        </button>
        <a
          href="/"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          🔙 Back to App
        </a>
      </div>

      {/* ✅ Show Invoice */}
    {/* ✅ Show Invoice */}
{(buyer?.Type || "").toUpperCase() === "JAI" ? (
  <PDFInvoiceJAI cart={cart} buyer={buyer} grandTotal={grandTotal} />
) : (
  <PDFInvoiceAMA cart={cart} buyer={buyer} grandTotal={grandTotal} />
)}




    </div>
  );
}
