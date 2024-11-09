import React from 'react';

function MultipleChoicesReview({ answers, selectedAnswers }) {
  return (
    <div className="multiple-choice-review">
      {answers.map((answer) => (
        <label key={answer.id} className="option">
          <input
            type="checkbox"
            name="multiple-choice-review"
            value={answer.id}
            checked={selectedAnswers.includes(answer.id)}
            readOnly
          />
          <span className="custom-checkbox"></span>
          <span>{answer.content}</span>
        </label>
      ))}
    </div>
  );
}

export default MultipleChoicesReview;
