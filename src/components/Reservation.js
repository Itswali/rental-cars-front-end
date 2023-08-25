import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations } from '../app/features/car/carSlice';

const Reservation = () => {
  const { reservations } = useSelector((store) => store?.car);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  return (
    <div className="reservations-container">
      <h3 className="reservations-h3">My reservations</h3>
      <hr />
      <br />
      <div className="reservation-item-box">
        {reservations?.map((item) => (
          <div key={item.id} className="reservation-item">
            <div className="res-img-box">
              <img src={item.image} alt="Car" className="res-img" />
            </div>
            <div className="res-item-details">
              <p className="res-item-name">{item.car_name}</p>
              <small className="res-item-city">{item.city}</small>
              <small className="res-item-date">{item.Date}</small>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Reservation;
