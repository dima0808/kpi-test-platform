import React from 'react';

function SingleChoiceReview({ answers, selectedAnswer }) {
  return (
    <div className="single-choice-review">
      {answers.map((answer) => (
        <label key={answer.id} className="option">
          <input
            type="radio"
            name="single-choice-review"
            value={answer.id}
            checked={selectedAnswer[0] === answer.id}
            readOnly
          />
          <span className="custom-radio"></span>
          <span>{answer.content}</span>
        </label>
      ))}
    </div>
  );
}

export default SingleChoiceReview;
