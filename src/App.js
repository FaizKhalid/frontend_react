import React from 'react';
import { About, Footer, Work, Slider,Accordion,Testimonial,Services,Aboutme } from './container';
import Navbar from './components/Navbar/Navbar';
import './App.scss';

const App = () => (
  <div className="app">
    {/* <Navbar/>
    <Slider/>
    <About/>
    <Work/>
    <Services/>
    <Testimonial/>
    <Accordion/>
    <Footer/> */}
    <Aboutme/>
  </div>
);

export default App;
