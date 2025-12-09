import React, { useEffect, useState } from 'react';

// SVG Icons
const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
  </svg>
);

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

// Hook para efecto de typing
const useTypingEffect = (text, speed = 100, delay = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStartTyping(true), delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, startTyping]);

  return { displayText, isComplete };
};

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [elementsVisible, setElementsVisible] = useState({
    greeting: false,
    name: false,
    subtitle: false,
    description: false,
    buttons: false,
    avatar: false,
    scroll: false
  });

  const { displayText: typedName, isComplete: nameComplete } = useTypingEffect('Jorge Castera', 80, 1200);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded) {
      const delays = {
        avatar: 200,
        greeting: 400,
        name: 600,
        subtitle: 2200,
        description: 2600,
        buttons: 3000,
        scroll: 3400
      };

      Object.entries(delays).forEach(([key, delay]) => {
        setTimeout(() => {
          setElementsVisible(prev => ({ ...prev, [key]: true }));
        }, delay);
      });
    }
  }, [loaded]);

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        {/* Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            <span className={`hero-greeting ${elementsVisible.greeting ? 'reveal-up' : 'hidden'}`} style={{ '--delay': '0s' }}>
              Hola, soy
            </span>
            <span className={`highlight typing-text ${elementsVisible.name ? 'reveal-up' : 'hidden'}`} style={{ '--delay': '0s' }}>
              {typedName}
              <span className={`typing-cursor ${nameComplete ? 'blink' : ''}`}>|</span>
            </span>
          </h1>
          <div className={`hero-subtitle ${elementsVisible.subtitle ? 'reveal-up' : 'hidden'}`} style={{ '--delay': '0s' }}>
            <span className="role-badge">
              <span className="badge-dot"></span>
              Estudiante de 2 DAM
            </span>
            <span className="separator"></span>
            <span className="role-badge secondary">
              Desarrollador Full Stack
            </span>
          </div>
          <p className={`hero-description ${elementsVisible.description ? 'reveal-up' : 'hidden'}`} style={{ '--delay': '0s' }}>
            Apasionado por crear aplicaciones web modernas con <strong>React</strong>, <strong>JavaScript</strong> y desarrollo multiplataforma. Transformando ideas en experiencias digitales.
          </p>
          <div className={`hero-buttons ${elementsVisible.buttons ? 'reveal-up' : 'hidden'}`} style={{ '--delay': '0s' }}>
            <a href="#projects" className="btn btn-primary">
              <RocketIcon /> Ver Proyectos
            </a>
            <a href="#contact" className="btn btn-secondary">
              <ChatIcon /> Contactame
            </a>
          </div>
        </div>

        {/* Avatar */}
        <div className={`hero-image ${elementsVisible.avatar ? 'reveal-scale' : 'hidden-scale'}`} style={{ '--delay': '0s' }}>
          <div className="avatar-container">
            <div className="avatar-ring"></div>
            <div className="avatar-glow"></div>
            <div className="avatar">
              <UserIcon />
            </div>
            {/* Floating badges */}
            <div className="floating-badge badge-react">
              <svg viewBox="0 0 24 24" fill="#61DAFB"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278z"/></svg>
            </div>
            <div className="floating-badge badge-js">
              <svg viewBox="0 0 24 24" fill="#F7DF1E"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067z"/></svg>
            </div>
            <div className="floating-badge badge-code">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`scroll-indicator ${elementsVisible.scroll ? 'reveal-fade' : 'hidden-fade'}`}>
        <span>Scroll</span>
        <div className="scroll-arrow">
          <ChevronDownIcon />
        </div>
      </div>
    </section>
  );
};

export default Hero;

