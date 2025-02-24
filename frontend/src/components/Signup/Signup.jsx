import React, { useState } from 'react';
import './signup.css';

const AdminSignupComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    adminCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log('Signup attempt:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-form signup-form">
        <h2>Admin Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>First Name</label>
            <input 
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required 
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input 
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required 
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input 
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required 
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required 
            />
          </div>

          <div className="form-group">
            <label>Admin Code</label>
            <input 
              type="text"
              name="adminCode"
              value={formData.adminCode}
              onChange={handleChange}
              placeholder="Enter admin verification code"
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              required 
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required 
            />
          </div>

          <button type="submit" className="login-button">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignupComponent;