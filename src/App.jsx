import React, { useState } from 'react';
import './App.css'; 
import { products, categories } from './data';

import Navbar from './components/Navbar';
import Sidebar from './components/sidebar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import LoginModal from './components/LoginModal';
import PaymentModal from './components/PaymentModal';

function App() {

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("veg");

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart((prev) => prev.map((item) => {
      if (item.id === id) return { ...item, qty: item.qty + delta };
      return item;
    }).filter((item) => item.qty > 0));
  };

  const handlePaymentSuccess = () => {
      setCart([]);
      setIsPaymentOpen(false);
  };

  const scrollToSection = (id) => {
    setActiveCategory(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };


  const allProducts = Object.values(products).flat();
  
  const displayedProducts = searchQuery
    ? { 'Search Results': allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) }
    : products;

  return (
    <div className="app-container">
      
      {/* NAVBAR */}
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="main-body">
        {/* SIDEBAR */}
        <Sidebar 
            categories={categories} 
            activeCategory={activeCategory} 
            onSelectCategory={(id) => { setSearchQuery(""); scrollToSection(id); }}
        />

        {/* MAIN PRODUCT AREA */}
        <main className="content-area">
          {searchQuery && displayedProducts['Search Results']?.length === 0 ? (
            <div style={{textAlign: 'center', marginTop: '50px', color: '#666'}}><h3>No products found</h3></div>
          ) : (
            Object.entries(displayedProducts).map(([key, items]) => (
              items && items.length > 0 && (
                <section key={key} id={key} className="category-section">
                  <h2 className="cat-title">{key === 'Search Results' ? `Results for "${searchQuery}"` : categories.find(c => c.id === key)?.label || key}</h2>
                  <div className="product-grid">
                    {items.map((item) => (
                      <ProductCard key={item.id} item={item} addToCart={addToCart} />
                    ))}
                  </div>
                </section>
              )
            ))
          )}
        </main>
      </div>

      {/* MODALS & OVERLAYS */}
      {isCartOpen && (
        <Cart 
            cart={cart} 
            onClose={() => setIsCartOpen(false)} 
            updateQty={updateQty} 
            onOpenPayment={() => setIsPaymentOpen(true)} 
        />
      )}

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}

      {isPaymentOpen && (
        <PaymentModal 
            onClose={() => setIsPaymentOpen(false)} 
            onPaymentSuccess={handlePaymentSuccess}
        />
      )}

    </div>
  );
}

export default App;