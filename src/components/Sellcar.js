import React, { useState } from 'react';
import './style/sellcar.css';

function Sellcar() {
  const [carDetails, setCarDetails] = useState({
    name: '',
    condition: '',
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7060/api/Car/PostCar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carDetails),
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // Or response.json() if your server sends JSON response
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorDetails}`);
      }

      const data = await response.json();
      console.log('Car posted successfully:', data);
      // Optionally reset the form or give user feedback
    } catch (error) {
      console.error('Error posting car:', error.message);
      // Here you can set an error message in your state and display it in the UI, if needed
    }
  };

  return (
    <div class="form-container">
      <h1>Sell Your Car</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={carDetails.name} onChange={handleChange} />
        </div>
        <div class="form-group">
          <label>Condition:</label>
          <input type="text" name="condition" value={carDetails.condition} onChange={handleChange} />
        </div>
        <div class="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={carDetails.price} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>

  );
}

export default Sellcar;
