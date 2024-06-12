import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';

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
        isPublic: true 
    });
    const [userId, setUserId] = useState(null); 
    const [successMessage, setSuccessMessage] = useState('');
    const editingCarRef = useRef(null); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('User not logged in');
                }

                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);
                setUserId(decodedToken.nameid); 

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
            isPublic: car.isPublic 
        });

        editingCarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log(`Change made to ${name}: ${value}`);
        if (name === 'isPublic') {
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
                imageUrl: reader.result
            }));
        };
    
        if (file) {
            reader.readAsDataURL(file); 
        }
    };
      

    const submitEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://apicedraco20240522123857.azurewebsites.net/api/Car/${editingCar}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...editForm,
                    userId: userId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedCar = await response.json();
            console.log('Changes applied:', updatedCar);
            setCars(cars.map(car => car.id === editingCar ? updatedCar : car));
            setEditingCar(null);
            setSuccessMessage('Car edited successfully!');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div class="container mt-5">
            <div class="row d-flex justify-content-center mt-5">
                <h2 className='my-5 text-white text-center'>Your cars</h2>
            </div>
            <div className="row">
                {cars.map(car => (
                    <div className="col-lg-4 col-md-6 mb-4" key={car.id}>
                        <div className="card h-100">
                            <div className="aspect-ratio-box">
                                <img src={car.imageUrl} className="card-img-top" alt={car.name} />
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{car.name}</h5>
                                <p className="card-text">Condition: {car.condition}</p>
                                <p className="card-text">${car.price}</p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-primary" onClick={() => startEditCar(car)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteCar(car.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
            ))}
            </div>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-danger text-center">{error.message}</p>}
    
            {editingCar && (
            <div ref={editingCarRef} className="card p-4 mt-4">
                <h1 className="text-center">Edit Car</h1>
                {successMessage && <p className="alert alert-success">{successMessage}</p>}
                <form onSubmit={submitEdit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" value={editForm.name} onChange={handleEditChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="condition" className="form-label">Condition:</label>
                    <input type="text" className="form-control" id="condition" name="condition" value={editForm.condition} onChange={handleEditChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price:</label>
                    <input type="number" className="form-control" id="price" name="price" value={editForm.price} onChange={handleEditChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image:</label>
                    <input type="file" className="form-control" id="image" accept="image/*" name="image" onChange={handleImageChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="isPublic" className="form-label">Is Public:</label>
                    <select className="form-select" id="isPublic" name="isPublic" value={editForm.isPublic} onChange={handleEditChange}>
                    <option value={true}>Public</option>
                    <option value={false}>Hidden</option>
                    </select>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditingCar(null)}>Cancel</button>
                </div>
                </form>
            </div>
            )}
        </div>
    );
};

export default UserCars;
