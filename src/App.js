import React, { useEffect, useState, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

// Componente de pantalla de carga - OPTIMIZADO
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let animationFrame;
    let startTime = performance.now();
    const duration = 1500; // 1.5 segundos de carga

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setFadeOut(true), 200);
        setTimeout(() => onComplete(), 600);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo">
          <span className="loading-bracket">&lt;</span>
          <span className="loading-name">JC</span>
          <span className="loading-bracket">/&gt;</span>
        </div>
        <div className="loading-bar">
          <div className="loading-progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="loading-text">Cargando experiencia...</p>
      </div>
    </div>
  );
};

// Componente de cursor personalizado - OPTIMIZADO con RAF
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    // Don't run on touch devices
    if ('ontouchstart' in window) return;

    const updateCursorPosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px) translate(-50%, -50%)`;
      }
    };

    const handleMouseMove = (e) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      
      // Cancelar frame anterior y programar nuevo
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCursorPosition);

      // Detectar si está sobre elemento clickeable
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      if (hoveredElement) {
        const isClickable = 
          hoveredElement.tagName === 'A' || 
          hoveredElement.tagName === 'BUTTON' ||
          hoveredElement.closest('a') ||
          hoveredElement.closest('button') ||
          window.getComputedStyle(hoveredElement).cursor === 'pointer';
        setIsPointer(isClickable);
      }
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isPointer ? 'pointer' : ''} ${isHidden ? 'hidden' : ''}`}
      style={{ left: 0, top: 0 }}
    >
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>
    </div>
  );
};

// Componente de fondo animado global con parallax
const AnimatedBackground = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="global-background">
      {/* Gradient Orbs con parallax */}
      <div className="bg-orbs" style={{ transform: `translateY(${offset * 0.5}px)` }}>
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="bg-orb bg-orb-4"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="bg-particles">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="bg-particle"
            style={{
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--duration': `${20 + Math.random() * 30}s`,
              '--delay': `${Math.random() * 20}s`,
              '--size': `${2 + Math.random() * 4}px`,
              '--opacity': `${0.2 + Math.random() * 0.4}`
            }}
          ></div>
        ))}
      </div>

      {/* Grid Pattern con parallax */}
      <div className="bg-grid" style={{ transform: `translateY(${offset * 0.2}px)` }}></div>
    </div>
  );
};

// Componente de progreso de scroll
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / totalHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${progress}%` }}></div>;
};

// Botón de scroll to top
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <CustomCursor />
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
