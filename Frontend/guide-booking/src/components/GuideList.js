import React, { useEffect, useState } from 'react';
import { fetchGuides } from '../services/api';
import '../styles/Styles.css';

const GuideList = () => {
    const [guides, setGuides] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploadedImageUrl, setUplodedImageUrl] = useState(null);

    useEffect(() => {
        const getGuides = async () => {
            try {
                const categorizedGuides = await fetchGuides(); // Await the response from fetchGuides
                setGuides(categorizedGuides); // The data is the response itself, no need for response.data
                console.log('Response:', categorizedGuides);

                // Check if categorizedGuides has the necessary data
                if (categorizedGuides.Biking && categorizedGuides.Biking.length > 0) {
                    setUplodedImageUrl(categorizedGuides.Biking[0].profileImage);
                }
            } catch (error) {
                console.error('Error loading guides:', error);
            } finally {
                setLoading(false);
            }
        };
        
        getGuides();
    }, []);

    if (loading) {
        return <p>Loading guides...</p>;
    }

    return (
        <div className="guide-list">
            <h1>Our Guides</h1>
            {Object.entries(guides).map(([specialization, guideList]) => (
                <div key={specialization} className="specialization-section">
                    <h2>{specialization}</h2>
                    <div className="guides">
                        {guideList.map(guide => (
                            <div key={guide._id} className="guide-card">
                                 {/* Uploaded image preview */}
                            
                                 
                                 {/* Guide's Profile Image */}
                            <img 
                                src={`http://localhost:5000/${guide.profileImage}`} 
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
            ))}
        </div>
    );
};

export default GuideList;
