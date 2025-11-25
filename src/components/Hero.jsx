import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-greeting">Hola, soy</span>
            <span className="highlight">Jorge Casterá</span>
          </h1>
          <h2 className="hero-subtitle">
            <span className="role-badge">Estudiante de 2º DAM</span>
            <span className="separator">|</span>
            <span className="role-badge">Desarrollador Full Stack</span>
          </h2>
          <p className="hero-description">
            Especializado en React, JavaScript y desarrollo de aplicaciones multiplataforma.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              <span>🚀</span> Ver Proyectos
            </a>
            <a href="#contact" className="btn btn-secondary">
              <span>💬</span> Contáctame
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="avatar">👨‍💻</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

