import React, { useState, useEffect } from 'react';
import './style/carapidisplay.css';

function Carapidisplay() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('https://localhost:7060/api/Car/GetCars');
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

    const deleteCar = async (carId) => {
        try {
            const response = await fetch(`https://localhost:7060/api/Car/DeleteCar/${carId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Filter out the deleted car and update state
            setCars(cars.filter(car => car.carId !== carId));
        } catch (error) {
            console.error("Error deleting car: ", error);
        }
    };

    return (
        <div>
            <div className="image-container">
                <div className="overlay">
                    <p className="text">Car</p>
                </div>
            </div>

            <div className="grid-container">
                {cars.map((car) => (
                    <div className="grid-item" key={car.carId}>
                        <p>Name: {car.name}</p>
                        <p>Condition: {car.condition}</p>
                        <p>Price: ${car.price}</p>
                        <button onClick={() => deleteCar(car.carId)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carapidisplay;
