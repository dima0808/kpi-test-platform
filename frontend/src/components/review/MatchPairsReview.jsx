import React from 'react';

function MatchPairsReview({ answers, matchedAnswers }) {
  const leftOptions = [...new Set(answers.map((answer) => answer.leftOption))];
  const rightOptions = [...new Set(answers.map((answer) => answer.rightOption))];

  return (
    <div className="match-pairs-review">
      <div className="match__container">
        {leftOptions.map((left, index) => (
          <div className="match__question" key={index}>
            <div className="match__name">{left}</div>
            <div className="match__between"></div>
            <div className="match__field filled">{matchedAnswers[index]}</div>
          </div>
        ))}
      </div>
      <div className="match__list--answer">
        {rightOptions.map((right, index) => (
          <div className="match__answer" key={index}>
            {right}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchPairsReview;
