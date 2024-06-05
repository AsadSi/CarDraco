import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const SellCar = () => {
  const [carDetails, setCarDetails] = useState({
    name: '',
    condition: '',
    price: '',
    imageFile: null
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      const response = await fetch('https://apicedraco20240522123857.azurewebsites.net/api/Car', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` 
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      setSuccessMessage('Car posted successfully!');
      setCarDetails({
        name: '',
        condition: '',
        price: '',
        imageFile: null
      });
    } catch (error) {
      console.error('Error:', error); 
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
      {successMessage && <p className="success-message">{successMessage}</p>}
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
