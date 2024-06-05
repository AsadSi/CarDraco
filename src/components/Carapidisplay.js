import React, { useState, useEffect } from 'react';
import './style/carapidisplay.css';

function Carapidisplay() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const isAdmin = localStorage.getItem('role') === '1';
                const url = isAdmin ? 'https://apicedraco20240522123857.azurewebsites.net/api/Car' : 'https://apicedraco20240522123857.azurewebsites.net/api/car/public';
                
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setCars(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchCars();
    }, []);

    const deleteCar = async (id) => {
        try {
            const response = await fetch(`https://apicedraco20240522123857.azurewebsites.net/api/Car/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setCars(cars.filter(car => car.id !== id));
        } catch (error) {
            console.error("Error deleting car: ", error);
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
                {cars.map((car) => (
                    <div className="grid-item" key={car.id}>
                        <div className="image-wrapper">
                            <img src={car.imageUrl} alt={car.name} />
                        </div>
                        <div>
                            <p>{car.name}</p>
                            <p>{car.condition}</p>
                            <p>${car.price}</p>
                            {localStorage.getItem('role') === '1' && (
                                <button onClick={() => deleteCar(car.id)}>Delete</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carapidisplay;
