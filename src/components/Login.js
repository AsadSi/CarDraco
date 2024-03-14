import React, { useState } from 'react';
import './style/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login Credentials:', { username, password });
    // Here you would typically handle the login logic,
    // like sending the credentials to the backend server for verification
  };

  return (
    <div className="form-container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        </div>
        <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        </div>
        <button type="submit">Login</button>
    </form>
    </div>
  );
}

export default Login;
