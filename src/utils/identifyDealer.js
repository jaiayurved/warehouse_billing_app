const dealerCodeMap = {
  "1234": {
    "Phone Number": "9829280873",
    "Dealer Name": " Dealer",
    
    "Favorites": []
  },
  "BILL001": {
    "Phone Number": "9929988408",
    "Dealer Name": "ASHISH MEDICAL",
    
    "Favorites": []
  }
};

const identifyDealer = (enteredCode) => {
  const matchedDealer = dealerCodeMap[enteredCode];
  if (matchedDealer) {
    console.log("✅ Code matched:", matchedDealer["Dealer Name"]);
    return matchedDealer;
  } else {
    // ⛔ No alert here. Just return null.
    return null;
  }
};

export default identifyDealer;
