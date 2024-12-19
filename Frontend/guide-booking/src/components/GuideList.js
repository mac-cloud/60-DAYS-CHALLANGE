import React, { useEffect, useState } from 'react';
import { fetchGuides } from '../services/api';
import '../styles/Styles.css';

const GuideList = () => {
    const [guides, setGuides] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // State to track search input

    useEffect(() => {
        const getGuides = async () => {
            try {
                const categorizedGuides = await fetchGuides();
                setGuides(categorizedGuides);
                console.log('Response:', categorizedGuides);
            } catch (error) {
                console.error('Error loading guides:', error);
            } finally {
                setLoading(false);
            }
        };
        
        getGuides();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    if (loading) {
        return <p>Loading guides...</p>;
    }

    // Filter guides based on the search query
    const filteredGuides = {};
    Object.entries(guides).forEach(([specialization, guideList]) => {
        const filteredList = guideList.filter(guide => 
            guide.name.toLowerCase().includes(searchQuery) ||
            specialization.toLowerCase().includes(searchQuery) ||
            (Array.isArray(guide.placesVisited) && 
             guide.placesVisited.some(place => place.toLowerCase().includes(searchQuery)))
        );
        if (filteredList.length > 0) {
            filteredGuides[specialization] = filteredList;
        }
    });

    return (
        <div className="guide-list">
            {/* Search bar at the top */}
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search guides by name, specialization, or places visited..." 
                    value={searchQuery} 
                    onChange={handleSearch} 
                    className="search-input"
                />
            </div>

            <h1>Our Guides</h1>
            {Object.entries(filteredGuides).length === 0 ? (
                <p>No guides found matching your search.</p>
            ) : (
                Object.entries(filteredGuides).map(([specialization, guideList]) => (
                    <div key={specialization} className="specialization-section">
                        <h2>{specialization}</h2>
                        <div className="guides">
                            {guideList.map(guide => (
                                <div key={guide._id} className="guide-card">
                                    <img 
                                        src={guide.profileImage ? `http://localhost:5000/${guide.profileImage}` : '/default-avatar.png'} 
                                        alt={`Profile of ${guide.name}`} 
                                        className="profile-image"
                                    />
                                    <h3>{guide.name}</h3>
                                    <p>Experience: {guide.yearsOfExperience} years</p>
                                    <p>Email: {guide.email}</p>
                                    <p>Places Visited: {Array.isArray(guide.placesVisited) ? guide.placesVisited.join(', ') : 'No places listed'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default GuideList;
