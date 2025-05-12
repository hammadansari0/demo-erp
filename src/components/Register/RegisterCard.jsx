import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios';

const RegisterCard = () => {
  const navigate = useNavigate();

  const [firstname, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // loader state

  const validateFields = () => {
    if (!firstname || !lastname || !phone || !email || !password || !confirmPassword) {
      setError('All fields are required!');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return false;
    }
    return true;
  };

  const clearFields = () => {
    setUsername('');
    setLastname('');
    setPhone('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setError('');
    setIsLoading(true);

    const formData = new FormData();
    formData.append('first_name', firstname);
    formData.append('last_name', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', '');
    formData.append('gender', '');
    formData.append('phone_number', phone);
    formData.append('password_confirmation', confirmPassword);

    const options = {
      method: 'POST',
      url: 'https://erbstaging.cyberin.io/api/v1/auth/register',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      data: formData,
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
      alert('Registration Successful!');
      clearFields();
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError('Registration failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Register</h2>
        <div className="input-group">
          <i className="fa fa-user"></i>
          <input
            type="text"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <i className="fa fa-user"></i>
          <input
            type="text"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="input-group">
          <i className="fa fa-phone"></i>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="input-group">
          <i className="fa fa-envelope"></i>
          <input
            type="email"
            placeholder="Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <i className="fa fa-lock"></i>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <i className="fa fa-lock"></i>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button className="register-btn" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <span className="loader"></span> // loader span
          ) : (
            'REGISTER'
          )}
        </button>
      </div>
    </div>
  );
};

export default RegisterCard;
