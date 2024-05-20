import React from 'react';
import { Link } from 'react-router-dom';
import '../components/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="buttons">
        <Link to="/login" className="btn btn-login">Login</Link>
        <Link to="/signup" className="btn btn-signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default HomePage;
