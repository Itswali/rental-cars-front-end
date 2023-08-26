import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCars, addReservation, getReservations } from '../app/features/car/carSlice';
import { useAuth } from '../auth/AuthContext';
import '../styles/reserve.css';

const Reserve = () => {
  const { cars, isLoading } = useSelector((store) => store.car);
  const [carId, setCarId] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [showError, setShowError] = useState();
  const { carParam } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchCars(user.id));
    }
  }, [dispatch, user]);

  const handleSelect = (e) => {
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
            user_id: user.id,
            item_id: carId,
            city,
            Date: date,
          },
        }));
      } catch (error) {
        setShowError(`Error occured: ${error}`);
      }

      dispatch(getReservations(user.id));
      navigate('/home/my_reservations');
    } else {
      setShowError('Please select a car and a date!');
    }
  };

  if (isLoading) return <h3>Loading...</h3>;

  if (cars.length === 0) {
    return (<h1>No cars to reserve</h1>);
  }

  return (
    <div className="reserve-container">
      <div className="overlay" />
      <div className="reserve-content">

        <span className="showError">{showError}</span>
        <h2 className="reserve-h2">BOOK A SUPER-WHEELS RIDE</h2>
        <hr className="reserve-hr" />
        <div className="message">Select a car, choose a date, enter a city, you&apos;re all set!</div>

        <form>
          <select
            name="cars"
            id="cars"
            onChange={handleSelect}
            defaultValue={carParam || carId}
            disabled={!!carParam}
            className="select-value"
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
          <label htmlFor="date">
            <input
              name="date"
              type="date"
              value={date}
              onChange={handleDateChange}
              className="select-value"
              required
            />
          </label>
          <input
            type="text"
            placeholder="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="select-value"
            required
          />
          <br />
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="add-reservation"
          >
            Book Now
          </button>
          <br />
        </form>
      </div>
    </div>
  );
};

export default Reserve;
