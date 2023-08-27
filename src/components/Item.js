import React from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import NavigationPanel from './NavigationPanel';

const Item = () => {
  return (
    <div className="item-container">
      <div className="car-pic">
        <img src="toyota-land-cruiser.png" alt="Toyota Land Cruiser" />
      </div>

      <div className="car-details">
        <h2>TOYOTA LAND CRUISER</h2>
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
        <button className="more-cars">
          DISCOVER MORE CARS <small><i className="bi bi-chevron-right"></i></small>
        </button>
        <div className="color-wheel">
          <img src="./images/Colorwheel.svg" alt="Color Wheel" />
        </div>
        <button className="book-btn">
          Book Test Drive <i className="bi bi-arrow-right-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default Item;
