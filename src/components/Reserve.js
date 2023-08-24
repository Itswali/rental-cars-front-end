import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCars, addReservation, getReservations } from '../app/features/car/carSlice';
import { useAuth } from '../auth/AuthContext';

const Reserve = () => {
  const { cars, isLoading } = useSelector((store) => store.car);
  const [carId, setCarId] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const { carParam } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    dispatch(fetchCars());
  }, [dispatch, user]);

  const handleSelect = (e) => {
    console.log(user);
    setCarId(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (carId !== '' && date !== '') {
      try {
        dispatch(addReservation({
          reservation: {
            user_id: 1,
            item_id: carId,
            city,
            Date: date,
          },
        }));
      } catch (error) {
        console.log('Error:', error);
      }

      dispatch(getReservations());
      navigate('/reservations');
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
          defaultValue={carParam || carId}
          disabled={!!carParam}
        >
          {carParam
            ? (
              <option value={carParam}>
                {cars.find((obj) => obj.id === carParam).attributes.title}
              </option>
            )
            : (
              <>
                <option value="">Select a car</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.attributes.title}
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
        <label htmlFor="date">
          Select a Date:
          <input
            name="date"
            type="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </label>
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="add-reservation"
        >
          Reserve
        </button>
      </form>

    </div>
  );
};

export default Reserve;
