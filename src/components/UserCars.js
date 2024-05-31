import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './style/carapidisplay.css';

const UserCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingCar, setEditingCar] = useState(null);
    const [editForm, setEditForm] = useState({
        id: null,
        name: '',
        condition: '',
        price: 0,
        imageUrl: '',
        isPublic: true // Default value for isPublic
    });
    const [userId, setUserId] = useState(null); // State to store userId

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('User not logged in');
                }

                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);
                setUserId(decodedToken.nameid); // Set userId from decoded token

                const response = await fetch(`https://apicedraco20240522123857.azurewebsites.net/api/Car/user/${decodedToken.nameid}`);
                if (!response.ok) {
                    throw new Error();
                }

                const data = await response.json();
                setCars(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const getAntiForgeryToken = async () => {
        const response = await fetch('https://apicedraco20240522123857.azurewebsites.net/api/antiforgerytoken');
        const data = await response.json();
        return data.token;
    };

    const deleteCar = async (id) => {
        try {
            const response = await fetch(`https://apicedraco20240522123857.azurewebsites.net/api/car/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setCars(cars.filter(car => car.id !== id));
        } catch (err) {
            setError(err);
        }
    };

    const startEditCar = (car) => {
        setEditingCar(car.id);
        setEditForm({
            id: car.id,
            name: car.name,
            condition: car.condition,
            price: car.price,
            imageUrl: car.imageUrl,
            isPublic: car.isPublic // Set isPublic value from the car data
        });
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log(`Change made to ${name}: ${value}`);
        if (name === 'isPublic') {
            // Convert value to boolean
            setEditForm(prevState => ({
                ...prevState,
                isPublic: value === 'true'
            }));
        } else {
            setEditForm(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setEditForm(prevState => ({
                ...prevState,
                imageUrl: reader.result // Update the imageUrl in the editForm state with the data URL
            }));
        };
    
        if (file) {
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };
      

    const submitEdit = async (e) => {
        e.preventDefault();
        try {
            // Get anti-forgery token
            const antiForgeryToken = await getAntiForgeryToken();
            const token = localStorage.getItem('token');

            const response = await fetch(`https://apicedraco20240522123857.azurewebsites.net/api/Car/${editingCar}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'XSRF-TOKEN': antiForgeryToken
                },
                body: JSON.stringify({
                    ...editForm,
                    userId: userId // Include userId in the request body
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedCar = await response.json();
            console.log('Changes applied:', updatedCar);
            setCars(cars.map(car => car.id === editingCar ? updatedCar : car));
            setEditingCar(null);
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div>
            <div className="image-container">
                <div className="overlay">
                    <p className="text">Car List</p>
                </div>
            </div>

            <div className="grid-container">
                {cars.map(car => (
                    <div className="grid-item" key={car.id}>
                        <div className="image-wrapper">
                            <img src={car.imageUrl} alt={car.name} />
                        </div>
                        <div>
                            <p>Name: {car.name}</p>
                            <p>Condition: {car.condition}</p>
                            <p>Price: ${car.price}</p>
                            <button onClick={() => startEditCar(car)}>Edit</button>
                            <button onClick={() => deleteCar(car.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}

            {editingCar && (
                <div className="form-container">
                    <h1>Edit Car</h1>
                    <form onSubmit={submitEdit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" name="name" value={editForm.name} onChange={handleEditChange} />
                        </div>
                        <div className="form-group">
                            <label>Condition:</label>
                            <input type="text" name="condition" value={editForm.condition} onChange={handleEditChange} />
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input type="number" name="price" value={editForm.price} onChange={handleEditChange} />
                        </div>
                        <div className="form-group">
                            <label>Image:</label>
                            <input type="file" accept="image/*" name="image" onChange={handleImageChange} />
                        </div>
                        <div className="form-group">
                            <label>Is Public:</label>
                            <select name="isPublic" value={editForm.isPublic} onChange={handleEditChange}>
                                <option value={true}>Public</option>
                                <option value={false}>Hidden</option>
                            </select>
                        </div>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditingCar(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserCars;
