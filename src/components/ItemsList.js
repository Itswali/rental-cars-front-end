import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DeleteItemButton from './DeleteItemButton';

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3001/api/v1/items')
      .then((response) => response.json())
      .then((data) => setItems(data.data));
  }, []);

  const handleDelete = (deletedItemId) => {
    setItems(items.filter((item) => item.id !== deletedItemId));
  };

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="content-container">
      <div className="heading">
        <h1>ALL VEHICLE MODELS</h1>
        <p>Please select a vehicle model</p>
        <hr className="dotted" />
        <br />
      </div>

      <div className="car-cards-container">
        <Slider
          dots={carouselSettings.dots}
          infinite={carouselSettings.infinite}
          speed={carouselSettings.speed}
          slidesToShow={carouselSettings.slidesToShow}
          slidesToScroll={carouselSettings.slidesToScroll}
          responsive={carouselSettings.responsive}
        >
          {items.map((item) => (
            <div className="card-item" key={item.id}>
              <img src="toyota-auris.png" alt="" />
              <img src={item.attributes.image_url} alt={item.attributes.title} />
              <h4>{item.attributes.title}</h4>
              <hr className="dotted" />
              <p>{item.attributes.description}</p>
              <DeleteItemButton itemId={item.id} onDelete={() => handleDelete(item.id)} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ItemsList;
