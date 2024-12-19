import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/Style.css';



const TentList = () => {
    const [tents, setTents] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [selectedTent , setSelectedTent] = useState(null);

  


    useEffect(() => {
        
        const fetchTents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tents');
                setTents(response.data); 
               
            } catch (error) {
                console.error('Error fetching tents:', error);
               
            }
        };
        fetchTents();
    }, []); 

    //function to handle tent selection
    const handleTentClick = (tent) => {
        setSelectedTent({
            id: tent._id,
            name: tent.name
        });
        
            const bookingUrl = `http://localhost:3002/location-list?id=${tent._id}&name=${encodeURIComponent(tent.name)}`;
            window.location.href = bookingUrl;
        };
    
    return (
        <div className="Tent-List">
            <h2>Tents for Hire</h2>
            <ul>
                {tents.map((tent) => (
                    <li key={tent._id} onClick={() => handleTentClick(tent)}> 
                        <h3>{tent.name}</h3>
                        <img src={`http://localhost:5000/${tent.tentImage}`} alt={tent.name} />
                        <div className="package">
                            <p1>Enjoy FREE package!!!</p1>
                            <p>Sleeping Bag</p>
                        <img src={`http://localhost:5000/${tent.packageImage}`} alt={tent.name} />
                        </div>
                        <p>{tent.description}</p>
                        <p>Day Price: ksh{tent.dayTimePrice}</p>
                        <p>Night Price: ksh{tent.nightPrice}</p>
                        <a href="/booking">
                            <button>Make Order</button>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TentList;
