import React from 'react';

function SingleChoiceQuestion({ question, options, selectedOption, onSelect }) {
  return (
    <div>
      <h1>{question}</h1>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => onSelect(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default SingleChoiceQuestion;
