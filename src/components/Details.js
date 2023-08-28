/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Link, useParams } from 'react-router-dom'; // Import useParams
import '../styles/item.css';

const Details = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Fetch item data using the itemId
    fetch(`http://127.0.0.1:3000/api/v1/items/${itemId}`)
      .then((response) => response.json())
      .then((data) => setItem(data.data))
      .catch((error) => {
        console.error('Error fetching item:', error);
      });
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="item-container">
      <div className="car-pic">
        <img src={item.attributes.image_url} alt={item.attributes.title} />
      </div>

      <div className="car-details">
        <h2>{item.attributes.title}</h2>
        <table id="schedule">
          <tbody>
            <tr>
              <td>Deposit</td>
              <td>$20,000</td>
            </tr>
            <tr>
              <td>Monthly fee</td>
              <td>$500</td>
            </tr>
            <tr>
              <td>Total amount payable</td>
              <td>$50,000</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>60 months</td>
            </tr>
          </tbody>
        </table>
        <br />
        <Link to="/home" className="more-cars">
          More Cars
          {' '}
          <i className="bi bi-chevron-right" />
        </Link>

        <div className="color-wheel">
          <img src="Colorwheel.svg" alt="Color Wheel" />
        </div>
        <Link to="/home/reserve" className="book-btn">
          Book Test Drive
          {' '}
          <i className="bi bi-arrow-right-circle" />
        </Link>
      </div>
    </div>
  );
};

// Prop validation
Details.propTypes = {
  item: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Details;
