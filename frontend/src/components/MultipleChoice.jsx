import React, { useState } from 'react';

function MultipleChoice() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    'System.out.println("Hello world");',
    'Sigma.out.println("Hello world");',
    'print("Hello world")',
    'HelloWorld("print")',
  ];

  const handleOptionChange = (index) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((optionIndex) => optionIndex !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  return (
    <div className="multiple-choice">
      {options.map((option, index) => (
        <label key={index} className="option">
          <input
            type="checkbox"
            name="multiple-choice"
            value={index}
            checked={selectedOptions.includes(index)}
            onChange={() => handleOptionChange(index)}
          />
          <span className="custom-checkbox"></span>
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

export default MultipleChoice;
