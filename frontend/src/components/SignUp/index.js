import React from 'react'
import { useState } from 'react';
import userInstance from './Services/onSubmit';
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ name: "",email: "", password: "" });
  const [errs, setErrs] = useState({ name: "",email: "", password: "" });
  const [signupError, setsignupError] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds(prev => ({ ...prev, [name]: value }));
  };
  const validate = () => {
    let errors = {};
    
    // Validate name
    if (!creds.name || creds.name.trim() === "") {
      errors.name = "Please enter your name";
    } else {
      errors.name = "";
    }

    // Validate email
    if (!creds.email || creds.email.trim() === "") {
      errors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(creds.email)) {
      errors.email = "Please enter a valid email address";
    } else {
      errors.email = "";
    }

    // Validate password
    if (!creds.password || creds.password.trim() === "") {
      errors.password = "Please enter your password";
    } else if (creds.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else {
      errors.password = "";
    }

    setErrs(errors);

    // Return true if there are no errors, false otherwise
    return Object.values(errors).every(err => err === "");
  };
  const handleLogin = async(e) =>{
    e.preventDefault();
    const { name, value } = e.target;
    
    if(validate(name, value))
    {
      try {
        await userInstance.signUp(creds,setsignupError);
        if (signupError==="Success") {
          navigate("/albums"); // Navigate to the root path upon successful login
          // console.log(creds)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className='background' >
      <div className='center-box'>
        <h2>SignUp</h2>
        {signupError && <p className='error'>{signupError}</p>}
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={creds.name} onChange={handleChange}/>
            {errs.name && <span className="error">{errs.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" value={creds.email} onChange={handleChange}/>
            {errs.email && <span className="error">{errs.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={creds.password} onChange={handleChange}/>
            {errs.password && <span className="error">{errs.password}</span>}
          </div>
          <button type="submit" onClick={handleLogin}>SignUp</button>
        </form>
        
      </div>
    </div>
  )
}
export default SignUp;
