import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './style/sellcar.css';

const SellCar = () => {
  const [carDetails, setCarDetails] = useState({
    name: '',
    condition: '',
    price: '',
    imageFile: null // New state to store the selected image file
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Decode JWT token to get user ID
    const token = localStorage.getItem('token');

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.nameid; // Assuming the user's ID in the token is called 'nameid'

      // Create form data
      const formData = new FormData();
      formData.append('name', carDetails.name);
      formData.append('condition', carDetails.condition);
      formData.append('price', carDetails.price);
      formData.append('image', carDetails.imageFile); // Append the image file
      formData.append('userId', userId); // Append the userId

      // Send form data to your backend API to save the car in the database
      const response = await fetch('https://apicedraco20240522123857.azurewebsites.net/api/Car', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // Include JWT token in the request headers
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data);
      // Optionally, redirect or show a success message
    } catch (error) {
      console.error('Error:', error); // Log error
      // Handle error, show error message to the user
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    setCarDetails(prevState => ({
      ...prevState,
      imageFile: event.target.files[0] // Update the image file state
    }));
  };

  return (
    <div className="form-container">
      <h1>Sell Your Car</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={carDetails.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Condition:</label>
          <input type="text" name="condition" value={carDetails.condition} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={carDetails.price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" accept="image/*" name="image" onChange={handleImageChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SellCar;
