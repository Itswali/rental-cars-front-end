import React, { useState, useEffect } from 'react';
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

  return (
    <div>
      <div className="home-title">
        <h2>Available Vehicles</h2>
        <p>Please select a vehicle</p>
      </div>

      <div className="row text-center">
        <div className="col">
          <div className="card-container">
            <div className="d-flex cards">
              <div className="card">
                <div className="image-holder">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercedes-Benz_X167_IMG_5259.jpg/1280px-Mercedes-Benz_X167_IMG_5259.jpg" alt="" />
                </div>
                <h4>Mercedes-Benz GLS</h4>
                <p>The Mercedes-Benz GLS, formerly Mercedes-Benz GL-Class, is a full-size luxury</p>
              </div>

              <div className="card">
                <div className="image-holder">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/2018_BMW_X6_xDrive30d_M_Sport_Automatic_3.0_Front.jpg/1024px-2018_BMW_X6_xDrive30d_M_Sport_Automatic_3.0_Front.jpg" alt="" />
                </div>
                <h4>BMW X6</h4>
                <p>The BMW X6 is a mid-size luxury crossover SUV by German automaker BMW</p>
              </div>

              <div className="card">
                <div className="image-holder">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/2021_Toyota_Land_Cruiser_300_3.4_ZX_%28Colombia%29_front_view_04.png" alt="" />
                </div>
                <h4>Toyota Land Cruiser</h4>
                <p>The Toyota Land Cruiser is a series of four-wheel drive vehicles by Toyota.</p>
              </div>

              <div className="card">
                <div className="image-holder">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/2018_Lexus_LX_570_%28facelift%29%2C_front_3.24.23.jpg/1920px-2018_Lexus_LX_570_%28facelift%29%2C_front_3.24.23.jpg" alt="" />
                </div>
                <h4>Lexus LX</h4>
                <p>The Lexus LX is a full-size luxury SUV sold by Lexus, a division of Toyota</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {items.map((item) => (
          <div className="g-col-4" key={item.id}>
            <img src={item.attributes.image_url} alt={item.attributes.title} />
            <h4>{item.attributes.title}</h4>
            <p>{item.attributes.description}</p>
            <DeleteItemButton itemId={item.id} onDelete={() => handleDelete(item.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
