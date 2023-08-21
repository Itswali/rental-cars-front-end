// src/components/ItemsList.js
import React, { useState, useEffect } from 'react';

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/v1/items')
      .then((response) => response.json())
      .then((data) => setItems(data)); // Assuming the data is an array of items
  }, []);

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img src={item.image_url} alt={item.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
