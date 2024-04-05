import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Thankyou = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/login')}>Login to your profile</button>
  );
};

export default Thankyou;
