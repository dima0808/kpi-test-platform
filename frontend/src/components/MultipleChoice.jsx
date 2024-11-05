import React, { useState } from 'react';

function MultipleChoice({ options }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

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
