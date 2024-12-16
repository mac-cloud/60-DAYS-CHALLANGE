//import React, { useState, useEffect} from 'react';
//import axios from 'axios';
//
//const HikingLocation = ({ onSelectLocation}) => {
//    const [locations, setLocations] = useState([]);
//
//    useEffect(() => {
//        axios.get('http://localhost:5000/api/location')
//            .then(response => setLocations(response.data))
//            .catch(error => console.log(error));
//    }, []);
//
//    return(
//        <div className="hiking-locations">
//            <h2>Hiking Locations</h2>
//            <div className="location-grid">
//            {locations.map(location => (
//                    <div key={location._id} className="location-card" onClick={() => onSelectLocation(location)}>
//                        <h3>{location.name}</h3>
//                        </div>
//                ))}
//            </div>
//        </div>
//    ) ;
//};
//
//export default HikingLocation;

