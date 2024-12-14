import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Notification = () => {
    const [messages, setMessages] = useState([]);
    const [weeklyCounts, setWeeklyCounts] = useState([]);
    

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/messages');
            setMessages(response.data);

        } catch (error) {
            console.error('Error fetching messages', error);
        }
    };
//weekly message count
const fetchWeeklyCount = async () => {
    try {
        const response = await axios('http://localhost:5000/api/weekly-count');
        const formattedCounts = Array(7).fill(0);

        response.data.forEach(dayData => {

            const dayIndex = dayData._id -1;
            formattedCounts[dayIndex] = dayData.count;
        });

        setWeeklyCounts(formattedCounts);
    } catch (error) {
        console.error('Error fetching message counts:', error);
    }
};

useEffect(() => {

    fetchMessages();
    fetchWeeklyCount();
}, []);

const data = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
        {
            label: 'Messages per Day',
            data: weeklyCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }
    ]
};

const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

return (
    <div className="App">
        <h1>Message Board</h1>
        <div className="message-chart-section">
                
                <div className="messages-container">
        <h2>All Messages</h2>
        <ul>
            {messages.map(message => (
                <li key={message._id}>
                    <strong>{message.name}:</strong> {message.message} <br />
                    <em>Location:</em> {message.location} | <em>Subject:</em> {message.subject}
                </li>
            ))}
        </ul>

        </div>
        <div className="chart-container">
        <h2>Message Count for the Week</h2>
        <Bar data={data} options={options} />
    </div>
    </div>
    </div>
);
};

export default Notification;