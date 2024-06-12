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
        <div>
        <div className="position-relative mb-4">
          <div className="overlay position-absolute w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
            <p className="text-white fs-2">Car List</p>
          </div>
        </div>
  
        <div className="row">
          {cars.map((car) => (
            <div className="col-lg-4 col-md-6 mb-4" key={car.id}>
              <div className="card">
                <img src={car.imageUrl} className="card-img-top" alt={car.name} />
                <div className="card-body">
                  <h5 className="card-title">{car.name}</h5>
                  <p className="card-text">Condition: {car.condition}</p>
                  <p className="card-text">${car.price}</p>
                  {localStorage.getItem('role') === '1' && (
                    <button className="btn btn-danger" onClick={() => deleteCar(car.id)}>Delete</button>
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
