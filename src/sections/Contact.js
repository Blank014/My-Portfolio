// src/sections/Projects.js
import React from 'react';
import './Projects.css';

const Projects = () => (
    <section id="projects" className="projects">
        <h2>Projects</h2>
        <div className="project-list">
            <div className="project-item">
                <h3>Project Name</h3>
                <p>Project description goes here.</p>
                <a href="project-link" target="_blank" rel="noopener noreferrer">View Project</a>
            </div>
            {/* Add more project items as needed */}
        </div>
    </section>
);

export default Projects;
