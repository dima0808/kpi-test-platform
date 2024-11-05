import React, { useState } from 'react';
import SingleChoice from '../components/SingleChoice';
import MultipleChoice from '../components/MultipleChoice';
import MatchPairs from '../components/MatchPairs';

// Sample questions data
const questionsData = [
  {
    type: 'single', // Single choice question
    question: 'How to print ‘Hello world’ to the console output?',
    options: [
      'System.out.println("Hello world");',
      'Sigma.out.println("Hello world");',
      'print("Hello world")',
      'HelloWorld("print")',
    ],
    answer: 0,
  },
  {
    type: 'multiple', // Multiple choice question
    question: 'Select all valid ways to print ‘Hello world’:',
    options: [
      'System.out.println("Hello world");',
      'Sigma.out.println("Hello world");',
      'print("Hello world")',
      'HelloWorld("print")',
    ],
    answer: [0, 2], // Correct answers' indices
  },
  {
    type: 'match', // Match pairs question
    question: 'Match the following:',
    options: [
      'Skibidi',
      'Oh the weather outside is rizzy',
      'Java это',
      'Lorem ipsum dolor sit amet',
    ],
    answers: [
      'But the fire is so skibidi',
      'Skibidi',
      'строго типизированный объектно-ориентированный язык программирования общего назначения.',
      'ой у лузі червона калина похилилась до води калина червона калина червона калина аіфа',
    ],
  },
];

function QuestionPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questionsData[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="container">
      <div className="question__body">
        <div className="question__timer">
          <div className="question__counter">
            {currentQuestionIndex + 1}/{questionsData.length}
          </div>
          <div className="timer__count">44:56</div>
        </div>
        <h1 className="question__type">
          {currentQuestion.type === 'single'
            ? 'Choose one option'
            : currentQuestion.type === 'multiple'
            ? 'Select all options'
            : 'Match the pairs'}
        </h1>
        <h1 className="question__name">{currentQuestion.question}</h1>

        {currentQuestion.type === 'single' && <SingleChoice options={currentQuestion.options} />}
        {currentQuestion.type === 'multiple' && (
          <MultipleChoice options={currentQuestion.options} />
        )}
        {currentQuestion.type === 'match' && (
          <MatchPairs options={currentQuestion.options} answers={currentQuestion.answers} />
        )}

        <div className="question__next">
          <button className="question__next-btn" onClick={handleNext}>
            {currentQuestionIndex < currentQuestion.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
