import React from 'react';
// import './Cart.css'; // Import the CSS file
import '../index.css'

const Cart = ({ cartItems, onClearCart }) => {
  const cartCount = cartItems.length;
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-container">
    <div className="cart-badge">
      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      <i className="fas fa-shopping-cart cart-icon"></i>
    </div>
    <div>
     
    <div className="cart-footer">
      <p>Total Amount:</p>
      <p className="total-amount">{`$${totalAmount.toFixed(2)}`}</p>
    </div>
    </div>
    
  </div>
  );
};

export default Cart;
