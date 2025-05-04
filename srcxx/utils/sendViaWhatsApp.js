const sendViaWhatsApp = (phone, message) => {
  if (!message) {
    console.warn("⚠️ No message provided to sendViaWhatsApp.");
    return;
  }

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;
  console.log("🔗 WhatsApp URL:", url);
  window.open(url, "_blank");
};

export default sendViaWhatsApp;
