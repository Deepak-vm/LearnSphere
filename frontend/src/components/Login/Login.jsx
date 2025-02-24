import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Signup from '../S
import './login.css';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [rememberMe, setRememberMe] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { 
      username, 
      password, 
      role: isAdminLogin ? 'admin' : role, 
      rememberMe 
    });
  };

  const toggleLoginMode = () => {
    setIsAdminLogin(!isAdminLogin);
    setUsername('');
    setPassword('');
    setRememberMe(false);
  };


  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{isAdminLogin ? 'Admin Login' : 'User Login'}</h2>
        <form onSubmit={handleLogin}>
          {!isAdminLogin && (
            <div className="form-group">
              <label>Role</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label>{isAdminLogin ? 'Admin Username' : 'Username'}</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={`Enter ${isAdminLogin ? 'admin' : ''} username`} 
              required 
            />
          </div>

          <div className="form-group">
            <label>{isAdminLogin ? 'Admin Password' : 'Password'}</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={`Enter ${isAdminLogin ? 'admin' : ''} password`} 
              required 
            />
          </div>

          <div className="login-extras">
            <div className="remember-me">
              <input 
                type="checkbox" 
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button">
            {isAdminLogin ? 'Admin Login' : 'Login'}
          </button>
        </form>

        <div className="admin-login">
          
          <button onClick={toggleLoginMode}>
            {isAdminLogin ? 'User Login' : 'Admin Login'}
          </button>

        
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;