/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/additem.css';

const AddItemForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState(''); // New state for image URL
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:3001/api/v1/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:
      JSON.stringify({
        item: {
          title,
          image_url: imageURL,
          description,
        },
      }),
    });

    if (response.ok) {
      // Item created successfully, you can handle redirects or UI updates here
      console.log('Item created successfully');
      history('/home');
    } else {
      const data = await response.json();
      console.error('Error creating item:', data.errors);
    }
  };

  return (
    <div className="item-container">
      <div className="overlay">
        <div className="item-content">
          <h2>Add New Car</h2>
          <hr className="item-hr" />
          <form onSubmit={handleSubmit} className="form-container">
            <div className="input-div">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="item-select-value"
                placeholder="Enter Car Name"
              />
              <label>Image URL:</label>
              <input
                type="text"
                value={imageURL}
                className="item-select-value"
                placeholder="Enter Image Url"
                onChange={(e) => setImageURL(e.target.value)}
              />
            </div>
            <label>Description:</label>
            <textarea
              rows="10"
              cols="50"
              value={description}
              placeholder="Enter Some car description"
              onChange={(e) => setDescription(e.target.value)}
              className="item-select-value"
            />
            <button type="submit">Create Item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemForm;
