import './styles/App.css';
import React, { useState, useEffect, useRef } from 'react';
import Header from './sections/Header';
import Home from './sections/Home';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import UniWork from './sections/UniWork';
import Hobbies from './sections/Hobbies';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

const App = () => {
  // State for loading screen
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const scrollProgressRef = useRef(null);
  const spotlightRef = useRef(null);

  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      // Update the spotlight position
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--x', `${e.clientX}px`);
        spotlightRef.current.style.setProperty('--y', `${e.clientY}px`);
      }
    };

    // Handle cursor hover state
    const handleMouseOver = () => setCursorHover(true);
    const handleMouseOut = () => setCursorHover(false);

    // Add cursor hover effect to all clickable elements
    const clickableElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    clickableElements.forEach(element => {
      element.addEventListener('mouseover', handleMouseOver);
      element.addEventListener('mouseout', handleMouseOut);
    });

    // Add cursor and activate spotlight on mount
    document.body.classList.add('cursor-active', 'spotlight-active');
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.classList.remove('cursor-active', 'spotlight-active');
      document.removeEventListener('mousemove', handleMouseMove);

      clickableElements.forEach(element => {
        element.removeEventListener('mouseover', handleMouseOver);
        element.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  // Update cursor position
  useEffect(() => {
    if (cursorOuterRef.current) {
      cursorOuterRef.current.style.left = `${cursorPosition.x}px`;
      cursorOuterRef.current.style.top = `${cursorPosition.y}px`;
    }

    if (cursorInnerRef.current) {
      cursorInnerRef.current.style.left = `${cursorPosition.x}px`;
      cursorInnerRef.current.style.top = `${cursorPosition.y}px`;
    }
  }, [cursorPosition]);

  // Update cursor hover state
  useEffect(() => {
    if (cursorOuterRef.current) {
      if (cursorHover) {
        cursorOuterRef.current.classList.add('cursor-hover');
      } else {
        cursorOuterRef.current.classList.remove('cursor-hover');
      }
    }
  }, [cursorHover]);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.max(0, Math.min(1, window.scrollY / totalScroll));
      setScrollProgress(currentProgress);

      // Show scroll to top button when scrolled down 300px
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update scroll progress indicator
  useEffect(() => {
    if (scrollProgressRef.current) {
      scrollProgressRef.current.style.transform = `scaleX(${scrollProgress})`;
    }
  }, [scrollProgress]);

  useEffect(() => {
    // Simulate loading time
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        {loading ? (
          // Enhanced loading screen
          <div className="loading">
            <div className="loading-content">
              <div className="logo">IK.</div>
              <div className="loading-bar">
                <div className="loading-bar-fill"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="App">
            {/* Custom cursor */}
            <div ref={cursorOuterRef} className="cursor-outer"></div>
            <div ref={cursorInnerRef} className="cursor-inner"></div>

            {/* Spotlight effect */}
            <div ref={spotlightRef} className="spotlight"></div>

            {/* Scroll progress indicator */}
            <div ref={scrollProgressRef} className="scroll-progress"></div>

            {/* Scroll to top button */}
            <div
              className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <i className="fas fa-arrow-up"></i>
            </div>

            <Header />
            <main className="main-content">
              <Home />
              <About />
              <UniWork />
              <Projects />
              <Hobbies />
              <Contact />
            </main>
            <footer className="footer">
              <div className="container">
                <div className="footer-content">
                  <p>&copy; {new Date().getFullYear()} IK. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        )}
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
