// utils/submitOrder.js (final with timestamp + toast support)
// import exportToCSV from './exportToCSV';
import sendViaWhatsApp from './sendViaWhatsApp';

export default function submitOrder({ cart, dealer, vehicleName, vehicleNumber, notes, totalCTN, showToast }) {
  const dealerName = dealer?.["Dealer Name"] || "Unknown Dealer";

  // ✅ 1. Create safe, timestamped filename
  const timestamp = new Date().toLocaleString().replace(/[/,: ]+/g, "_");
  const safeDealer = dealerName.replace(/\s+/g, "_");
  const filename = `${safeDealer}_${timestamp}`;

  // ✅ 2. Export to CSV with custom filename
 // exportToCSV(cart, filename, vehicleName, vehicleNumber, notes);

  if (typeof showToast === 'function') {
    showToast("🧾 CSV auto-downloaded");
  }

  // ✅ 3. Build WhatsApp message
  let msg = `🛒 *Factory to office Dispatch Summary* \n`;
  // msg += `👤 Dealer: ${dealerName}\n`;
	msg += `👤 सरना से ऑफिस\n`;
  cart.forEach(item => {
    const totalItemQty = item.entries.reduce(
      (sum, e) => sum + ((e.qty || 0) * (e.ctn || 0)),
      0
    );
<p className="font-bold text-lg">{item.name}</p>

    msg += `\n\n\n 🔹 *${item.name}* Total= *${totalItemQty}* pcs`;
	
    item.entries.forEach(entry => {
      msg += `\n  Batch: ${entry.batch || '-'}, *${entry.qty || 0}* pc,  X ${entry.ctn 	|| 0 } कार्टून : `;
    });
  });

  msg += `\n\n\n\n\n\n🚛 Vehicle: ${vehicleName || 'N/A'} (${vehicleNumber || 'N/A'})`;
  msg += `\n📦 Total CTNs: ${totalCTN || 0}` ;
  if (notes) msg += `\n📝 Notes: ${notes}`;
  // msg += `\n\n✅ CSV attached. Please review.`;

  console.log("📦 WhatsApp Message Preview:\n", msg);

  // ✅ 4. Open WhatsApp
  sendViaWhatsApp("919929988408", msg);
}
