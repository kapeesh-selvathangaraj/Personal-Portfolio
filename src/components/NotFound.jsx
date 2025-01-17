import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;
`;

const GlitchText = styled(motion.h1)`
  font-size: 8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  text-shadow: 
    2px 2px ${({ theme }) => theme.secondary},
    -2px -2px ${({ theme }) => theme.accent};
  position: relative;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const Message = styled(motion.p)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  margin: 2rem 0;
  text-align: center;
  max-width: 600px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0 1rem;
  }
`;

const StyledLink = styled(motion.create(Link))`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  text-decoration: none;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1.2rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::after {
    transform: translateX(100%);
  }
`;

const FloatingObject = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: ${props => props.color};
  opacity: 0.6;
`;

const NotFound = () => {
  const floatingObjects = Array(6).fill().map((_, i) => ({
    size: Math.random() * 100 + 50,
    color: `hsl(${Math.random() * 360}, 70%, 70%)`,
    initial: {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }
  }));

  return (
    <NotFoundContainer>
      {floatingObjects.map((obj, i) => (
        <FloatingObject
          key={i}
          size={obj.size}
          color={obj.color}
          initial={obj.initial}
          animate={{
            x: [obj.initial.x - 100, obj.initial.x + 100],
            y: [obj.initial.y - 100, obj.initial.y + 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
      ))}
      
      <GlitchText
        initial={{ opacity: 0, y: -50 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          textShadow: [
            "2px 2px #ff0000, -2px -2px #0000ff",
            "4px 4px #ff0000, -4px -4px #0000ff",
            "2px 2px #ff0000, -2px -2px #0000ff",
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        404
      </GlitchText>

      <Message
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Oops! Looks like you've ventured into the digital void.
        This page seems to have disappeared into thin air! 🚀
      </Message>

      <StyledLink
        to="/"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        Take Me Home 🏠
      </StyledLink>
    </NotFoundContainer>
  );
};

export default NotFound;
  