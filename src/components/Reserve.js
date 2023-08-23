// import React from 'react';
import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCars } from '../app/features/car/carSlice';
// import { useNavigate, useParams } from "react-router-dom";

const Reserve = () => {
  const hello = 'hello';
  // const { cars, isLoading } = useSelector((store) => store.car);
  // const [carId, setCarId] = useState('');
  // const [city, setCity] = useState('');
  // const [date, setDate] = useState('');
  // const { car_id } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div>
      Reseve a car.
      {' '}
      { hello }
    </div>
  );
};

export default Reserve;
