import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Styles.css';
import { jsPDF } from 'jspdf';

const BookingPage = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [touristName, setTouristName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [tentPackage, setTentPackage] = useState(false);
  const [isTentModalOpen, setIsTentModalOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
  const [selectedTent, setSelectedTent] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/locations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations();
  }, []);

  const handleImageClick = (location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNumberOfDaysChange = (e) => {
    const days = e.target.value;
    setNumberOfDays(days);
    if (days > 1) {
      setIsTentModalOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (numberOfDays > 1 && !selectedTent) {
      alert('Please select a tent option before booking.');
      return;
    }
    try {
      const bookingData = {
        locationName: selectedLocation.name,
        touristName,
        email,
        phone,
        date,
        numberOfPeople,
        numberOfDays,
        specialRequests,
        tentPackage,
      };
      await axios.post('http://localhost:5000/api/bookings', bookingData);
      alert('Booking Successful! A receipt has been sent to your email.');
      setBookingData(bookingData);
      setTouristName('');
      setEmail('');
      setPhone('');
      setDate('');
      setNumberOfPeople(1);
      setSpecialRequests('');
      setNumberOfDays(1);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Booking failed, please try again');
    }
  };

  const generateReceipt = () => {
    const doc = new jsPDF();
    const receiptTitle = 'Tour Booking Receipt';
    const receiptData = [
      `Booking for: ${bookingData.locationName}`,
      `Tourist Name: ${bookingData.touristName}`,
      `Email: ${bookingData.email}`,
      `Phone: ${bookingData.phone}`,
      `Date of Visit: ${bookingData.date}`,
      `Number of People: ${bookingData.numberOfPeople}`,
      `Number of Days: ${bookingData.numberOfDays}`,
      `Tent Package: ${bookingData.selectedTent ? bookingData.selectedTent : 'None'}`,
      `Special Requests: ${bookingData.specialRequests ? bookingData.specialRequests : 'None'}`,
    ];

    doc.setFontSize(18);
    doc.text(receiptTitle, 20, 20);

    let yOffset = 40;
    receiptData.forEach((line) => {
      doc.text(line, 20, yOffset);
      yOffset += 10;
    });

    const fileName = `Booking_Receipt_${bookingData.touristName.replace(/\s+/g, '_')}.pdf`;
    doc.save(fileName);
  };

  const handleTentSelect = () => {
    window.location.href = 'http://localhost:3001/tents';
    setIsTentModalOpen(false);
  };

  const handleContinueWithoutTent = () => {
    setTentPackage(false);
    setIsTentModalOpen(false);
  };

  const handleCloseTentModal = () => {
    setIsTentModalOpen(false);
  };

  return (
    <div className="app-container">
      <h1>Tourist Locations</h1>

      <div className="location-grid">
        {locations.map((location) => (
          <div
            key={location._id}
            onClick={() => handleImageClick(location)}
            className="location-card"
          >
            <h3>{location.name}</h3>
            <img src={`http://localhost:5000/${location.image}`} alt={location.name} />
            <h3>{location.name}</h3>
            <ul>
              {location.description.split('.').filter(point => point.trim() !== '').map((point, index) => (
                <li key={index}>{point.trim()}</li>
              ))}
            </ul>
            <p>{location.guides}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>&times;</button>
            <h2>Book Your Visit to {selectedLocation.name}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={touristName}
                onChange={(e) => setTouristName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <input
                type="number"
                min="1"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                required
              />
              <input
                type="number"
                min="1"
                value={numberOfDays}
                onChange={handleNumberOfDaysChange}
                required
              />
              <textarea
                placeholder="Special Requests (Optional)"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
              <button type="submit" className="submit-button">Submit Booking</button>
            </form>
          </div>
        </div>
      )}

      {isTentModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseTentModal}>
              &times;
            </button>
            <h2>Choose Tent Package</h2>
            <button onClick={handleTentSelect}>Select Tent</button>
            <button onClick={handleContinueWithoutTent}>Continue Without Tent</button>
          </div>
        </div>
      )}

      {bookingData && (
        <div className="receipt-container">
          <h3>Booking Successful!</h3>
          <button onClick={generateReceipt}>Download Receipt</button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
