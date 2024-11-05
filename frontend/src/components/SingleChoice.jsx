import React, { useState } from 'react';

function SingleChoice() {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    'System.out.println("Hello world");',
    'Sigma.out.println("Hello world");',
    'print("Hello world")',
    'HelloWorld("print")',
  ];

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
