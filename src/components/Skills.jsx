import React from 'react';
import styled from 'styled-components';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaJava } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiJavascript, SiBootstrap, SiFigma, SiPostman } from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";

const SkillsSection = styled.section`
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.background || '#111'};
  color: ${({ theme }) => theme.text || '#fff'};
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;


  @media (max-width: 1024px) {
    padding: 5rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 0.8rem;
  }
`;

const SkillsTitle = styled.h2`
  font-size: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.primary || '#ff6f61'};
  margin-bottom: 3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  animation: fadeIn 1s ease-out forwards;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CategoryContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: nowrap;
  gap: 2.5rem;
  justify-content: center;
  margin: 2rem auto;
  padding: 0 2rem;
  opacity: 0;
  animation: fadeInUp 1s ease-out forwards;
  overflow-x: auto;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

const Category = styled.div`
  background: ${({ theme }) => theme.cardBackground || '#222'};
  padding: 2.5rem 2rem;
  border-radius: 15px;
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ theme }) => theme.primary || '#ff6f61'};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);

    &::before {
      transform: scaleX(1);
    }
  }

  h3 {
    color: ${({ theme }) => theme.primary || '#ff6f61'};
    margin-bottom: 2rem;
    font-size: 1.6rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    
    &::after {
      content: '';
      display: block;
      width: 50px;
      height: 3px;
      background: ${({ theme }) => theme.primary || '#ff6f61'};
      margin: 0.8rem auto 0;
      border-radius: 2px;
    }
  }

  @media (max-width: 1024px) {
    width: 300px;
    padding: 2rem 1.5rem;
  }

  @media (max-width: 768px) {
    width: calc(50% - 0.75rem);
    min-width: 250px;
    padding: 1.8rem 1.2rem;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1.5rem;
  justify-items: center;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
    gap: 1rem;
  }
`;

const SkillItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem;
  border-radius: 8px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    svg {
      transform: rotate(360deg);
      color: ${({ theme }) => theme.secondary || '#4CAF50'};
    }
  }

  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.primary || '#ff6f61'};
    transition: all 0.5s ease;
  }

  span {
    font-size: 0.9rem;
    text-align: center;
    font-weight: 500;
    opacity: 0.9;
  }
`;

const Skills = () => {
  const categories = {
    frontend: {
      title: "Frontend",
      skills: [
        { name: "React", icon: <FaReact /> },
        { name: "HTML5", icon: <FaHtml5 /> },
        { name: "CSS3", icon: <FaCss3Alt /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "Bootstrap", icon: <SiBootstrap /> },
      ]
    },
    backend: {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "Java", icon: <FaJava /> },
        { name: "Express", icon: <SiExpress /> },
        { name: "MongoDB", icon: <SiMongodb /> },
      ]
    },
    tools: {
      title: "Tools",
      skills: [
        { name: "Git", icon: <FaGitAlt /> },
        { name: "VS Code", icon: <VscVscode /> },
        { name: "Postman", icon: <SiPostman /> },
        { name: "Figma", icon: <SiFigma /> },
      ]
    }
  };

  return (
    <SkillsSection id="skills">
      <SkillsTitle>My Skills</SkillsTitle>
      <CategoryContainer>
        {Object.values(categories).map((category) => (
          <Category key={category.title}>
            <h3>{category.title}</h3>
            <SkillGrid>
              {category.skills.map((skill) => (
                <SkillItem key={skill.name}>
                  {skill.icon}
                  <span>{skill.name}</span>
                </SkillItem>
              ))}
            </SkillGrid>
          </Category>
        ))}
      </CategoryContainer>
    </SkillsSection>
  );
};

export default Skills;