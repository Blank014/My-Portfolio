import './styles/App.css';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from './sections/Header';
import Home from './sections/Home';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import UniWork from './sections/UniWork';
import Hobbies from './sections/Hobbies';



const App = () => {

  const isDesktop = useMediaQuery({
    query: '(min-width: 1000px)'
  });

  const [component, setComponent] = useState(<Header />);
  const TIME_OUT_TIMER = 0;

  useEffect(() => {
    setTimeout(() => {
      setComponent(isDesktop ? <Header /> : <Header />);
    }, TIME_OUT_TIMER);
  }, [isDesktop]);

  return <div className="App">{component}</div>;

  /* return (
    <div className="App">
      <Header />
      <div className="main-container">
        <div className="left-column">
          <Home />
        </div>
        <div className="right-column">
          <About />
          <UniWork />
          <Projects />
          <Hobbies />
          <Contact />
        </div>
      </div>
    </div>

  ); */
};

export default App;
