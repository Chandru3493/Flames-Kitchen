import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CategoryMenu from './CategoryMenu';
import MenuItems from './MenuItems';
import OrderSummary from './OrderSummary';
import axios from 'axios';
import '../App.css'; 

function OrderTakingPopup({ show, onClose, tableNumber }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [orderStatus, setOrderStatus] = useState('Waiting for Order');
  const itemsPerPage = 10; 

  // Fetch all menu items on initial load
  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/menu-items');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching all menu items:', error);
      }
    };
    fetchAllItems();
  }, []);

  // Fetch items for a specific category
  useEffect(() => {
    const fetchMenuItems = async (category = 'All') => {
      try {
        const endpoint = category === 'All'
          ? 'http://localhost:3001/api/menu-items'
          : `http://localhost:3001/api/menu-items/category/${category}`;

        const response = await axios.get(endpoint);
        setMenuItems(response.data);
      } catch (error) {
        console.error(`Error fetching items for category ${category}:`, error);
      }
    };

    fetchMenuItems(selectedCategory); 
  }, [selectedCategory]); 
  

  const filterMenuItems = (category) => {
    return category === 'All' 
      ? menuItems
      : menuItems.filter((item) => item.category === category);
  };

  const addToCart = (menuItem) => {
    const existingItem = cartItems.find((item) => item.id === menuItem.id);
    if (existingItem) {
      setCartItems(cartItems.map((item) => (
        item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
      )));
    } else {
      setCartItems([...cartItems, { ...menuItem, quantity: 1 }]);
    }
    setOrderStatus('Order Placed');
  };

  const handleClose = () => {
    setCartItems([]); // Clear the cart when the modal closes
    onClose(); // Assuming you meant to call the provided onClose
  };

  const handlePlaceOrder = async () => { 
    try {
      const newOrderResponse = await axios.post('http://localhost:3001/api/orders', {
        // ... (tableId, waiterId, etc)
      });
      const orderId = newOrderResponse.data.id;

      const orderItemPromises = cartItems.map((item) =>
        axios.post('http://localhost:3001/api/order-items', {
          orderId,
          menuItemId: item.id,
          quantity: item.quantity,
        })
      );
      await Promise.all(orderItemPromises);

      console.log('Order created:', newOrderResponse.data);
      setCartItems([]); 
      handleClose(); // Close modal after successful order
      setOrderStatus('Order Delivered'); 
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const removeFromCart = (menuItem) => {
    setCartItems(cartItems.filter((item) => item.id !== menuItem.id));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleQuantityChange = (menuItem, newQuantity) => {
    setCartItems(cartItems.map((item) => (item.id === menuItem.id ? { ...item, quantity: newQuantity } : item)));
  };

  const submitOrder = async () => {
    try {
      // 1. Create the order on the backend
      const newOrderResponse = await axios.post('http://localhost:3001/api/orders', {
        // ... (tableId, waiterId, etc)
      });
      const orderId = newOrderResponse.data.id;

      // 2. Create order items on the backend
      const orderItemPromises = cartItems.map((item) =>
        axios.post('http://localhost:3001/api/order-items', {
          orderId,
          menuItemId: item.id,
          quantity: item.quantity,
        })
      );
      await Promise.all(orderItemPromises); // Wait for creation

      // 3. Handle success (Clear cart, close modal, etc.)
      console.log('Order created:', newOrderResponse.data);
      setCartItems([]);
      onClose();
      setOrderStatus('Order Delivered');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  

  return (
    <Modal show={show} onHide={onClose} centered className="order-taking-popup">
      <Modal.Header closeButton>
        <Modal.Title>Take Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
   
        <div className="table-number">Table: {tableNumber}</div> {/* Display the table number */}
  
        <div className="order-taking-container">
         <CategoryMenu 
              categories={["Starter", "Main Course","Lunch", "Chinese", "Arabian", "Dessert", "Drinks", "All"]}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryClick}
          />
          <div className="menu-items-list">
            {filterMenuItems(selectedCategory)
              .slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
              .map((menuItem) => (
                <MenuItems
                  key={menuItem.id}
                  menuItem={menuItem}
                  onAddToCart={addToCart}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            <div className="menu-navigation">
              <button onClick={handlePrevClick}>Previous</button>
              <button onClick={handleNextClick}>Next</button>
            </div>
          </div>
          <OrderSummary 
         cartItems={cartItems} 
         onRemoveFromCart={removeFromCart} 
         onQuantityChange={handleQuantityChange} 
         onPlaceOrder={handlePlaceOrder} 
         orderStatus={orderStatus}/>
          {orderStatus === 'Order Delivered' && (
            <button onClick={addToCart}>Add Items</button>
          )} 
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default OrderTakingPopup;
