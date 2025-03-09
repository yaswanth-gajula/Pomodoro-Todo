import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      localStorage.setItem('user_email', email);
      navigate('/');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim() && name.trim()) {
      localStorage.setItem('user_email', email);
      navigate('/');
    }
  };

  return (
    <div className="auth-container" id="container">
      <div className="main-title">
        <h1>Pomodoro & Task Manager</h1>
        <p>Boost your productivity with focused work sessions</p>
      </div>
      <div className={`container ${isActive ? 'active' : ''}`}>
        <div className="form-container sign-up">
          <form onSubmit={handleSignupSubmit}>
            <h1 className="form-title">Create Account</h1>
            <p className="subtitle">Start your productivity journey today</p>
            <input 
              type="text" 
              placeholder="Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleLoginSubmit}>
            <h1 className="form-title">Welcome Back!</h1>
            <p className="subtitle">Continue your productivity journey</p>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#">Forgot Your Password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1 className="form-title">Welcome Back!</h1>
              <p>Log in to access your personalized dashboard and continue your productivity journey</p>
              <button 
                className="hidden" 
                onClick={() => setIsActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1 className="form-title">Hello, Friend!</h1>
              <p>Register now to start managing your time effectively and boost your productivity</p>
              <button 
                className="hidden" 
                onClick={() => setIsActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Montserrat', sans-serif;
          }

          body {
            background-color: #c9d6ff;
            background: linear-gradient(to right, #1a1a1a, #2c3034);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 100vh;
          }

          .auth-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            width: 100%;
            flex-direction: column;
          }

          .main-title {
            text-align: center;
            margin-bottom: 2rem;
            color: #fff;
          }

          .main-title h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            background: linear-gradient(45deg, #2da0a8, #1a237e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
          }

          .main-title p {
            font-size: 1.1rem;
            opacity: 0.9;
          }

          .form-title {
            color: #fff;
            margin-bottom: 1rem;
            font-size: 1.8rem;
            white-space: nowrap;
            text-align: center;
            width: 100%;
          }

          .subtitle {
            color: #2da0a8 !important;
            font-size: 0.9rem !important;
            margin-bottom: 1.5rem !important;
            text-align: center;
            width: 100%;
          }

          .container {
            background-color: #212529;
            border-radius: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
            position: relative;
            overflow: hidden;
            width: 768px;
            max-width: 100%;
            min-height: 480px;
          }

          .container p {
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.3px;
            margin: 20px 0;
            color: #fff;
          }

          .container span {
            font-size: 12px;
            color: #fff;
          }

          .container a {
            color: #2da0a8;
            font-size: 13px;
            text-decoration: none;
            margin: 15px 0 10px;
            transition: color 0.3s ease;
          }

          .container a:hover {
            color: #1a237e;
          }

          .container button {
            background-color: #2da0a8;
            color: #fff;
            font-size: 12px;
            padding: 10px 45px;
            border: 1px solid transparent;
            border-radius: 8px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-top: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .container button:hover {
            background-color: #1a237e;
            transform: translateY(-2px);
          }

          .container button.hidden {
            background-color: transparent;
            border-color: #fff;
          }

          .container button.hidden:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }

          .container form {
            background-color: #212529;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 40px;
            height: 100%;
            width: 100%;
            max-width: 400px;
          }

          .container input {
            background-color: #2c3034;
            border: 1px solid #373b3e;
            margin: 8px 0;
            padding: 10px 15px;
            font-size: 13px;
            border-radius: 8px;
            width: 100%;
            outline: none;
            color: #fff;
            transition: all 0.3s ease;
          }

          .container input:focus {
            border-color: #2da0a8;
            box-shadow: 0 0 0 2px rgba(45, 160, 168, 0.2);
          }

          .container input::placeholder {
            color: #6c757d;
          }

          .form-container {
            position: absolute;
            top: 0;
            height: 100%;
            transition: all 0.6s ease-in-out;
          }

          .sign-in {
            left: 0;
            width: 50%;
            z-index: 2;
          }

          .container.active .sign-in {
            transform: translateX(100%);
          }

          .sign-up {
            left: 0;
            width: 50%;
            opacity: 0;
            z-index: 1;
          }

          .container.active .sign-up {
            transform: translateX(100%);
            opacity: 1;
            z-index: 5;
            animation: move 0.6s;
          }

          @keyframes move {
            0%, 49.99% {
              opacity: 0;
              z-index: 1;
            }
            50%, 100% {
              opacity: 1;
              z-index: 5;
            }
          }

          .toggle-container {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: all 0.6s ease-in-out;
            border-radius: 150px 0 0 100px;
            z-index: 1000;
          }

          .container.active .toggle-container {
            transform: translateX(-100%);
            border-radius: 0 150px 100px 0;
          }

          .toggle {
            background-color: #2da0a8;
            height: 100%;
            background: linear-gradient(to right, #1a237e, #2da0a8);
            color: #fff;
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateX(0);
            transition: all 0.6s ease-in-out;
          }

          .container.active .toggle {
            transform: translateX(50%);
          }

          .toggle-panel {
            position: absolute;
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 40px;
            text-align: center;
            top: 0;
            transform: translateX(0);
            transition: all 0.6s ease-in-out;
          }

          .toggle-panel h1 {
            white-space: nowrap;
            margin-bottom: 1.5rem;
          }

          .toggle-panel p {
            font-size: 0.95rem;
            line-height: 1.5;
            max-width: 300px;
          }

          .toggle-left {
            transform: translateX(-200%);
          }

          .container.active .toggle-left {
            transform: translateX(0);
          }

          .toggle-right {
            right: 0;
            transform: translateX(0);
          }

          .container.active .toggle-right {
            transform: translateX(200%);
          }

          @media (max-width: 768px) {
            .container {
              min-height: 400px;
              margin: 20px;
            }
            .main-title h1 {
              font-size: 2rem;
            }
            .main-title p {
              font-size: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
} 