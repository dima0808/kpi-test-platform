import React, { useState, useEffect, useRef } from 'react';

function MatchPairs({ answers, setSelectedAnswers }) {

  const leftOptions = [...new Set(answers.map(answer => answer.leftOption))];
  const rightOptions = [...new Set(answers.map(answer => answer.rightOption))];

  const [matchedAnswers, setMatchedAnswers] = useState(Array(leftOptions.length).fill(''));
  const chosenRightOptionsRef = useRef([]);
  const rightOptionsRef = useRef([]);
  const leftOptionsRef = useRef([]);

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
    chosenRightOptionsRef.current.forEach((ref) => resizeText(ref));
    leftOptionsRef.current.forEach((ref) => resizeText(ref));
    rightOptionsRef.current.forEach((ref) => resizeText(ref));
    setSelectedAnswers(() => {
      const newSelectedAnswers = [];
      matchedAnswers.forEach((selectedRightOption, index) => {
        if (selectedRightOption !== '') {
          const answer = answers.find((answer) =>
            answer.leftOption === leftOptions[index] && answer.rightOption === selectedRightOption)
          newSelectedAnswers.push(answer.id);
        }
      });
      return newSelectedAnswers;
    });
  }, [answers, matchedAnswers, setSelectedAnswers]);

  const resizeText = (element) => {
    if (!element) return;

    let fontSize = 20;
    element.style.fontSize = `${fontSize}px`;

    while ((element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) &&
    fontSize > 10) {
      fontSize -= 1;
      element.style.fontSize = `${fontSize}px`;
    }
  };

  return (
    <div className="match-pairs">
      <div className="match__container">
        {leftOptions.map((left, index) => (
          <div className="match__question" key={index}>
            <div className="match__name" ref={(el) => (leftOptionsRef.current[index] = el)}>
              {left}
            </div>
            <div className="match__between"></div>
            <div
              className={`match__field ${matchedAnswers[index] ? 'filled' : ''}`}
              ref={(el) => (chosenRightOptionsRef.current[index] = el)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}>
              {matchedAnswers[index]}
            </div>
          </div>
        ))}
      </div>
      <div className="match__list--answer">
        {rightOptions.map((right, index) => (
          <div
            className="match__answer filled"
            draggable
            key={index}
            onDragStart={(e) => handleDragStart(e, right)}
            ref={(el) => (rightOptionsRef.current[index] = el)}>
            {right}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchPairs;
