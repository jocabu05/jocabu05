import React, { useRef } from 'react';

const About = () => {
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  const aboutItems = [
    {
      emoji: '🎓',
      title: 'Estudiante DAM',
      text: 'Estudiante de 2º curso de DAM (Desarrollo de Aplicaciones Multiplataforma).'
    },
    {
      emoji: '💻',
      title: 'Desarrollo Web',
      text: 'Apasionado por crear aplicaciones web modernas y funcionales con React, JavaScript y APIs.'
    },
    {
      emoji: '🚀',
      title: 'Proyecto TFG',
      text: 'Actualmente trabajando en mi proyecto final de grado con Kotlin y React, desarrollando soluciones innovadoras para problemas reales.'
    },
    {
      emoji: '🎯',
      title: 'Objetivo Profesional',
      text: 'Mi objetivo es conseguir prácticas en desarrollo Full Stack y crecer como profesional.'
    }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">Sobre Mí</h2>
        <div className="about-grid">
          {aboutItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="about-card"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="about-icon">{item.emoji}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
