/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        Accept: 'application/json',
      },
      body: JSON.stringify({ item: { title, image_url: imageURL, description } }), // Use image_url
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
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
};

export default AddItemForm;
