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
    <div className="container mt-5">
      <div className="d-flex justify-content-center mt-5">
        <div className="card p-4 mt-5">
          <h1 className="text-center">Sell Your Car</h1>
          {successMessage && <p className="alert alert-success">{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={carDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="condition" className="form-label">Condition:</label>
              <input
                type="text"
                className="form-control"
                id="condition"
                name="condition"
                value={carDetails.condition}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price:</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={carDetails.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image:</label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellCar;
