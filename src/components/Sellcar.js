import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './style/sellcar.css';

const SellCar = () => {
  const [carDetails, setCarDetails] = useState({
    name: '',
    condition: '',
    price: '',
    imageFile: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getAntiForgeryToken = async () => {
    const response = await fetch('https://apicedraco20240522123857.azurewebsites.net/api/antiforgerytoken');
    const data = await response.json();
    return data.token;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    const token = localStorage.getItem('token');

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.nameid;

      const formData = new FormData();
      formData.append('name', carDetails.name);
      formData.append('condition', carDetails.condition);
      formData.append('price', carDetails.price);
      formData.append('image', carDetails.imageFile);
      formData.append('userId', userId);

      const antiForgeryToken = await getAntiForgeryToken();

      const response = await fetch('https://apicedraco20240522123857.azurewebsites.net/api/Car', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'XSRF-TOKEN': antiForgeryToken
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      setCarDetails({
        name: '',
        condition: '',
        price: '',
        imageFile: null
      });
      setSubmitting(false);
      console.log('Car sold successfully!');
    } catch (error) {
      setErrorMessage('An error occurred while selling the car. Please try again later.');
      console.error('Error:', error);
      setSubmitting(false);
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
      imageFile: event.target.files[0]
    }));
  };

  return (
    <div className="form-container">
      <h1>Sell Your Car</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={carDetails.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Condition:</label>
          <input type="text" name="condition" value={carDetails.condition} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={carDetails.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" accept="image/*" name="image" onChange={handleImageChange} required />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" disabled={submitting}>Submit</button>
      </form>
    </div>
  );
}

export default SellCar;
