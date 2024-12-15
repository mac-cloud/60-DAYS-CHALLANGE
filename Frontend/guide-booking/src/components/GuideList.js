import React, { useEffect, useState } from 'react';
import { fetchGuides } from '../services/api';
import '../styles/Styles.css';
const GuideList = () => {
    const [guides, setGuides] = useState({});
    const [loading, setLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profileImage: file });
    
        // Generate preview of the image
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      };


    useEffect(() => {
        const getGuides = async () => {
            try {
                const categorizedGuides = await fetchGuides();
                setGuides(categorizedGuides);
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
                                <img src={guide.profileImage} alt={`${guide.name}'s profile`} />
                                <h3>{guide.name}</h3>
                                
                                <p>Experience: {guide.experience} years</p>
                                <p>Email: {guide.email}</p>
                           
                                <p>Places Visited: {guide.placesVisited.join(', ')}</p>
                                
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GuideList;
