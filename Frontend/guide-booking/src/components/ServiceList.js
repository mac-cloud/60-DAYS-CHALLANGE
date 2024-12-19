import React, { useEffect, useState } from "react";
import axios from 'axios';

const ServiceList = () => {
    const [services, setServices] = useState([]);


    useEffect (() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/services');
                setServices (response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="service-list">
            <h2>Services we Offere</h2>
            <ul>
            {services.map((service) => (
          <li key={service._id}> 
              <h3>{service.serviceName}</h3>
             
              <img src={`http://localhost:5000/${service.serviceImage}`} alt={service.serviceName} />
              <p>{service.serviceDescription}</p>
              <a href={`http://localhost:3002/guide-list`}>
              <button className="learn-more">Learn More</button>
              </a>
                 </li>
                 ))}

            </ul>
        </div>
    );

  
};

export default ServiceList;