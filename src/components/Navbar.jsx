import React from 'react';

const Navbar = ({ cartCount, onOpenLogin, onOpenCart, searchQuery, setSearchQuery }) => {
  return (
    <header className="navbar">
      <div className="logo-section">
        <span className="logo-black">Grocery</span><span className="logo-green">Mart</span>
      </div>
      <div className="location-section">
        <div className="delivery-title">Delivery in time</div>
        <div className="delivery-loc">Surat, Gujarat</div>
      </div>
      <div className="search-section">
        <input 
          type="text" 
          placeholder="Search 'chocolate'..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>
      <div className="auth-section">
        <button className="login-text-btn" onClick={onOpenLogin}>Login</button>
        <button className="my-cart-btn" onClick={onOpenCart}>
          <div className="cart-icon">🛒</div>
          <div className="cart-info">
            <span className="cart-label">My Cart</span>
            <span className="cart-count">{cartCount} items</span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;