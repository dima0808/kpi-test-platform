import React from 'react';

function MultipleChoiceQuestion({ question, options, selectedOptions, onSelect }) {
  return (
    <div>
      <h1>{question}</h1>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => onSelect(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default MultipleChoiceQuestion;
