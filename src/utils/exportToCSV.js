// src/utils/exportToCSV.js (Updated to include MFG & EXP)
import { saveAs } from 'file-saver';

const exportToCSV = (cart, dealerName, vehicleName, vehicleNumber, notes) => {
  const headers = [
    'Date',
    'Dealer Name',
    'Product Name',
    'Batch No.',
    'MFG Date',
    'EXP Date',
    'Qty per Carton',
    'No. of Cartons',
    'Total Qty',
    'Vehicle Name',
    'Vehicle Number',
    'Notes'
  ];

  const date = new Date().toLocaleDateString();

  const rows = cart.flatMap(item => 
    item.entries.map(entry => [
      date,
      dealerName,
      item.name,
      entry.batch || '-',
      entry.mfg || '-',
      entry.exp || '-',
      entry.qty || 0,
      entry.ctn || 0,
      (entry.qty || 0) * (entry.ctn || 0),
      vehicleName,
      vehicleNumber,
      notes || ""
    ])
  );

  const csvContent = [headers, ...rows]
    .map(e => e.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  saveAs(blob, `JAI_Ayurved_Order_${Date.now()}.csv`);
};

export default exportToCSV;
