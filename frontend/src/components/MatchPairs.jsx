import React, { useState, useEffect, useRef } from 'react';

function MatchPairs({ options, answers }) {
  const [matchedAnswers, setMatchedAnswers] = useState(Array(options.length).fill(''));
  const fieldsRef = useRef([]);
  const namesRef = useRef([]);
  const answersRef = useRef([]);

  const handleDragStart = (event, text) => {
    event.dataTransfer.setData('text/plain', text);
  };

  const handleDrop = (event, index) => {
    const text = event.dataTransfer.getData('text/plain');
    setMatchedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = text;
      return newAnswers;
    });
    event.preventDefault();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    fieldsRef.current.forEach((ref) => resizeText(ref));
    namesRef.current.forEach((ref) => resizeText(ref));
    answersRef.current.forEach((ref) => resizeText(ref));
  }, [matchedAnswers]);

  const resizeText = (element) => {
    if (!element) return;

    let fontSize = 20;
    element.style.fontSize = `${fontSize}px`;

    while (
      (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) &&
      fontSize > 10
    ) {
      fontSize -= 1;
      element.style.fontSize = `${fontSize}px`;
    }
  };

  return (
    <div className="match-pairs">
      <div className="match__container">
        {options.map((name, index) => (
          <div className="match__question" key={index}>
            <div className="match__name" ref={(el) => (namesRef.current[index] = el)}>
              {name}
            </div>
            <div className="match__between"></div>
            <div
              className={`match__field ${matchedAnswers[index] ? 'filled' : ''}`}
              ref={(el) => (fieldsRef.current[index] = el)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}>
              {matchedAnswers[index]}
            </div>
          </div>
        ))}
      </div>
      <div className="match__list--answer">
        {answers.map((answer, index) => (
          <div
            className="match__answer filled"
            draggable
            key={index}
            onDragStart={(e) => handleDragStart(e, answer)}
            ref={(el) => (answersRef.current[index] = el)}>
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchPairs;
