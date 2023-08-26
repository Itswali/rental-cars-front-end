/* eslint-disable no-console */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Registration() {
  const { setAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();
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
      const response = await fetch('http://localhost:3001/api/v1/signup', {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const authToken = data.token; // Retrieve the token from the response
        localStorage.setItem('authToken', authToken); // Store the token in localStorage

        setAuthenticated(true);
        setUser(data.user);
        navigate('/home');
      } else {
        const errorData = await response.json();
        console.error('Signup error:', errorData);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <form className="splash" onSubmit={handleSubmit}>
      <img src="super-wheels-white-logo.svg" alt="logo" />

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
      <button type="submit" className="credentials">Register</button>
    </form>
  );
}
