/* eslint-disable no-console */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
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
      const response = await fetch('http://localhost:3000/api/v1/login', {
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
        console.error('login error:', errorData);
      }
    } catch (error) {
      console.error('login error:', error);
    }
  };
  return (
    <form className="splash" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        placeholder="Enter Email"
        required
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Enter password"
        required
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit" className="credentials">Login</button>
    </form>

  );
}
