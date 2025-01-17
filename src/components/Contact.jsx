  import React, { useState } from 'react';
  import styled from 'styled-components';
  import { Element } from 'react-scroll';
  import { motion } from 'framer-motion';
  import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';

  const ContactSection = styled.section`
    padding: 4rem 2rem;
    background: ${({ theme }) => theme.background};
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const Title = styled(motion.h2)`
    font-size: 3rem;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 2rem;
    text-align: center;
  `;

  const ContactForm = styled(motion.form)`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `;

  const InputField = styled(motion.div)`
    position: relative;
    width: 100%;

    input, textarea {
      width: 100%;
      padding: 1rem;
      background: ${({ theme }) => theme.secondaryBg};
      border: 2px solid ${({ theme }) => theme.border};
      border-radius: 8px;
      color: ${({ theme }) => theme.text};
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
      }
    }

    textarea {
      min-height: 150px;
      resize: vertical;
    }

    label {
      position: absolute;
      left: 1rem;
      top: 1rem;
      pointer-events: none;
      transition: all 0.3s ease;
      color: ${({ theme }) => theme.secondaryText};
      
      ${({ $hasContent }) => $hasContent && `
        transform: translateY(-1.5rem) scale(0.8);
        color: ${({ theme }) => theme.primary};
      `}
    }
  `;

  const SubmitButton = styled(motion.button)`
    padding: 1rem 2rem;
    background: ${({ theme }) => theme.primary};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px ${({ theme }) => theme.shadow};
    }
  `;

  const SocialLinks = styled.div`
    display: flex;
    gap: 2rem;
    margin-top: 3rem;
  `;

  const SocialIcon = styled(motion.a)`
    color: ${({ theme }) => theme.text};
    font-size: 1.8rem;
    transition: all 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.primary};
      transform: translateY(-3px);
    }
  `;

  const Contact = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your form submission logic here
      console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    return (
      <Element name="contact">
        <ContactSection>
          <Title
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </Title>

          <ContactForm
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InputField $hasContent={formData.name.length > 0}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label>Your Name</label>
            </InputField>

            <InputField $hasContent={formData.email.length > 0}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Your Email</label>
            </InputField>

            <InputField $hasContent={formData.message.length > 0}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <label>Your Message</label>
            </InputField>

            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </SubmitButton>
          </ContactForm>

          <SocialLinks>
            <SocialIcon 
              href="https://github.com/yourusername" 
              target="_blank"
              whileHover={{ y: -5 }}
            >
              <FaGithub />
            </SocialIcon>
            <SocialIcon 
              href="https://linkedin.com/in/yourusername" 
              target="_blank"
              whileHover={{ y: -5 }}
            >
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon 
              href="mailto:your@email.com"
              whileHover={{ y: -5 }}
            >
              <FaEnvelope />
            </SocialIcon>
            <SocialIcon 
              href="https://twitter.com/yourusername" 
              target="_blank"
              whileHover={{ y: -5 }}
            >
              <FaTwitter />
            </SocialIcon>
          </SocialLinks>
        </ContactSection>
      </Element>
    );
  };

  export default Contact;