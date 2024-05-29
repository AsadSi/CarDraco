import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(0); // 0 for user, 1 for admin

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('https://localhost:7273/api/User/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }), // Send user data as JSON
      });

      if (response.ok) {
        console.log('Signup successful');
        // Optionally, you can redirect the user or show a success message here
      } else {
        console.error('Signup failed');
        // Handle signup failure (show error message to the user)
      }
    } catch (error) {
      console.error('Signup error:', error);
      // Handle other potential errors (e.g., network issues)
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(parseInt(e.target.value))}>
            <option value={0}>User</option>
            <option value={1}>Admin</option>
          </select>
        </div>
        <button type="submit">Signup</button>
        <p>Already have an account? <Link to="/">login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
