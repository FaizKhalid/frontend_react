import React from 'react';
import { About, Footer, Work, Slider,Accordion,Testimonial,Services } from './container';
import Navbar from './components/Navbar/Navbar';
import './App.scss';

const App = () => (
  <div className="app">
    <Navbar/>
    <Slider/>
    <About/>
    <Work/>
    <Services/>
    <Testimonial/>
    <Accordion/>
    <Footer/>
  </div>
);

export default App;
