import React from 'react';
import styled from 'styled-components';
import { Element } from 'react-scroll';

const AboutContainer = styled.div`
  padding: 2rem;
`;

const About = () => {
  return (
    <Element name="about">
      <AboutContainer>
        <h2>About Me</h2>
        <p>Professional and creative web developer with a passion for building user-friendly websites and applications.</p>
      </AboutContainer>
    </Element>
  );
};

export default About;