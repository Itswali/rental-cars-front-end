/* eslint-disable no-console */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
  const { setAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();
  const [isError, setIsError] = useState({
    status: false,
    errMsg: '',
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
      withCredentials: true,
    };

    try {
      const response = await fetch('https://supercars-73m2.onrender.com/api/v1/login', {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAuthenticated(true);
        setUser(data.user);
        navigate('/home');
      } else {
        const errorData = await response.json();
        setIsError((prev) => ({
          status: !prev.status,
          errMsg: errorData,
        }));
        console.error('login error:', errorData);
      }
    } catch (error) {
      console.error('login error:', error);
    }
  };
  return (
    <form className="splash" onSubmit={handleSubmit}>
      <img src="super-wheels-white-logo.svg" alt="logo" />
      {isError.status
       && (
       <span className="loginerror">
         {JSON.stringify(isError.errMsg)}
       </span>
       )}
      <input
        type="email"
        name="email"
        value={formData.email}
        placeholder="Email"
        required
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        required
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit" className="credentials">Login</button>
    </form>

  );
}
