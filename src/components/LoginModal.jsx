import React, { useState } from 'react';

const LoginModal = ({ onClose }) => {

  const [isSignUp, setIsSignUp] = useState(false);
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");

  const handleContinue = () => {
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    
    if (isSignUp && name.trim() === "") {
        alert("Please enter your name for Sign Up");
        return;
    }

    if (isSignUp) {
        alert(`Account Created Successfully for ${name}!`);
    } else {
        alert(`OTP Sent to ${mobile} for Login!`);
    }
    onClose();
  };

  return (
    <div className="overlay modal-center">
      <div className="modal-box">
        <span className="close-icon" onClick={onClose}>×</span>
        
        {/* Dynamic Header */}
        <div style={{textAlign: 'center', marginBottom: '20px'}}>
            <h3 style={{margin: '0 0 10px 0'}}>
                {isSignUp ? "Sign Up" : "Login"}
            </h3>
            <p style={{color: '#666', fontSize: '14px', margin: 0}}>
                {isSignUp ? "Create a new account" : "Log in to continue"}
            </p>
        </div>
        
        {/* Sign Up: Name Input (Only shows if isSignUp is true) */}
        {isSignUp && (
            <div className="input-group" style={{marginBottom:'15px'}}>
                <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="card-input" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{width:'100%', padding:'12px', border:'1px solid #0c0b0b', borderRadius:'8px', outline:'none'}}
                />
            </div>
        )}

        {/* Phone Input */}
        <div className="phone-input">
            <span>+91</span>
            <input 
                type="tel" 
                placeholder="Enter mobile number" 
                maxLength="10"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)} 
            />
        </div>

        {/* Continue Button */}
        <button className="green-btn" onClick={handleContinue}>
            {isSignUp ? "Create Account" : "Continue"}
        </button>
        
        {/* Toggle between Login and Signup */}
        <p style={{fontSize: '12px', color: '#666', marginTop: '20px', textAlign: 'center'}}>
            {isSignUp ? "Already have an account? " : "New to GroceryMart? "}
            <span 
                style={{color: '#3d17bb', fontWeight: 'bold', cursor: 'pointer', textDecoration:'underline'}}
                onClick={() => setIsSignUp(!isSignUp)} 
            >
                {isSignUp ? "Log in" : "Sign up"}
            </span>
        </p>

        <p style={{fontSize: '10px', color: '#aaa', marginTop: '15px', textAlign: 'center'}}>
            By continuing, you agree to our Terms of Service & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginModal;