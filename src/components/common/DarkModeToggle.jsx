// DarkModeToggle.jsx
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import useSessionStorage from '../../features/hooks/useSessionStorage'; // Import the custom hook

const Icon = styled.div`
  font-size: 1.5rem;
  margin: 0 0.5rem;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const Label = styled.label`
  transition: display 0.3s;
`;

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useSessionStorage('darkMode', false);

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <Label htmlFor="darkMode">
        <Icon>{darkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}</Icon>
      </Label>
      <Checkbox id="darkMode" checked={darkMode} onChange={handleToggle} />
    </div>
  );
};

export default DarkModeToggle;