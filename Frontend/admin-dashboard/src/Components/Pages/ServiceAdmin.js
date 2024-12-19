import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/style.css';

const ServiceOffered = () => {

    const [formData, setFormData] = useState({
        serviceName: '',
        serviceDescription: '',
        serviceImage: '',

    });



    const handleChange =(e) => {
        const { name, value, files } = e.target;
    

        if ( name === 'serviceImage') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('serviceName',formData.serviceName);
        formDataToSend.append('serviceDescription',formData.serviceDescription);
        formDataToSend.append('serviceImage',formData.serviceImage);
        

        try {
            await axios.post('http://localhost:5000/api/services', formDataToSend, {
                  headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Services added successfully!');
            setFormData({ serviceName: '', serviceDescription: '', serviceImage: null});
        } catch (error) {
            console.error('Error adding services');
            alert('Failed to add service location');

    }
    };

    return (
    <div className="admin-form">
        <h2>Add New Service</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
            <label>Service Name</label>
            <input 
               type="text"
               name="serviceName"
               value={formData.name}
               onChange={handleChange}
               placeholder="service name"
               required

            />
        </div>
        <div>
            <label>Service Description</label>
            <input 
               type="text"
               name="serviceDescription"
               value={formData.name}
               onChange={handleChange}
               placeholder="service description"
               required

            />
        </div>
        <div>
            <label>Service Image</label>
            <input 
            type="file"
            name="serviceImage"
            onChange={handleChange}
            accept="image/*"
            required
            />
        </div>
         <button type="submit">Add Service</button>

        </form>
    </div>
    );
};

export default ServiceOffered;