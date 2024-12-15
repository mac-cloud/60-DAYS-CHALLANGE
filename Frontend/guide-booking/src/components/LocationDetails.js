import React from 'react';


const LocationDetails = ({ location, onBack }) => {
      if(!location) return null;

      return (
        <div className="location-details">
            <button onClick={(onBack)}>Back</button>
            <h2>{location.name}</h2>
            <img src="{location.image}" alt={location.name} />
            <p>{location.description}</p>

            <h3>Available Guides</h3>
            {location.guides.map((guide, index) => (
                <div key={index}>
                    <strong>{guide.name}</strong> - {guide.email}
                    <button>Request a Call</button>
                    <button>Continuem to Booking</button>
                    </div>
            ))}
        </div>
      );
};

export default LocationDetails;