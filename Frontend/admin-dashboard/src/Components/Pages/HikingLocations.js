import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';  // React Router for navigation

const AdminHikingLocationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
        guides: ''
    });
    
    const history = useNavigate();  // For page redirection

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
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
        formDataToSend.append('image', formData.image);
        formDataToSend.append('guides', formData.guides);

        try {
            await axios.post('http://localhost:5000/api/locations', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Hiking location added successfully!');
            setFormData({ name: '', description: '', image: null, guides: '' });

            // Redirect to another page (e.g., locations list page)
            history.push('/locations');
        } catch (error) {
            console.error('Error adding location:', error);
            alert('Failed to add hiking location');
        }
    };

    return (
        <div className="admin-form">
            <h2>Add New Hiking Location</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Enter location name" 
                        required 
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        placeholder="Enter description" 
                        required 
                    />
                </div>

                <div>
                    <label>Image</label>
                    <input 
                        type="file" 
                        name="image" 
                        onChange={handleChange} 
                        accept="image/*" 
                        required 
                    />
                </div>

                <div>
                    <label>Guides (comma-separated)</label>
                    <input 
                        type="text" 
                        name="guides" 
                        value={formData.guides} 
                        onChange={handleChange} 
                        placeholder="Enter guides' names separated by commas" 
                    />
                </div>

                <button type="submit">Add Location</button>
            </form>
        </div>
    );
};

export default AdminHikingLocationForm;
