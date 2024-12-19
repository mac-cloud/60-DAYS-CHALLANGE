import React, { useState } from "react";
import axios from 'axios';
import '../../Styles/style.css';

const TentHiring = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        tentImage: null,
        packageImage: null,
        dayTimePrice: '',
        nightPrice: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const imageFields = ['tentImage', 'packageImage'];

        if (imageFields.includes(name)) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('tentImage', formData.tentImage);
        formDataToSend.append('packageImage', formData.packageImage);
        formDataToSend.append('dayTimePrice', formData.dayTimePrice);
        formDataToSend.append('nightPrice', formData.nightPrice);

        try {
            await axios.post('http://localhost:5000/api/tent', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Tent added successfully.');
            setFormData({ 
                name: '', 
                description: '', 
                tentImage: null, 
                packageImage: null, 
                dayTimePrice: '', 
                nightPrice: '' 
            });
        } catch (error) {
            console.error('Error adding tent', error);
            alert('Failed to add tent.');
        }
    };

    return (
        <div className="admin-form">
            <h2>Add New Tent</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Tent Name</label>
                    <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter tent name"
                        required
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />
                </div>

                <div>
                    <label>Tent Image</label>
                    <input 
                        type="file"
                        name="tentImage"
                        onChange={handleChange}
                        accept="image/*"
                        required
                    />
                </div>

                <div>
                    <label>Package Image</label>
                    <input 
                        type="file"
                        name="packageImage"
                        onChange={handleChange}
                        accept="image/*"
                        required
                    />
                </div>

                <div>
                    <label>Day Pricing</label>
                    <input 
                        type="number"
                        name="dayTimePrice"
                        value={formData.dayTimePrice}
                        onChange={handleChange}
                        placeholder="Day Pricing"
                        required
                    />
                </div>

                <div>
                    <label>Night Pricing</label>
                    <input 
                        type="number"
                        name="nightPrice"
                        value={formData.nightPrice}
                        onChange={handleChange}
                        placeholder="Night Pricing"
                        required
                    />
                </div>

                <button type="submit">Add Tent</button>
            </form>
        </div>
    );
};

export default TentHiring;
