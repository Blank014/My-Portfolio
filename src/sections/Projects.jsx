import React, { useState } from "react";
import "../styles/Projects.css";
import { useTranslation } from "react-i18next";
import AnimatedSection from "../components/shared/AnimatedSection";

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');

  // Categories for filtering
  const categories = ['all', 'web', 'mobile', 'design'];

  // Featured projects data
  const featuredProjects = [
    {
      title: "Portfolio Website",
      description: "A modern portfolio website built with React and Three.js featuring a custom 3D avatar. The site includes interactive elements, animations, and a responsive design that works across all devices.",
      tech: ["React", "Three.js", "CSS"],
      github: "https://github.com/yourusername/portfolio",
      external: "#",
      image: require("../assets/images/Portfolio website.png"),
      category: "web"
    },
    {
      title: "Tree of Life Todo App",
      description: "A simple and elegant todo application that allows users to create, edit, and delete tasks. The app features a clean UI and intuitive design.",
      tech: ["Flutter", "Riverpod", "Supabase", "CI/CD"],
      image: require("../assets/images/Tree-of-Life.png"),
      category: "Cross-Platform",
    },
    {
      title: "Troveox Catalog -WIP-",
      description: "A comprehensive catalog application that allows users to browse and manage a collection of items. The app features a user-friendly interface and powerful search functionality.",
      tech: ["React", "Django"],
      image: null,
      category: "web",
    }
  ];

  // Other projects data
  const otherProjects = [
    {
      title: "Task Manager",
      description: "A simple task management application with drag-and-drop functionality for organizing tasks.",
      tech: ["React", "JavaScript", "CSS"],
      github: "https://github.com",
      external: "#",
      category: "web"
    },
    {
      title: "Personal Blog",
      description: "A minimalist blog platform built with Gatsby and Markdown for content management.",
      tech: ["Gatsby", "React", "GraphQL"],
      github: "https://github.com",
      external: "#",
      category: "web"
    },
    {
      title: "Recipe Finder",
      description: "Web app that allows users to search for recipes based on ingredients they have.",
      tech: ["JavaScript", "API", "HTML/CSS"],
      github: "https://github.com",
      external: "#",
      category: "web"
    },
    {
      title: "Chat Application",
      description: "Real-time chat application with private messaging and group chat functionality.",
      tech: ["Socket.io", "Node.js", "MongoDB"],
      github: "https://github.com",
      external: "#",
      category: "mobile"
    },
    {
      title: "UI Kit",
      description: "A collection of reusable UI components designed for modern web applications.",
      tech: ["Figma", "CSS", "Storybook"],
      github: "https://github.com",
      external: "#",
      category: "design"
    },
    {
      title: "Brand Identity",
      description: "Complete brand identity design including logo, color palette, typography, and guidelines.",
      tech: ["Illustrator", "Photoshop", "InDesign"],
      github: "https://github.com",
      external: "#",
      category: "design"
    }
  ];

  // Filter other projects based on selected category
  const filteredProjects = filter === 'all'
    ? otherProjects
    : otherProjects.filter(project => project.category === filter);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <AnimatedSection
          className="section-header"
          animation="fade-in-up"
          threshold={0.2}
        >
          <div className="section-heading">
            <h2>{t("projects")}</h2>
          </div>
        </AnimatedSection>

        <div className="featured-projects">
          {featuredProjects.map((project, i) => (
            <AnimatedSection
              key={i}
              className={`project ${i % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}
              threshold={0.2}
              delay={i * 200}
            >
              <div className="project-content">
                <p className="project-overline">Featured Project</p>
                <h3 className="project-title">
                  <a href={project.external} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </h3>
                <div className="project-description">
                  <p>{project.description}</p>
                </div>
                <ul className="project-tech-list">
                  {project.tech.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Link">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href={project.external} target="_blank" rel="noopener noreferrer" aria-label="External Link">
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>

              {project.image ? (
                <div className="project-image-container">
                  <a href={project.external} target="_blank" rel="noopener noreferrer">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />
                  </a>
                </div>
              ) : (
                <div className="project-placeholder"></div>
              )}
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection
          className="other-projects-section"
          animation="fade-in-up"
          threshold={0.1}
          delay={300}
          tag="div"
        >
          <h3 className="text-center" style={{ marginTop: "80px" }}>Other Noteworthy Projects</h3>

          <div className="project-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-button ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>


        </AnimatedSection>

      </div>
    </section>
  );
};

export default Projects;
