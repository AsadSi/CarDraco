import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(0);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState(null); // State for error message

  const handleSignup = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('https://apicedraco20240522123857.azurewebsites.net/api/User/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (response.ok) {
        setSignupSuccess(true); // Set signup success state
        setSignupError(null); // Clear any previous errors
        console.log('Signup successful');
      } else {
        // Handle other non-success responses (e.g., bad request)
        const data = await response.json();
        setSignupError(data.message || 'Signup failed');
        console.error('Signup failed:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError('Signup failed'); // Generic error message
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center my-5">
        <div className="card p-4 mt-5">
          <h2 className="text-center">Signup</h2>
          {signupSuccess && ( // Display success message if signup was successful
            <div className="alert alert-success" role="alert">
              Signup successful!
            </div>
          )}
          {signupError && ( // Display error message if signup failed
            <div className="alert alert-danger" role="alert">
              {signupError}
            </div>
          )}
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                id="role"
                value={role}
                onChange={(e) => setRole(parseInt(e.target.value))}
              >
                <option value={0}>User</option>
                <option value={1}>Admin</option>
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="m-3 btn btn-primary">Signup</button>
            </div>
            <p className="mt-3 text-center">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
