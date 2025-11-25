import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: 'Movie Explorer',
      description: 'Aplicación web para explorar películas desarrollada con React. Incluye búsqueda, filtros y consumo de API de películas.',
      tech: ['React', 'JavaScript', 'API REST'],
      github: 'https://github.com/jocabu05/Movie-Explorer-Jorge-Castera',
      demo: null,
      demoText: 'Ver Proyecto'
    },
    {
      title: 'TFG - Proyecto Final de Grado',
      description: 'Aplicación completa que será desarrollada con Kotlin y React. Proyecto en fase de planificación y diseño.',
      tech: ['Kotlin', 'React', 'API REST'],
      github: null,
      demo: null,
      status: '📋 En planificación'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Proyectos Destacados</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              {project.status && <span className="status-badge">{project.status}</span>}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-tags">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <span>📂</span> GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <span>🚀</span> {project.demoText || 'Ver Demo'}
                  </a>
                )}
                {!project.github && !project.demo && (
                  <span className="coming-soon">🔜 Próximamente</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
