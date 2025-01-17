/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Element } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle, FaSearch } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import debounce from 'lodash/debounce';

// Animation Keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px ${({ theme }) => theme.primary}40; }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
`;

const tiltEffect = keyframes`
  0%, 100% { transform: rotateX(0deg) rotateY(0deg); }
  25% { transform: rotateX(2deg) rotateY(2deg); }
  75% { transform: rotateX(-2deg) rotateY(-2deg); }
`;

// Styled Components
const ProjectsContainer = styled.div`
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 50%, 
      ${({ theme }) => `${theme.primary}15`} 0%, 
      transparent 70%
    );
    pointer-events: none;
    animation: ${shimmer} 15s linear infinite;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.primary}, 
      ${({ theme }) => theme.secondary || theme.primary}
    );
    border-radius: 2px;
  }
`;

const CategoryFilter = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  perspective: 1000px;
`;

const FilterButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: ${({ active, theme }) => 
    active ? theme.primary : 'rgba(255,255,255,0.1)'};
  color: ${({ active, theme }) => 
    active ? theme.background : theme.text};
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  font-weight: ${({ active }) => active ? '600' : '400'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    background: ${({ active, theme }) => 
      active ? theme.primary : 'rgba(255,255,255,0.2)'};
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  perspective: 2000px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.secondary || theme.primary},
      ${({ theme }) => theme.primary}
    );
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-10px) rotateX(10deg);
    animation: ${tiltEffect} 5s infinite ease-in-out;
    box-shadow: 
      -20px 20px 40px rgba(0, 0, 0, 0.2),
      0 0 30px rgba(255, 255, 255, 0.1);

    &::before {
      transform: scaleX(1);
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        45deg,
        ${({ theme }) => theme.primary}00,
        ${({ theme }) => theme.primary}20
      );
      z-index: -1;
      filter: blur(20px);
      animation: ${glow} 2s infinite;
    }
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${ProjectCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  font-size: 1.5rem;
  position: relative;
  transform: translateZ(0);
  transition: transform 0.3s ease, color 0.3s ease;

  ${ProjectCard}:hover & {
    transform: translateZ(30px);
    color: ${({ theme }) => theme.primary};
  }
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  line-height: 1.6;
  transform: translateZ(0);
  transition: transform 0.3s ease;

  ${ProjectCard}:hover & {
    transform: translateZ(20px);
  }
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled(motion.span)`
  background: ${({ theme }) => `${theme.primary}33`};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.primary};
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    animation: ${float} 3s ease-in-out infinite;
  }

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
    transform: scale(1.05);
  }
`;

// New styled components and enhancements
const SearchContainer = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 25px;
  border: 1px solid ${({ theme }) => `${theme.primary}40`};
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 15px ${({ theme }) => `${theme.primary}40`};
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ProjectLink = styled.a`
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }
`;

const ProjectStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondaryText};
`;

const Stat = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Enhanced Projects component
const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  // Enhanced project data structure
  const [projects] = useState([
    {
      id: 1,
      title: "AI-Powered Chat Platform",
      description: "An innovative chat application leveraging OpenAI's GPT-3 for intelligent conversations and real-time language translation.",
      tags: ["React", "Node.js", "OpenAI API"],
      category: "fullstack",
      github: "https://github.com/username/ai-chat",
      demo: "https://ai-chat-demo.com",
      stats: {
        stars: 120,
        forks: 25,
        views: 1500
      },
      image: "/path/to/project-image.jpg"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "A robust e-commerce website with secure payment processing, user authentication, and a seamless shopping experience.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      category: "fullstack",
      github: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      demo: "XXXXXXXXXXXXXXXXXXXXXXXXXX",
      stats: {
        stars: 200,
        forks: 50,
        views: 3000
      },
      image: "/path/to/project-image.jpg"
    },
    {
      id: 3,
      title: "AI-Powered Chat Platform",
      description: "An innovative chat application leveraging OpenAI's GPT-3 for intelligent conversations and real-time language translation.",
      tags: ["React", "Node.js", "OpenAI API"],
      category: "fullstack",
      github: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      demo: "XXXXXXXXXXXXXXXXXXXXXXXXXX",
      stats: {
        stars: 120,
        forks: 25,
        views: 1500
      },
      image: "/path/to/project-image.jpg"
    },
    {
      id: 4,
      title: "E-commerce Platform",
      description: "A robust e-commerce website with secure payment processing, user authentication, and a seamless shopping experience.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      category: "fullstack",
      github: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      demo: "XXXXXXXXXXXXXXXXXXXXXXXXXX",
      stats: {
        stars: 200,
        forks: 50,
        views: 3000
      },
      image: "/path/to/project-image.jpg"
    }
    // ... (your other projects)
  ]);

  // Memoized filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);
  // Debounced search handler
  const handleSearch = debounce((value) => {
    setSearchQuery(value);
  }, 300);
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Element name="projects">
      <ProjectsContainer ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Featured Projects</SectionTitle>

          <SearchContainer>
            <SearchInput
              placeholder="Search projects..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </SearchContainer>

          <CategoryFilter>
            {['all', 'frontend', 'fullstack', 'backend'].map(category => (
              <FilterButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </FilterButton>
            ))}
          </CategoryFilter>

          <ProjectsGrid
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  variants={cardVariants}
                  layoutId={`project-${project.id}`}
                >
                  {project.image && (
                    <ProjectImage
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                  )}
                  <div className="project-overlay"></div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tags">
                    {project.tags.map((tag, index) => (
                      <Tag
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div> {/* Corrected closing tag */}

                  <ProjectLinks>
                    {project.github && (
                      <ProjectLink 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub />
                      </ProjectLink>
                    )}
                    {project.demo && (
                      <ProjectLink 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt />
                      </ProjectLink>
                    )}
                  </ProjectLinks>

                  <ProjectStats>
                    <Stat>
                      <FaGithub /> {project.stats?.stars || 0}
                    </Stat>
                    <Stat>
                      <FaExternalLinkAlt /> {project.stats?.views || 0}
                    </Stat>
                  </ProjectStats>
                </ProjectCard>
              ))}
            </AnimatePresence>
          </ProjectsGrid>
        </motion.div>
      </ProjectsContainer>
    </Element>
  );
};

export default React.memo(Projects);