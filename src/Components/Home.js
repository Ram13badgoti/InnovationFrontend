import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import '../Style.css'; // Import the CSS file

const Home = ({ onLogout }) => {
  const navigate = useNavigate(); 
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
        } else {
          console.error('Error fetching products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!minPrice || product.price >= minPrice) &&
      (!maxPrice || product.price <= maxPrice)
    );
  });

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleLogout = () => {
    navigate('/login');
    if (onLogout) {
      onLogout();
    }
  };
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const cancelCart = () => {
    setShowCart(false);
  };

  return (
    <div className="home-container">
    
      <div className="header">
        <h2>Welcome to the Shop!</h2>
        <div className="button-container">
    
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      </div>
      {showCart && (
        <div className="cartContainer">
        <div className="cart-container">
        
          <Cart cartItems={cartItems} onClearCart={clearCart} />
    
        </div>
        </div>
      )}
      <div className="product-inputs">
        <input
          className="product-input"
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          className="product-input"
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="product-input"
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">{`Price: $${product.price}`}</p>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
