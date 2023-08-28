import React, { useState, useEffect } from 'react';

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3001/api/v1/items')
      .then((response) => response.json())
      .then((data) => setItems(data?.data));
  }, []);

  /*
  const handleDelete = (deletedItemId) => {
    setItems(items.filter((item) => item.id !== deletedItemId));
  }; */

  return (
    <div className="content-container">
      <div className="heading">
        <h1>ALL VEHICLE MODELS</h1>
        <p>Please select a vehicle model</p>
        <hr className="dotted" />
        <br />
      </div>

      <div className="car-cards-container">
        <div className="car-cards">
          {items.map((item) => (
            <li className="card-item" key={item.id}>
              <img
                src={item.attributes.image_url}
                alt={item.attributes.title}
              />
              <h4>{item.attributes.title}</h4>
              <hr className="dotted" />
              <p>{item.attributes.description}</p>
            </li>
          ))}
        </div>
      </div>
      <button
        className="scroll-button prev-button"
        type="button"
        aria-label="Scroll left"
      >
        <i className="bi bi-caret-left" />
      </button>
      <button
        className="scroll-button next-button"
        type="button"
        aria-label="Scroll right"
      >
        <i className="bi bi-caret-right" />
      </button>
    </div>
  );
};

export default ItemsList;
