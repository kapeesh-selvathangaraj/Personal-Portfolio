import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${({ theme, $scrolled }) => 
    $scrolled 
      ? `${theme.background}E6` // Added transparency
      : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => 
    $scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${({ theme, $scrolled }) => 
    $scrolled ? `0 2px 15px ${theme.shadow}20` : 'none'};
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: clamp(60px, 8vh, 80px);
`;

const Nav = styled.nav`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 2rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.a)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: clamp(0.5rem, 2vw, 1rem);
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const LogoName = styled.span`
  position: relative;
  font-family: 'Italiana', serif;
  font-weight: 400;
  font-size: clamp(1.2rem, 4vw, 2rem);
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.primary};
  padding: 0 4px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: clamp(-10px, -2vw, -15px);
    width: clamp(15px, 4vw, 25px);
    height: 1px;
    background: ${({ theme }) => theme.primary};
    transform: translateY(-50%);
  }
`;

const LogoTitle = styled.span`
  position: relative;
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: clamp(0.8rem, 2vw, 1.1rem);
  letter-spacing: 0.25em;
  text-transform: uppercase;
  padding-left: clamp(0.5rem, 2vw, 1rem);
  color: ${({ theme }) => theme.secondaryText};

  @media (max-width: 480px) {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 1px;
    height: 70%;
    background: ${({ theme }) => theme.border};
    transform: translateY(-50%);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 2rem);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: 500;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  position: relative;
  padding: 0.5rem 0;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.primary};
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const ThemeToggle = styled(motion.button)`
  background: ${({ theme }) => theme.secondaryBg};
  width: clamp(48px, 6vw, 52px);
  height: clamp(26px, 4vw, 28px);
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  margin-left: clamp(0.5rem, 2vw, 1rem);
  transition: background 0.3s ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }
`;

const ToggleThumb = styled(motion.div)`
  width: clamp(18px, 3vw, 20px);
  height: clamp(18px, 3vw, 20px);
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  
  svg {
    width: clamp(10px, 2vw, 12px);
    height: clamp(10px, 2vw, 12px);
    color: ${({ theme }) => theme.background};
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  cursor: pointer;
  padding: 0.5rem;
  margin: -0.5rem;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: clamp(60px, 8vh, 80px);
  left: 0;
  right: 0;
  background: ${({ theme }) => `${theme.background}F2`};
  backdrop-filter: blur(10px);
  padding: clamp(1rem, 4vh, 1.5rem);
  box-shadow: 0 2px 15px ${({ theme }) => theme.shadow}20;
  
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vh, 1.5rem);
  
  ${NavLink} {
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    padding: 0.5rem 0;
    text-align: left;
    
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const Header = ({ toggleTheme, theme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <HeaderContainer
      $scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Nav>

        
      <MobileMenuButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>

        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {navItems.map(({ href, label }) => (
                <NavLink
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
              
            </MobileMenu>
          )}
        </AnimatePresence>

        <Logo
          href="#home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <LogoName>Kapeesh</LogoName>
          <LogoTitle>Portfolio</LogoTitle>
        </Logo>
        
        <NavLinks>
          {navItems.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {label}
            </NavLink>
          ))}
          {/* <ThemeToggle 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <ToggleThumb
              animate={{ x: theme === 'dark' ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </ToggleThumb>
          </ThemeToggle> */}
        </NavLinks>

        <ThemeToggle 
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <ToggleThumb
                  animate={{ x: theme === 'dark' ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {theme === 'dark' ? '🌙' : '☀️'}
                </ToggleThumb>
              </ThemeToggle>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;