import React from 'react';
import '../styles/Style.css'; 

const Services = () => {
  return (
    <section className="services-page">
      <h1>Our Tourism Services</h1>
      <p>Explore our wide range of global tourism services that offer unique experiences for every traveler.</p>
      <div className="services-container">
        <div className="service-card">
          <img src="https://via.placeholder.com/500x300" alt="Adventure Tourism" className="service-image" />
          <h3>Adventure Tourism</h3>
          <p>Experience thrilling adventures like hiking, trekking, and scuba diving in the most exotic locations.</p>
          <button className="btn-learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <img src="https://via.placeholder.com/500x300" alt="Eco-Tourism" className="service-image" />
          <h3>Eco-Tourism</h3>
          <p>Immerse yourself in sustainable tourism by exploring natural parks and conservation areas.</p>
          <button className="btn-learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <img src="https://via.placeholder.com/500x300" alt="Cultural Tourism" className="service-image" />
          <h3>Cultural Tourism</h3>
          <p>Discover the rich history, art, and heritage of different regions and cultures around the world.</p>
          <button className="btn-learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <img src="https://via.placeholder.com/500x300" alt="Medical Tourism" className="service-image" />
          <h3>Medical Tourism</h3>
          <p>Travel for healthcare, wellness retreats, and spa treatments with high-quality medical services.</p>
          <button className="btn-learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <img src="https://via.placeholder.com/500x300" alt="Wildlife Tourism" className="service-image" />
          <h3>Wildlife Tourism</h3>
          <p>Join unforgettable wildlife safaris and see majestic creatures in their natural habitat.</p>
          <button className="btn-learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <img src="https://via.placeholder.com/500x300" alt="Luxury Tourism" className="service-image" />
          <h3>Luxury Tourism</h3>
          <p>Indulge in 5-star luxury resorts, VIP tours, and exclusive experiences worldwide.</p>
          <button className="btn-learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <img src="https://via.placeholder.com/500x300" alt="Business Tourism" className="service-image" />
          <h3>Business Tourism</h3>
          <p>Plan and organize your next corporate meetings, conferences, and exhibitions abroad.</p>
          <button className="btn-learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <img src="https://via.placeholder.com/500x300" alt="Sports Tourism" className="service-image" />
          <h3>Sports Tourism</h3>
          <p>Attend international sporting events or participate in adventure sports activities.</p>
          <button className="btn-learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <img src="https://via.placeholder.com/500x300" alt="Culinary Tourism" className="service-image" />
          <h3>Culinary Tourism</h3>
          <p>Explore global cuisine with local food tours and authentic culinary experiences.</p>
          <button className="btn-learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <img src="https://via.placeholder.com/500x300" alt="Beach Tourism" className="service-image" />
          <h3>Beach Tourism</h3>
          <p>Relax at beach resorts and enjoy stunning island getaways in beautiful locations.</p>
          <button className="btn-learn-more">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Services;
