// import React from 'react';
import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCars } from '../app/features/car/carSlice';

const Reserve = () => {
  const { cars, isLoading } = useSelector((store) => store.car);
  const [carId, setCarId] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const { car_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleSelect = (e) => {
    setCarId(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('carId before set', carId);

    // const useID = car_id ? car_id : carId;
    // console.log('useID', useID);

    // setCarId(useID);

    // console.log('carId after set', carId);

    if (carId !== '' && date !== '') {
      try {
        dispatch(addReservation({
          reservation: {
            car_id: carId,
            city,
            date,
          },
        }));
      } catch (error) {
        console.error('Error:', error);
      }

      navigate('/cars/reservations');
    } else {
      console.log('select a car!!!');
    }
  };

  if (isLoading) return <h3>Loading...</h3>;

  if (cars.length === 0) {
    return (<h1>No cars to reserve</h1>);
  }

  return (
    <div>
      select car
      <form>
        <select
          name="cars"
          id="cars"
          onChange={handleSelect}
          // defaultValue={carId}
          defaultValue={car_id || carId}
          disabled={!!car_id}
        >
          {car_id
            ? <option value={car_id}>{cars.find((obj) => obj.id === Number(car_id)).name}</option>
            : (
              <>
                <option value="">Select a car</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.name}
                  </option>
                ))}
              </>
            )}
        </select>
        <input
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label>
          Select a Date:
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </label>
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="add-new-book"
        >
          Reserve
        </button>
      </form>

    </div>
  );
};

export default Reserve;
