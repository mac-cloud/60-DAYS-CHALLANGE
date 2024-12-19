import React from 'react';
import Footer from '../components/Footer';
import Gallery from '../pages/Gallery';
import Services from '../components/Services';
import Contact from '../pages/Contact';
import Header from '../components/Header';
//import TentList from './TentList';


const HomePage = () => {
        
   
    return (
        <>
        <Header/>
        <Services/>   
        <Gallery/>
        <Contact/>
        <Footer/>
      </>  
    );
};


export default HomePage;






