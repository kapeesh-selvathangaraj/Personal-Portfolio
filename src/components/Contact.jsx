import React, { useState } from 'react';
import styled from 'styled-components';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import emailjs from '@emailjs/browser';


const ContactSection = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.gradient};
  max-width: 90%;
  max-height: 70%;
  display: flex;
   justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: center;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.2;
    z-index: 0;
  }

  &::before {
    top: 10%;
    left: -10%;
    background: ${({ theme }) => theme.primary};
  }

  &::after {
    bottom: 10%;
    right: -10%;
    background: ${({ theme }) => theme.secondary};
  }

  @media (max-width: 768px) {
    padding: 6rem 1rem;
  }
`;

const ContactWrapper = styled.div`
  width: 90%;
  hieght: 80%;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  position: relative;
  z-index: 1;
  grid-template-rows: auto 1fr;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 300px;
  max-width: 500px;
  align-items: center;
  min-height: 400px;
  justify-content: center;
  padding: 0 2rem;
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background: ${({ theme }) => theme.secondaryBg}30;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    transform: translateY(-5px);
    background: ${({ theme }) => theme.secondaryBg}50;
    border-color: ${({ theme }) => theme.primary}70;
  }

  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.primary};
  }

  div {
    h4 {
      font-size: 1rem;
      color: ${({ theme }) => theme.text};
      margin-bottom: 0.3rem;
    }

    p {
      font-size: 1rem;
      color: ${({ theme }) => theme.secondaryText};
    }
  }
`;

const ContactForm = styled(motion.form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  padding: 2rem;
  background: ${({ theme }) => theme.secondaryBg}20;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  backdrop-filter: blur(15px);
  box-shadow: 0 12px 50px ${({ theme }) => theme.shadow}15;
  margin-top: 2rem;
  justify-self: center;
`;

const InputField = styled(motion.div)`
  position: relative;
  width: 90%;

  input, textarea {
    width: 100%;
    padding: 1rem 1rem;
    background: ${({ theme }) => theme.background};
    border: 2px solid ${({ theme, $error }) => $error ? '#ff6b6b' : theme.border};
    border-radius: 16px;
    color: ${({ theme }) => theme.text};
    font-size: 1rem;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }

  label {
    position: absolute;
    left: 1rem;
    top: -0.8rem;
    padding: 0 0.5rem;
    background: ${({ theme }) => theme.background};
    color: ${({ theme, $error }) => $error ? '#ff6b6b' : theme.secondaryText};
    font-size: 0.9rem;
    pointer-events: none;
    transition: all 0.3s ease;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 1rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 3rem;
  padding: 0 1rem;
`;

const SocialIcon = styled(motion.a)`
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
  padding: 1rem;
  background: ${({ theme }) => theme.secondaryBg}30;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.secondaryBg}50;
    border-color: ${({ theme }) => theme.primary}70;
    transform: translateY(-5px);
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  margin-left: 10px;
  display: inline-block;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Title = styled(motion.h2)`
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
  font-weight: 600;
`;

const Subtitle = styled(motion.h3)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.secondaryText};
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };
  
    try {
      const result = await emailjs.send(
        'service_q3zy7o6',     // Replace with your EmailJS Service ID
        'template_8mk207a',    // Replace with your EmailJS Template ID
        templateParams,
        'YvV51f5YfsUTSHr1B'      // Replace with your EmailJS Public Key
      );
  
      console.log('Email successfully sent!', result.text);
      alert('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Element name="contact">
      <ContactSection>
        <ContactWrapper>
          <ContactInfo
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Title variants={itemVariants}>Let's Connect</Title>
            <Subtitle variants={itemVariants}>Have an exciting project? Let's chat!</Subtitle>

            <InfoItem variants={itemVariants}>
              <FaMapMarkerAlt />
              <div>
                <h4>Location</h4>
                <p>Erode, TamilNadu, India</p>
              </div>
            </InfoItem>

            <InfoItem variants={itemVariants}>
              <FaEnvelope />
              <div>
                <h4>Email</h4>
                <p>kapeeshkapeesh66@gmail.com</p>
              </div>
            </InfoItem>

            <InfoItem variants={itemVariants}>
              <FaPhone />
              <div>
                <h4>Phone</h4>
                <p>+91 9677588108</p>
              </div>
            </InfoItem>

            <SocialLinks variants={itemVariants}>
              <SocialIcon href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </SocialIcon>
              <SocialIcon href="mailto:your@email.com">
                <FaEnvelope />
              </SocialIcon>
              <SocialIcon href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialIcon>
            </SocialLinks>
          </ContactInfo>

          <ContactForm
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
             <Title variants={itemVariants}>CONTACT</Title>
            <InputField variants={itemVariants} $error={errors.name}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              <label>Name</label>
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </InputField>

            <InputField variants={itemVariants} $error={errors.email}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              <label>Email</label>
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </InputField>

            <InputField variants={itemVariants} $error={errors.subject}>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                required
                aria-invalid={errors.subject ? 'true' : 'false'}
              />
              <label>Subject</label>
              {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
            </InputField>

            <InputField variants={itemVariants} $error={errors.message}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                required
                aria-invalid={errors.message ? 'true' : 'false'}
              />
              <label>Message</label>
              {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
            </InputField>

            <SubmitButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingSpinner /> : 'Send Message'}
            </SubmitButton>
          </ContactForm>
        </ContactWrapper>
      </ContactSection>
    </Element>
  );
};

export default Contact;
