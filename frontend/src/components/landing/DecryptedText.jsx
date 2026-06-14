import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

export default function DecryptedText({
  text = '',
  speed = 50,
  maxIterations = 10,
  style = {},
}) {
  const [displayText, setDisplayText] = useState(text);
  const iterationsRef = useRef(0);
  const intervalRef = useRef(null);

  const startDecrypt = () => {
    iterationsRef.current = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev =>
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iterationsRef.current) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iterationsRef.current += 0.5;

      if (iterationsRef.current >= text.length) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, speed);
  };

  useEffect(() => {
    startDecrypt();
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    <span
      style={{ ...style, fontFamily: 'inherit' }}
      onMouseEnter={startDecrypt}
    >
      {displayText}
    </span>
  );
}
