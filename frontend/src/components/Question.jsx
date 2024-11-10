import React, { useEffect, useState } from 'react';
import SingleChoice from '../components/SingleChoice';
import MultipleChoices from './MultipleChoices';
import MatchPairs from '../components/MatchPairs';

function Question({ test, handleSaveAnswer, handleFinishTest, testSession, question }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if (!endTime) {
      const calculateEndTime = () => {
        const deadline = new Date(test.deadline.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')).getTime();
        const now = new Date().getTime();
        const timeToDeadline = (deadline - now) / 1000; // in seconds
        const timeToComplete = test.minutesToComplete * 60; // in seconds
        return now + Math.min(timeToDeadline, timeToComplete) * 1000;
      };
      setEndTime(calculateEndTime());
    }
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = Math.max(Math.ceil((endTime - now) / 1000), 0);
      setTimeLeft(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(timer);
        handleSaveAnswer(selectedAnswers);
        handleFinishTest();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime, handleFinishTest, handleSaveAnswer, selectedAnswers, test]);

  const handleNext = () => {
    handleSaveAnswer(selectedAnswers);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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
          {timeLeft !== 0 && <div className={`timer__count ${timeLeft <= 60 ? 'timer__red' : ''}`}>
            {formatTime(timeLeft)}
          </div>}
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
