import React, { useState} from 'react';
import '../styles/Style.css';
import axios from 'axios';

const ContactForm = () => {
    const [ formData, setFormData] = useState({

        name: '',
        location: '',
         subject: '',
         message: '',
    });
         const [isLoading, setIsLoading] = useState(false);
         const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData ({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setResponseMessage('');
    
        try { 
            await axios.post('http://localhost:5000/api/contact', formData);
            setResponseMessage('Message sent successfully!');
            setFormData({ name: '', location: '', subject: '', message: ''});

        } catch (error) {
            setResponseMessage('Failed to send message. Please try again later.');
        } finally { 
            setIsLoading(false);
        }
    };

    return (
        <div className="contact-form-container">
          <h2>Contact Us</h2>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your name" 
                required 
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="Enter your location" 
                required 
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                placeholder="Enter the subject" 
                required 
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Enter your message" 
                rows="4" 
                required 
              ></textarea>
            </div>
    
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      ); 
};

export default ContactForm;