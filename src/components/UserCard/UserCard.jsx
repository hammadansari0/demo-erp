import React from 'react';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user, token }) => {
  const navigate = useNavigate();

  const handleShowStructure = () => {
    navigate('/structure', { state: { user, token } });
  };

  return (
    <div>
      <Header username={`${user.first_name} ${user.last_name}`} token={token} />
      <div className="login-page">
        <div className="login-card">
          <h2>Welcome, {user.first_name} {user.last_name}!</h2>

          <div className="input-group">
            <i className="fa fa-id-badge"></i>
            <input type="text" value={`ID: ${user.id}`} readOnly />
          </div>

          <div className="input-group">
            <i className="fa fa-envelope"></i>
            <input type="text" value={user.email} readOnly />
          </div>

          <div className="input-group">
            <i className="fa fa-phone"></i>
            <input type="text" value={user.phone_number} readOnly />
          </div>

          <div className="input-group">
            <i className="fa fa-user"></i>
            <input type="text" value={user.gender || 'Not specified'} readOnly />
          </div>

          <div className="input-group">
            <i className="fa fa-calendar"></i>
            <input type="text" value={`Created: ${new Date(user.created_at).toLocaleString()}`} readOnly />
          </div>

          <div className="input-group">
            <i className="fa fa-refresh"></i>
            <input type="text" value={`Updated: ${new Date(user.updated_at).toLocaleString()}`} readOnly />
          </div>

          <div className="input-group">
            <i className="fa fa-user-tag"></i>
            <input type="text" value={`Role: ${user.role}`} readOnly />
          </div>

          {user.avatar && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <img src={user.avatar} alt="Avatar" style={{ width: '100px', borderRadius: '50%' }} />
            </div>
          )}

          {/* Navigate to /structure */}
          <button 
            style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            onClick={handleShowStructure}
          >
            Show Account Structure
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
