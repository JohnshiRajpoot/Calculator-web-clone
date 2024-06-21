
import React, { useState } from 'react';
import { evaluate, format } from 'mathjs';
import ConfettiExplosion from 'react-confetti-explosion';
import './App.css';

const App = () => {
  const [display, setDisplay] = useState('');
  const [angleMode, setAngleMode] = useState('deg'); // 'deg' or 'rad'
  const [showConfetti, setShowConfetti] = useState(false);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const result = evaluate(display);
        if (display.includes('5') && display.includes('6')) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000); // Show confetti for 3 seconds
        }
        setDisplay(format(result, { precision: 14 }).toString());
      } catch (error) {
        setDisplay('Error');
      }
    } else if (value === 'C') {
      setDisplay('');
    } else if (value === '±') {
      setDisplay((prevDisplay) =>
        prevDisplay.charAt(0) === '-' ? prevDisplay.substring(1) : '-' + prevDisplay
      );
    } else if (value === 'Rand') {
      setDisplay(Math.random().toString());
    } else if (value === 'Rad') {
      setAngleMode(angleMode === 'deg' ? 'rad' : 'deg');
    } else if (value === 'x!') {
      try {
        const result = evaluate(`${display}!`);
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }
    } else {
      setDisplay((prevDisplay) => prevDisplay + value);
    }
  };

  const buttons = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '±', '%', '÷',
    '2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '*',
    '¹/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '-',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+',
    'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '='
  ];

  return (
    <div className="calculator">
      {showConfetti && <ConfettiExplosion />}
      <div className="display">{display}</div>
      <div className="buttons">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            className={btn === '=' || btn==='÷' || btn==='*' || btn==='-' || btn==='+' ? 'equals' : ''}
            id={btn === '0' ? 'zero' : ''}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
