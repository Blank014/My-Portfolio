import './styles/App.css';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';



const App = () => {

  const isDesktop = useMediaQuery({
    query: '(min-width: 1000px)'
  });

  const [component, setComponent] = useState(<DesktopLayout />);
  const TIME_OUT_TIMER = 0;

  useEffect(() => {
    setTimeout(() => {
      setComponent(isDesktop ? <DesktopLayout /> : <MobileLayout />);
    }, TIME_OUT_TIMER);
  }, [isDesktop]);

  return <div>{component}</div>;


};

export default App;
