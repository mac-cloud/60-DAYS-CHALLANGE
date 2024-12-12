import React from 'react';
import '../styles/Style.css';
import lion from'../Images/lion.jpeg';
import safari from '../Images/safari.jpeg'
const Gallery = () => {
    const parksData = [
        { name: "Nairobi national Part", category: "Wildlife Park", imageUrl: lion},
        { name: "Amboseli national Park", category: "Wildlife Park", imageUrl:lion},
        { name: "Amboseli national Park", category: "Wildlife Park", imageUrl:lion},
        { name: "Amboseli national Park", category: "Wildlife Park", imageUrl:lion},
        { name: "Amboseli national Park", category: "Wildlife Park", imageUrl:lion},
        { name: "Amboseli national Park", category: "Wildlife Park", imageUrl:lion},
        { name: "Mount Kenya national Park", category: "Adventure Park", imageUrl:safari},
        { name: "Masaai Mara national Park", category: "Mountain Park", imageUrl:lion},
        { name: "Masaai Mara national Park", category: "Mountain Park", imageUrl:lion},
        { name: "Masaai Mara national Park", category: "Mountain Park", imageUrl:lion},
    ];

    //group parks by catergory
    const categories = parksData.reduce((acc, park) => {
        if (!acc[park.category]) {
            acc[park.category] = [];
        }
        acc[park.category].push(park);
        return acc;
    }, {});

    return (
        <div>
          <h4>Tourist Site in Kenya</h4>
          <div>
            {Object.keys(categories).map((category) => (
              <div key={category} className="category">
                <h2>{category}</h2>
                <div className="parks">
                  {categories[category].map((park) => (
                    <div key={park.name} className="park-card">
                      <img src={park.imageUrl} alt={park.name} className="park-image" />
                     
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
    

export default Gallery