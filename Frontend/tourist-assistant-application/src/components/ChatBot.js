import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Style.css'; 

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    // Toggle chatbot open/close
    const toggleChat = () => setIsOpen(!isOpen);

    // Handle user input
    const handleInputChange = (e) => setUserInput(e.target.value);

    // Send message to OpenAI and get response from **backend**
    const handleSendMessage = async () => {
        if (!userInput) return;

        const userMessage = { sender: 'user', text: userInput };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post('http://localhost:5000/api/chatbot', {
                messages: [...messages.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text })), 
                    { role: 'user', content: userInput }]
            });

            const botMessage = { sender: 'bot', text: response.data.choices[0].message.content };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error communicating with the chatbot:', error);
            const errorMessage = { sender: 'bot', text: 'Something went wrong. Please try again later.' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }

        setUserInput('');
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-icon" onClick={toggleChat}>💬</div>
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <button onClick={toggleChat}>X</button>
                    </div>
                    <div className="chat-body">
                        {messages.map((message, index) => (
                            <div key={index} className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="chat-footer">
                        <input 
                            type="text" 
                            placeholder="Type your message..." 
                            value={userInput} 
                            onChange={handleInputChange} 
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                    </div>
                    <div className="Butt">
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
