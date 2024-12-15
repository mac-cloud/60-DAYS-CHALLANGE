import React, {useEffect, useState} from 'react';
import axios from 'axios';


const TentRentals = () => {
    const [tents, setTents] =useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/tents')
            .then(response => setTents(response.data))
            .catch(error => console.log(error));
    }, []);

    const rentTent = (tentId) => {
          alert(`You have rented the tent with ID: ${tentId}`);
    };

    return (
        <div className="tent-rentals">
            <h2>Rent a Tent</h2>
            <div className="tent-grid">
                {tents.map(tent => (
                    <div key={tent._id} className="tent-card">
                        <img src={tent.image} alt="Tent"/>
                        <h3>{tent.name}</h3>
                        <button onClick={() => rentTent(tent._id)}>Rent This Tent </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TentRentals;