import React, { useState } from 'react';
import '../styles/Style.css';
import axios from 'axios'; 


const SignUpPage = () => {
    //Define state for form inputs
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Form validation
        if (!firstname || !lastname || !username || !email || !password) {
            setMessage('All fields are required!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                firstname,
                lastname,
                username,
                email,
                password
            });
            setMessage(response.data.message); // Show success message
        } catch (error) {
            if (error.response && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Server error. Please try again later.');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SignUpPage;
