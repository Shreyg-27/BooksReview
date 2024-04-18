import React from 'react';
import { useNavigate } from 'react-router-dom';

const Thankyou = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => navigate('/login')}
        className="py-4 px-8 bg-blue-500 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Login to your profile
      </button>
    </div>
  );
};

export default Thankyou;
