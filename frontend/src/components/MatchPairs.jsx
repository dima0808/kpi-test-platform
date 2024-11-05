import React, { useState, useEffect, useRef } from 'react';

// Приклад даних, які ви отримаєте з бази
const data = {
  options: [
    'Skibidi',
    'Oh the weather outside is rizzy',
    'Java это',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  ],
  answers: [
    'But the fire is so skibidi',
    'Skibidi',
    'строго типизированный объектно-ориентированный язык программирования общего назначения.',
    'ой у лузі червона калина похилилась до води калина червона калина червона калина аіфа',
  ],
};

function MatchPairs() {
  const [answers, setAnswers] = useState(Array(data.options.length).fill(''));

  const fieldsRef = useRef([]);
  const namesRef = useRef([]);
  const answersRef = useRef([]);

  const handleDragStart = (event, text) => {
    event.dataTransfer.setData('text/plain', text);
  };

  const handleDrop = (event, index) => {
    const text = event.dataTransfer.getData('text/plain');
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = text;
      return newAnswers;
    });
    event.preventDefault();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

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

  useEffect(() => {
    fieldsRef.current.forEach((ref) => resizeText(ref));
    namesRef.current.forEach((ref) => resizeText(ref));
    answersRef.current.forEach((ref) => resizeText(ref));
  }, [answers]);

  return (
    <div className="match-pairs">
      <div className="match__container">
        {data.options.map((name, index) => (
          <div className="match__question" key={index}>
            <div className="match__name" ref={(el) => (namesRef.current[index] = el)}>
              {name}
            </div>
            <div className="match__between"></div>
            <div
              className={`match__field ${answers[index] ? 'filled' : ''}`}
              ref={(el) => (fieldsRef.current[index] = el)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}>
              {answers[index]}
            </div>
          </div>
        ))}
      </div>
      <div className="match__list--answer">
        {data.answers.map((answer, index) => (
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
