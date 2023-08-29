/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

export default function DeleteDialog(props) {
  // eslint-disable-n ext-line no-unused-vars
  const { closeDialog } = props;
  // eslint-disable-next-line no-unused-vars
  const [items, setItems] = useState([]);
  const [checked, setChecked] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:3001/api/v1/items')
      .then((response) => response.json())
      .then((data) => setItems(data?.data));
  }, [items]);

  const handleCheckbox = (id) => {
    if (checked.includes(id)) {
      setChecked(checked.filter((i) => i !== id));
    } else {
      setChecked([...checked, id]);
    }
  };
  // small code
  const handleDelete = () => {
    // Make an API call to delete the checked items
    const checkedIds = checked.join(',');
    fetch(`http://127.0.0.1:3001/api/v1/items/delete?ids=${checkedIds}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        fetch('http://127.0.0.1:3001/api/v1/items')
          .then((response) => response.json())
          .then((data) => setItems(data?.data));
        setChecked([]);
      })
      .catch((error) => {
        console.error('Error deleting items:', error);
      });
  };
  // end code
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="modal">
      <div className="modal-overlay" onClick={closeDialog}>
        <ul>
          { items?.map((item) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li key={item.id}>
              <input
                type="checkbox"
                checked={checked.includes(item.id)}
                onChange={() => handleCheckbox(item.id)}
              />
              {item.attributes.title}
            </li>
          ))}
          <li>
            <button
              type="submit"
              className="add-reservation"
              onClick={handleDelete}
            >
              Delete
            </button>
          </li>
          <small className="note">click anywhere outside this box to close the dialog</small>
        </ul>
      </div>
    </div>
  );
}
