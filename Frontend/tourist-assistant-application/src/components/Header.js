import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Style.css';

const HomePage = () => {
        const openAdminPage = () => {
            window.open('http://localhost:3000', '_blank');
        }
   
    return (
        <>
       
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
                        <Link to="/tents">Catalog</Link>
                    </li>
                   
                    <li><a href={`http://localhost:3002/guide-list`}>
                        Guides 
                        </a>
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
            <div className="marquee-container">
                  <div className="marquee-content">
                    Welcome, you are a guide! Create an account with us 
                    
                    <a href={`http://localhost:3002/guide`}>CLICK HERE</a>
                  </div>
                </div>
            <div className="homepage-content">
              
                <a href={`http://localhost:3002/location-list`}>
                <button>Planning for Adventure??? have a view of some places</button>
                </a>
               
                <h1>Welcome to the Virtual Travel </h1>
                <p>Explore the best of African tourism with AI-powered assistance.</p>
            </div>
        </div>
        
      </>  
    );
};


export default HomePage;






