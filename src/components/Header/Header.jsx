import React from 'react';
import './Header.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = ({ username, token }) => {
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      // Send a POST request to logout the user
      await axios.post(
        'https://erbstaging.cyberin.io/api/v1/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear any session data (e.g., token, user info)
      localStorage.removeItem('token'); // or use sessionStorage if that's how the token is stored

      // Redirect user to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="header-bar">
      <div className="header-username">
        <i className="fa fa-user"></i> {username}
      </div>
      <button className="logout-btn" onClick={onLogout}>
        <i className="fa fa-sign-out"></i> Logout
      </button>
    </div>
  );
};

export default Header;
