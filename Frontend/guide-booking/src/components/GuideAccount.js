import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Styles.css';

const GuideRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        areaOfSpecialization: '',
        experience: '',
        description: '',
        profileImage: null,
        placesVisited: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.profileImage) {
            alert('Please upload a profile image.');
            return;
        }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await axios.post('http://localhost:5000/api/guide', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Server response', response.data);
            alert('Registration Successful');
            setFormData({
                name: '',
                email: '',
                password: '',
                areaOfSpecialization: '',
                experience: '',
                description: '',
                profileImage: null,
                placesVisited: ''
            });
        } catch (error) {
            console.error('Error registering guide:', error.response ? error.response.data : error);
            alert('Failed to register. Please try again.');
        }
    };

    return (
        <div className="registration-container">
            <h1>Tour Guide Registration</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="areaOfSpecialization"
                    placeholder="Area of Specialization"
                    value={formData.areaOfSpecialization}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="experience"
                    placeholder="Years of Experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Write a short description about yourself"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>

                <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="placesVisited"
                    placeholder="Places you have visited (comma-separated)"
                    value={formData.placesVisited}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default GuideRegistration;



  // eslint-disable-next-line