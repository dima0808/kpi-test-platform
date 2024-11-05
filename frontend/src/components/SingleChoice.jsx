import React, { useState } from 'react';

function SingleChoice({ options }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  return (
    <div className="single-choice">
      {options.map((option, index) => (
        <label key={index} className="option">
          <input
            type="radio"
            name="single-choice"
            value={index}
            checked={selectedOption === index}
            onChange={() => handleOptionChange(index)}
          />
          <span className="custom-radio"></span>
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

export default SingleChoice;
