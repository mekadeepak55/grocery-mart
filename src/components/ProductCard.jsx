import React from 'react';

const ProductCard = ({ item, addToCart }) => {
  return (
    <div className="product-card">
      <div className="img-container">
        <img 
          src={item.img} 
          alt={item.name} 
          className="prod-img" 
          onError={(e) => e.target.src='https://placehold.co/100?text=Item'} 
        />
      </div>
      <div className="prod-details">
        <div className="prod-time">In Time Delivery</div>
        <div className="prod-name">{item.name}</div>
        <div className="prod-weight">{item.weight}</div>
        <div className="prod-footer">
          <div className="prod-price">₹{item.price}</div>
          <button className="add-btn" onClick={() => addToCart(item)}>ADD</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;