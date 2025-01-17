import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }

  section {
    min-height: 100vh;
    padding: 60px 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text};
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.hover};
    }
  }

  .card {
    background: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    box-shadow: 0 4px 6px ${({ theme }) => theme.shadow};
  }

  button {
    background: ${({ theme }) => theme.primary};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.hover};
    }
  }
`;

export default GlobalStyles; 