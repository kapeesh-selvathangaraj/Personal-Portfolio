import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';  
import { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react'; // Import Lottie component


const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  min-height:20rem;
  display: flex;
  align-items: flex-start;
  padding: 0 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%; /* Full width on smaller screens */
    padding: 0 1rem; /* Reduced padding for smaller screens */
    flex-direction: column; /* Stack items vertically for smaller screens */
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 100vh; /* Full viewport height for smaller screens */
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  right: -5%;
  top: 50%;
  transform: translateY(-50%);
  width: 500px;
  height: 500px;
  background: ${({ theme }) => theme.gradient};
  filter: blur(120px);
  opacity: 0.1;
  border-radius: 50%;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  text-align: left;
  max-width: 800px;
  z-index: 1;
`;

const LottieContainer = styled(motion.div)`
  position: relative; /* Change to relative for stacking */
  width: 550px; /* Increased size for larger screens */
  height: 550px; /* Increased height to maintain aspect ratio */
  margin-bottom: 1rem; /* Space below the animation */
  left:12rem;/* Adjust to move to the right corner */
  top: 16%; /* Adjust vertical position */

  @media (max-width: 768px) {
    width: 200px; /* Adjust size for smaller screens */
    height: 200px; /* Adjust height for smaller screens */
    right: 1rem; /* Adjust right position for smaller screens */
  }

  @media (max-width: 480px) {
    width: 150px; /* Further adjust size for extra small screens */
    height: 150px; /* Further adjust height for extra small screens */
    right: 0.5rem; /* Further adjust right position for extra small screens */

  }
`;


const Greeting = styled(motion.div)`
  color: ${({ theme }) => theme.primary};
  font-size: 1.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-family: 'DM Sans', sans-serif;

  .hand-wave {
    display: inline-block;
    transform-origin: 70% 70%;
  }
`;

const Name = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.primary}; /* Changed to solid color */
  font-family: 'Poppins', sans-serif;
  line-height: 1.1;
  position: relative;
   overflow: hidden; /* Ensures the text is clipped during animation */
  white-space: nowrap; /* Prevents text from wrapping */

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  margin: 1.5rem 0;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  span {
    display: inline-block;
  }

  .highlight {
    color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.secondaryText};
  margin: 2rem 0;
  line-height: 1.8;
  max-width: 600px;
  font-family: 'DM Sans', sans-serif;
  position: relative;
`;

const CTAButton = styled(motion.button)`
  padding: 1.2rem 2.4rem;
  font-size: 1.1rem;
  background: ${({ theme }) => theme.gradient};
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 2rem;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  
  &::before {
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
    transition: transform 0.6s;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const waveVariants = {
    wave: {
      rotate: [0, 20, -20, 20, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };

  const [displayedName, setDisplayedName] = useState("");
  const nameToType = "Kapeesh";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setDisplayedName(nameToType.substring(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex > nameToType.length -1) {
        clearInterval(typingInterval);
      }
    }, 300); // Adjust typing speed (milliseconds)

    return () => clearInterval(typingInterval); // Cleanup on component unmount
  }, []);


  return (
    <HomeContainer>
      <BackgroundDecoration />
      <ContentWrapper
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Greeting variants={itemVariants}>
          Hi there, I'm
          <motion.span 
            className="hand-wave"
            variants={waveVariants}
            animate="wave"
          >
            👋
          </motion.span>
        </Greeting>
        
        <Name variants={itemVariants}>
          {displayedName}
        </Name>
        
        <Title variants={itemVariants}>
          <span>Full Stack Developer</span>
          <span>& <span className="highlight">B.Tech IT</span> Student</span>
        </Title>
        
        <Description variants={itemVariants}>
        A passionate third-year IT student with a knack for transforming innovative ideas 
          into elegant solutions. Specializing in full-stack development, I craft exceptional 
          digital experiences that merge cutting-edge technology with intuitive design.
        </Description>

        <CTAButton
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            transition: {
              duration: 0.3,
              ease: "easeInOut"
            }
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={() => {
            document.getElementById('contact').scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }}
          style={{
            backgroundColor: '#52796F', // Primary color from theme
            color: '#FFFFFF', // Background color from theme
            borderRadius: '20px', // Rounded corners for a modern look
            padding: '10px 20px', // Adjusted padding for better spacing
            margin: '10px 0', // Added margin for better spacing
            cursor: 'pointer', // Pointer cursor on hover
            transition: 'all 0.3s ease', // Smooth transition for hover and tap effects
          }}
        >
          Contact Me
        </CTAButton>
      </ContentWrapper>


    
      <LottieContainer>
        <DotLottieReact
          src="https://lottie.host/cf272e34-e78e-40df-82b2-02ee51bc035d/wzDajwKdpD.json"
          autoplay
        />
      </LottieContainer>

    </HomeContainer>
  );
};

export default Home;