import React from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie library

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Remove any user-related data stored in cookies
    Cookies.remove('userEmail');
    // Redirect the user to the login page
    history.push('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
