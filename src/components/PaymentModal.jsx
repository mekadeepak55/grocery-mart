import React, { useState } from 'react';

const PaymentModal = ({ onClose, onPaymentSuccess }) => {
  const [isUpiSectionOpen, setIsUpiSectionOpen] = useState(false);
  const [isCardSectionOpen, setIsCardSectionOpen] = useState(false);
  const [upiId, setUpiId] = useState("");

  const toggleUpi = () => { setIsUpiSectionOpen(!isUpiSectionOpen); if(!isUpiSectionOpen) setIsCardSectionOpen(false); };
  const toggleCard = () => { setIsCardSectionOpen(!isCardSectionOpen); if(!isCardSectionOpen) setIsUpiSectionOpen(false); };

  const handleUpiCheckout = () => {
    if (!upiId.includes('@')) { alert("Please enter a valid UPI ID"); return; }
    alert(`Payment Successful via UPI: ${upiId}`);
    onPaymentSuccess();
  };

  const handleCardCheckout = () => {
    alert("Payment Successful via Card!");
    onPaymentSuccess();
  };

  return (
    <div className="overlay modal-center">
      <div className="modal-box" style={{width:'500px', padding:'25px', maxHeight:'90vh', overflowY:'auto'}}>
        <span className="close-icon" onClick={onClose}>×</span>
        
        {/* UPI Section */}
        <div className="pay-section-header" onClick={toggleUpi}>
            <h3>Add new UPI ID</h3><span>{isUpiSectionOpen ? '▲' : '▼'}</span>
        </div>
        {isUpiSectionOpen && (
            <div className="pay-container">
                <div className="pay-title-row"><span className="check-icon">✓</span><span>Add new UPI</span></div>
                <div className="pay-logos-row">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" className="pay-logo" style={{width:'40px'}}/>
                    <img src="https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png" alt="PhonePe" className="pay-logo" style={{width:'40px'}}/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png" alt="Paytm" className="pay-logo" style={{width:'40px'}}/>
                </div>
                <div className="upi-input-group">
                    <input type="text" placeholder="example@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                    <button className="pay-checkout-btn" onClick={handleUpiCheckout}>Checkout</button>
                </div>
                <p className="pay-helper-text">The UPI ID is in the format of name/phone number@bankname</p>
            </div>
        )}

        {/* Card Section */}
        <div className="pay-section-header" onClick={toggleCard}>
            <h3>Add credit or debit cards</h3><span>{isCardSectionOpen ? '▲' : '▼'}</span>
        </div>
        {isCardSectionOpen && (
            <div className="pay-container">
                <div className="pay-title-row"><span className="check-icon">✓</span><span>Add Debit / Credit / ATM Card</span></div>
                <div className="pay-logos-row">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="pay-logo" style={{width:'40px'}}/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="pay-logo" style={{width:'40px'}}/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png" alt="Rupay" className="pay-logo" style={{width:'40px'}}/>
                </div>
                <input className="card-input" type="text" placeholder="Name on Card" />
                <input className="card-input" type="text" placeholder="Card Number" />
                <div className="card-split-row">
                    <input className="card-input" type="text" placeholder="Expiry Date (MM/YY)" />
                    <input className="card-input" type="text" placeholder="CVV" />
                </div>
                <input className="card-input" type="text" placeholder="Nickname for card (Optional)" />
                <button className="pay-checkout-btn full-width" onClick={handleCardCheckout}>Checkout</button>
            </div>
        )}

        <div className="pay-section-header">
            <h3>Cash on Delivery</h3><span style={{fontSize:'12px', color:'#0c831f', fontWeight:'bold'}}>AVAILABLE</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;