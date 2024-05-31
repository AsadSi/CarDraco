import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const getCSRFToken = () => {
    const cookie = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
    return cookie ? cookie[2] : null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('https://apicedraco20240522123857.azurewebsites.net/api/User/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getCSRFToken()
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const { token, role } = data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role.toString()); // Store role as string ('0' or '1')
            setError(null);
            window.location.reload(); // Refresh page to update authentication status
        } else {
            setError('Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Login error:', error.message);
        setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="form-container">
        <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </div>
            <div className="form-group">
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
  

            <button type="submit">Login new one</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </form>
        </div>
    </div>
  );
};

export default Login;
