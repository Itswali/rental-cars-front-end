import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3001/api/v1/items')
      .then((response) => response.json())
      .then((data) => setItems(data?.data));
  }, []);

  const scrollContainerRef = React.createRef();

  const handleScroll = (scrollOffset) => {
    const container = scrollContainerRef.current;
    container.scrollLeft += scrollOffset;
  };

  return (
    <div className="content-container">
      <div className="heading">
        <h1>ALL VEHICLE MODELS</h1>
        <p>Please select a vehicle model</p>
        <hr className="dotted" />
        <br />
      </div>

      <div className="car-cards-container" ref={scrollContainerRef}>
        <div className="car-cards">
          {items.map((item) => (
            <div className="card-item" key={item.id}>
              <div className="img-container">
                <Link to={`/home/details/${item.id}`} key={item.id}>
                  <img
                    src={item.attributes.image_url}
                    alt={item.attributes.title}
                  />
                </Link>
              </div>
              <h4>{item.attributes.title}</h4>
              <hr className="dotted" />
              <p>{`${item.attributes.description.substring(0, 100)}...`}</p>
              <div className="socials">
                <i className="bi bi-facebook" />
                <i className="bi bi-twitter" />
                <i className="bi bi-instagram" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="scroll-button prev-button"
        type="button"
        aria-label="Scroll left"
        onClick={() => handleScroll(-330)} // Adjust scroll value as needed
      >
        <i className="bi bi-caret-left" />
      </button>
      <button
        className="scroll-button next-button"
        type="button"
        aria-label="Scroll right"
        onClick={() => handleScroll(330)} // Adjust scroll value as needed
      >
        <i className="bi bi-caret-right" />
      </button>
    </div>
  );
};

export default ItemsList;
