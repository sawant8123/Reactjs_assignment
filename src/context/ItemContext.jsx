import React, { createContext, useState, useEffect } from 'react';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Fetch from JSON Server (optional)
  useEffect(() => {
    fetch('http://localhost:5000/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  // Add Item
  const addItem = (item) => {
    setItems(prev => [...prev, item]);

    // Optional: POST to JSON Server
    fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
  };

  // 🧨 Delete Item
  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));

    // Optional: DELETE from JSON Server
    fetch(`http://localhost:5000/items/${id}`, {
      method: 'DELETE',
    });
  };

  return (
    <ItemContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </ItemContext.Provider>
  );
};
