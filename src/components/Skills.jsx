import React from 'react';

const Skills = () => {
  const skills = [
    { name: 'React', level: 80 },
    { name: 'JavaScript', level: 85 },
    { name: 'Java', level: 75 },
    { name: 'HTML/CSS', level: 90 },
    { name: 'Node.js', level: 70 },
    { name: 'Git/GitHub', level: 80 },
    { name: 'Figma', level: 75 },
    { name: 'APIs REST', level: 70 }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Habilidades Técnicas</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <h3>{skill.name}</h3>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ width: `${skill.level}%` }}
                >
                  <span>{skill.level}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
