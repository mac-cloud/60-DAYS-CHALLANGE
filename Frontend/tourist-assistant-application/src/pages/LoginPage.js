import React, { useState} from 'react';
import '../styles/Style.css';

const SignUpPage = () => {
    //Define variable
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message , setMessage] = useState('');

    //submission
    const handleSubmit = (e) => {
        e.preventDefault();
 

    //validation
    if ( !email || !password) {
        setMessage('All fields are required!');
        return;
    }

    //API to send data
    setMessage(`User Logned in:  ${email}`);
    

    };
return (
    <div>
      
      <form onSubmit={handleSubmit}>
      <h2>Login</h2>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};



export default SignUpPage;



