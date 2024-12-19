import React from 'react';
import Footer from '../components/Footer';
import Gallery from '../pages/Gallery';
import Services from '../components/Services';
import Contact from '../pages/Contact';
import Header from '../components/Header';
import ChatBot from '../components/ChatBot';
//import TentList from './TentList';


const HomePage = () => {
        
   
    return (
        <>
        <Header/>
        <Services/>   
        <Gallery/>
        <Contact/>
        <ChatBot/>
        <Footer/>
      </>  
    );
};


export default HomePage;






