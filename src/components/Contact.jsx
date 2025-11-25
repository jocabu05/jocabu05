import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Contáctame</h2>
        <div className="contact-content">
          <p className="contact-intro">¿Interesado en colaborar o conocer más sobre mis proyectos?</p>
          <p className="contact-subtitle">Elige tu canal de comunicación preferido</p>
          
          <div className="contact-buttons">
            <a href="tel:+34674692531" className="contact-btn phone-btn">
              <div className="btn-content">
                <div className="btn-icon">📞</div>
                <div className="btn-info">
                  <h3>Teléfono / WhatsApp</h3>
                  <p>+34 674 692 531</p>
                </div>
              </div>
              <span className="arrow">→</span>
            </a>
            
            <a href="mailto:jorgecasterabueno@gmail.com" className="contact-btn email-btn">
              <div className="btn-content">
                <div className="btn-icon">✉️</div>
                <div className="btn-info">
                  <h3>Email</h3>
                  <p>jorgecasterabueno@gmail.com</p>
                </div>
              </div>
              <span className="arrow">→</span>
            </a>
            
            <a href="https://github.com/jocabu05" target="_blank" rel="noopener noreferrer" className="contact-btn github-btn">
              <div className="btn-content">
                <div className="btn-icon">💻</div>
                <div className="btn-info">
                  <h3>GitHub</h3>
                  <p>@jocabu05</p>
                </div>
              </div>
              <span className="arrow">→</span>
            </a>
            
            <a href="https://www.linkedin.com/in/jorge-casterá-bueno-53853a311" target="_blank" rel="noopener noreferrer" className="contact-btn linkedin-btn">
              <div className="btn-content">
                <div className="btn-icon">👔</div>
                <div className="btn-info">
                  <h3>LinkedIn</h3>
                  <p>Jorge Casterá Bueno</p>
                </div>
              </div>
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
