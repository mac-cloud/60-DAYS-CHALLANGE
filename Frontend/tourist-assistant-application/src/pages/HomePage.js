import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
        const openAdminPage = () => {
            window.open('http://localhost:3000', '_blank');
        }
   
    return (
        <div className="homepage-container">
            {/* Navbar section */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <h2>AFRICAN</h2>
                </div>
                <ul className="navbar-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <button onClick={openAdminPage} >Admin</button>
                    </li>
                    <li>
                        <Link to="/gallery">Gallery</Link>
                    </li>
                    <li>
                         <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/guide">Guide</Link>
                    </li>
                    <li>
                        <button>
                        <Link to="/signup" className="btn">Sign Up</Link>
                        </button>
                    </li>
                    <button >
                    <li>
                        <Link to="/login" className="btn">Login</Link>
                    </li>
                   </button>
                </ul>
            </nav>

            {/* Main content */}
            <div className="homepage-content">
                <h2>You are a Guide right?</h2>
                <button>Create Account</button>
                <h1>Welcome to the Virtual Travel </h1>
                <p>Explore the best of African tourism with AI-powered assistance.</p>
            </div>
        </div>
    );
};


export default HomePage;






