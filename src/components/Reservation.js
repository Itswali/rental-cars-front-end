import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations } from '../app/features/car/carSlice';

const Reservation = () => {
  const { reservations } = useSelector((store) => store.car);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  return (
    <div>
      <h3 className="reservations-h3">My reservations</h3>
      <hr />
      <br />
      <div>
        {reservations?.map((item) => (
          <div key={item.id}>
            <p>{item.car_name}</p>
            <small>{item.city}</small>
            <br />
            <small>{item.Date}</small>
            <hr />
          </div>
        ))}

      </div>
    </div>
  );
};

export default Reservation;
