/* eslint-disable no-console */
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

export default function Registration() {
  const { authToken } = useAuth(); // Retrieve authToken from the auth context
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${authToken}`, // Include the authToken in the headers
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/items', {
        method: 'POST',
        headers,
        body: JSON.stringify({ item: formData }), // Send the form data as JSON
      });

      if (response.ok) {
        // Handle success (e.g., show a success message or navigate to a success page)
      } else {
        const errorData = await response.json();
        console.error('Error creating item:', errorData);
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        placeholder="Title"
        required
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={formData.description}
        placeholder="Description"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="image_url"
        value={formData.image_url}
        placeholder="Image URL"
        required
        onChange={handleChange}
      />
      <button type="submit" className="create-button">Create Item</button>
    </form>
  );
}
