import React, { useState } from 'react';
import SingleChoice from '../components/SingleChoice';
import MultipleChoices from './MultipleChoices';
import MatchPairs from '../components/MatchPairs';

function Question({ test, handleSaveAnswer, handleFinishTest, testSession, question }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleNext = () => {
    handleSaveAnswer(selectedAnswers);
    if (testSession.currentQuestionIndex === test.questionsCount - 1) {
      handleFinishTest();
    }
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="question__body">
        <div className="question__timer">
          <div className="question__counter">
            {testSession.currentQuestionIndex + 1}/{test.questionsCount}
          </div>
          <div className="timer__count">44:56</div>
        </div>
        <h1 className="question__type">
          {(() => {
            switch (question.type) {
              case 'single_choice':
                return 'Choose one option';
              case 'multiple_choices':
                return 'Select all options';
              case 'matching':
                return 'Match the pairs';
              default:
                return '';
            }
          })()}
        </h1>
        <h1 className="question__name">{question.content}</h1>

        {question.type === 'single_choice' && (
          <SingleChoice
            answers={question.answers}
            selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers}
          />
        )}
        {question.type === 'multiple_choices' && (
          <MultipleChoices
            answers={question.answers}
            selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers}
          />
        )}
        {question.type === 'matching' && (
          <MatchPairs
            answers={question.answers}
            setSelectedAnswers={setSelectedAnswers}
          />
        )}

        <div className="question__next">
          <button className="question__next-btn" onClick={handleNext}>
            {testSession.currentQuestionIndex < test.questionsCount - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Question;
