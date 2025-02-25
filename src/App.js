import React from 'react';

import { About, Footer, Header, Skills, Testimonial, Work} from './container';
import {Nav} from './components'
import {Slider} from './container';
import './App.scss';

const App = () => (
  <div className="app">
    <Nav/>
    <Slider/>
    <About/>
    <Skills/>
    <Work/>
    <Testimonial/>
    <Footer/>

  </div>
);

export default App;
