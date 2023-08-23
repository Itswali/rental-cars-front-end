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
      List of reservations
      <div>
        {reservations.map((item) => (
          <div key={item.id}>
            <p>{item.car_name}</p>
            <small>{item.city}</small>
            <small>
              {' '}
              {'=>'}
              {' '}
              {item.date}
            </small>
            <hr />
          </div>
        ))}

      </div>
    </div>
  );
};

export default Reservation;
