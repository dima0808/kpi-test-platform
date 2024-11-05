import React, { useState } from 'react';
import Draggabilly from 'draggabilly';

function MatchPairs({ pairs }) {
  const [answers, setAnswers] = useState(new Array(pairs.length).fill(null));

  const handleDrop = (answer, questionIndex) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answer;
      return newAnswers;
    });
  };

  return (
    <div className="match-pairs">
      <div className="questions">
        {pairs.map((pair, index) => (
          <div key={index} className="question">
            {pair.question}
            <div
              className="drop-slot"
              onDrop={(event) => handleDrop(event.dataTransfer.getData('text'), index)}
              onDragOver={(event) => event.preventDefault()}>
              {answers[index] || 'Drop answer here'}
            </div>
          </div>
        ))}
      </div>
      <div className="answers">
        {pairs.map((pair, index) => (
          <div
            key={index}
            draggable
            onDragStart={(event) => event.dataTransfer.setData('text', pair.answer)}
            className="answer">
            {pair.answer}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchPairs;
