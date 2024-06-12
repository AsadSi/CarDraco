import React, { useState, useEffect } from 'react';

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
        <div class="container mt-5">
            <div class="row d-flex justify-content-center mt-5">
                <h2 className='my-5 text-white'>Cars for sale</h2>
            </div>
            <div class="row">
                {cars.map((car) => (
                    <div class="col-lg-4 col-md-6 mb-4" key={car.id}>
                        <div class="card h-100">
                            <div class="aspect-ratio-box">
                                <img src={car.imageUrl} class="card-img-top" alt={car.name} />
                            </div>
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">{car.name}</h5>
                                <p class="card-text">Condition: {car.condition}</p>
                                <p class="card-text">${car.price}</p>
                                {localStorage.getItem('role') === '1' && (
                                    <button class="btn btn-danger mt-auto" onClick={() => deleteCar(car.id)}>Delete</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carapidisplay;
