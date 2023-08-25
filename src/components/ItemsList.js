import React, { useState, useEffect } from 'react';
import DeleteItemButton from './DeleteItemButton';

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/v1/items')
      .then((response) => response.json())
      .then((data) => setItems(data.data));
  }, []);

  const handleDelete = (deletedItemId) => {
    setItems(items.filter((item) => item.id !== deletedItemId));
  };

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.attributes.title}</h3>
            <p>{item.attributes.description}</p>
            <img src={item.attributes.image_url} alt={item.attributes.title} />
            <DeleteItemButton itemId={item.id} onDelete={() => handleDelete(item.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
