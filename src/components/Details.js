import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/item.css';

const Details = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:3001/api/v1/items/${itemId}`)
      .then((response) => response.json())
      .then((data) => setItem(data?.data))
      .catch((error) => {
        setError(`Error fetching item: ${error}`);
      });
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error...
        {' '}
        {error}
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="car-pic">
        <img src={item.attributes.image_url} alt={item.attributes.title} />
      </div>

      <div className="car-details">
        <h2 className="title-car">{item.attributes.title}</h2>
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
          <i className="bi bi-chevron-right" />
        </Link>

        <div className="color-wheel">
          <img
            src="https://raw.githubusercontent.com/Itswali/rental-cars-front-end/123f11d020c2abb7447e1163d182657e10a8cf5c/public/Colorwheel.svg"
            alt="Color Wheel"
          />
        </div>
        <br />
        <Link to={`/home/reserve/${itemId}`} className="book-btn">
          Reserve
          {' '}
          <i className="bi bi-arrow-right-circle" />
        </Link>
      </div>

      <Link to="/home">
        <button type="button" className="scroll-button-2 prev-button-2">
          <i className="bi bi-caret-left" />
        </button>
      </Link>
    </div>
  );
};

export default Details;
