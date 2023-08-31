/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const DeleteItemButton = ({ itemId, onDelete }) => {
  const handleDelete = async () => {
    const response = await fetch(`https://supercars-73m2.onrender.com/api/v1/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      console.log('Item deleted successfully');
      onDelete(); // Trigger the onDelete function to update the item list
    } else {
      const data = await response.json();
      console.error('Error deleting item:', data.errors);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

DeleteItemButton.propTypes = {
  itemId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteItemButton;
