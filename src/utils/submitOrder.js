// submitOrder.js
import sendViaWhatsApp from './sendViaWhatsApp';
import exportToCSV from './exportToCSV'; // For stock journal Excel

export default function submitOrder({
  cart,
  dealer,
  vehicleName,
  vehicleNumber,
  notes,
  totalCTN,
  showToast
}) {
  try {
    const dealerName = dealer?.["Dealer Name"] || "Unknown Dealer";
    const phoneNumber = dealer?.["Phone Number"] || "919929988408";

    const timestamp = new Date().toLocaleString().replace(/[/,: ]+/g, "_");
    const safeDealer = dealerName.replace(/\s+/g, "_");
    const filename = `${safeDealer}_${timestamp}`;

    // 1. Export Excel
    exportToCSV(cart, filename, vehicleName, vehicleNumber, notes);
    if (typeof showToast === 'function') {
      showToast("🧾 Stock Journal Excel downloaded");
    }

    // 2. Build WhatsApp message
    let msg = `🛒 *Factory to Office Dispatch Summary*\n👤 सरना से ऑफिस\n`;

    cart.forEach(item => {
      const totalQty = item.entries.reduce(
        (sum, e) => sum + ((e.qty || 0) * (e.ctn || 0)),
        0
      );

      msg += `\n\n🔹 *${item.name}* Total = *${totalQty}* pcs`;
      item.entries.forEach(e => {
        msg += `\n  Batch: ${e.batch || '-'}, *${e.qty || 0}* pc × ${e.ctn || 0} कार्टून`;
      });
    });

    msg += `\n\n🚛 Vehicle: ${vehicleName || 'N/A'} (${vehicleNumber || 'N/A'})`;
    msg += `\n📦 Total CTNs: ${totalCTN || 0}`;
    if (notes) msg += `\n📝 Notes: ${notes}`;

    console.log("📦 WhatsApp Message Preview:\n", msg);

    // ✅ Instead of sending now, return the info to caller
    return { success: true, phoneNumber, msg };

  } catch (error) {
    console.error("❌ submitOrder failed:", error);
    if (typeof showToast === 'function') {
      showToast("❌ Failed to export or prepare WhatsApp message");
    }
    return { success: false };
  }
}
