import React from 'react';

import { About, Footer, Skills, Testimonial, Work,concept} from './container';
import {Nav} from './components'
import {Slider} from './container';
import './App.scss';

const App = () => (
  <div className="app">
    <Nav/>
    <Slider/>
    <About/>
    <Work/>
    <Skills/>
    <Testimonial/>
    <Footer/>

  </div>
);

export default App;
