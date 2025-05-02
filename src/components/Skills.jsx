import React from 'react';
import styled from 'styled-components';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaJava } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiJavascript, SiBootstrap, SiFigma, SiPostman } from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";

const SkillsSection = styled.section`
  padding: 2rem 4rem;
  background-color: ${({ theme }) => theme.background || '#111'};
  color: ${({ theme }) => theme.text || '#fff'};
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  /* XS */
  @media (max-width: 575px) {
    padding: 1rem;
  }

  /* SM */
  @media (min-width: 576px) and (max-width: 767px) {
    padding: 1.5rem 2rem;
  }

  /* MD */
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 2rem 3rem;
  }

  /* LG */
  @media (min-width: 992px) and (max-width: 1199px) {
    padding: 2rem 4rem;
  }

  /* XL and above */
  @media (min-width: 1200px) {
    padding: 2rem 4rem;
  }

  /* Ultra Wide (2XL, 3XL) */
  @media (min-width: 1400px) {
    padding: 3rem 6rem;
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

  /* XS */
  @media (max-width: 575px) {
    font-size: 1.8rem;
  }

  /* SM */
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 2rem;
  }

  /* MD */
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 2.5rem;
  }

  /* LG */
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 3rem;
  }

  /* XL */
  @media (min-width: 1200px) {
    font-size: 3.5rem;
  }
`;

const CategoryContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
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

  /* XS to MD */
  @media (max-width: 991px) {
    gap: 1rem;
  }

  /* LG */
  @media (min-width: 992px) {
    gap: 2rem;
  }

  /* Ultra-Wide */
  @media (min-width: 1400px) {
    gap: 3rem;
  }
`;

const Category = styled.div`
  background: ${({ theme }) => theme.card || '#222'};
  padding: 2.5rem 2rem;
  border-radius: 15px;
  flex: 1 1 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  max-width: 320px; /* Ensure categories are contained on smaller screens */

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

  /* XS */
  @media (max-width: 575px) {
    padding: 1.5rem;
  }

  /* SM */
  @media (min-width: 576px) and (max-width: 767px) {
    padding: 2rem 1.5rem;
  }

  /* MD */
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 2rem 1.8rem;
  }

  /* LG */
  @media (min-width: 992px) and (max-width: 1199px) {
    padding: 2rem 2rem;
  }

  /* XL */
  @media (min-width: 1200px) {
    padding: 2.5rem 2rem;
  }

  /* Ultra-Wide */
  @media (min-width: 1400px) {
    padding: 3rem 2.5rem;
  }
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1.5rem;
  justify-items: center;
  width: 100%;
  margin-top: 2rem;

  /* XS */
  @media (max-width: 575px) {
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  }

  /* SM */
  @media (min-width: 576px) and (max-width: 767px) {
    grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  }

  /* MD */
  @media (min-width: 768px) and (max-width: 991px) {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }

  /* LG */
  @media (min-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  /* Ultra-Wide */
  @media (min-width: 1400px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;
const SkillItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  border-radius: 6px;
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px) scale(1.03);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);

    svg {
      transform: rotate(360deg);
      color: ${({ theme }) => theme.secondary || '#4CAF50'};
    }
  }

  svg {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.primary || '#ff6f61'};
    transition: all 0.5s ease;
  }

  span {
    font-size: 0.8rem;
    font-weight: 500;
    text-align: center;
  }

  @media (max-width: 575px) {
    padding: 0.6rem;
    svg {
      font-size: 1.6rem;
    }
    span {
      font-size: 0.75rem;
    }
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
