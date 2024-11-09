import React, { useState } from 'react';
import SingleChoiceReview from '../components/review/SingleChoiceReview';
import MultipleChoicesReview from '../components/review/MultipleChoicesReview';
import MatchPairsReview from '../components/review/MatchPairsReview';

const fakeFinishedSessions = {
  questions: [
    {
      id: 1,
      content: 'will you put a phone down?',
      points: 10,
      type: 'multiple_choices',
      answers: [
        { id: 1, isCorrect: false, content: 'yes', leftOption: null, rightOption: null },
        { id: 2, isCorrect: true, content: 'no', leftOption: null, rightOption: null },
        {
          id: 3,
          isCorrect: true,
          content: 'this is for my safety',
          leftOption: null,
          rightOption: null,
        },
      ],
      selectedAnswers: [2, 3],
    },
    {
      id: 2,
      content: 'will you put still water down?',
      points: 5,
      type: 'single_choice',
      answers: [
        { id: 4, isCorrect: false, content: 'yes', leftOption: null, rightOption: null },
        {
          id: 5,
          isCorrect: true,
          content: 'this is for those who know (skull emoji)',
          leftOption: null,
          rightOption: null,
        },
      ],
      selectedAnswer: 5,
    },
    {
      id: 3,
      content: 'match the numbers with the letters',
      points: 15,
      type: 'matching',
      answers: [
        { id: 6, isCorrect: true, content: null, leftOption: '1', rightOption: 'a' },
        { id: 7, isCorrect: false, content: null, leftOption: '1', rightOption: 'b' },
        { id: 8, isCorrect: false, content: null, leftOption: '2', rightOption: 'a' },
        { id: 9, isCorrect: true, content: null, leftOption: '2', rightOption: 'b' },
      ],
      matchedAnswers: ['a', 'b'],
    },
  ],
};

function TestReview() {
  const [IsAnswer, setIsAnswer] = useState(false);

  return (
    <div className="container">
      {IsAnswer ? (
        <div>
          <h2>Відповіді</h2>
          {fakeFinishedSessions.questions.map((question, index) => (
            <div key={question.id} className="question__body">
              <div className="question__timer">
                <div className="question__counter">
                  {index + 1}/{fakeFinishedSessions.questions.length}
                </div>
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
                <SingleChoiceReview
                  answers={question.answers}
                  selectedAnswer={question.selectedAnswer}
                />
              )}
              {question.type === 'multiple_choices' && (
                <MultipleChoicesReview
                  answers={question.answers}
                  selectedAnswers={question.selectedAnswers}
                />
              )}
              {question.type === 'matching' && (
                <MatchPairsReview
                  answers={question.answers}
                  matchedAnswers={question.matchedAnswers}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="finished">
          <h1>Test have been completed!</h1>
          <div className="finished__answer">
            <button
              onClick={() => {
                setIsAnswer(true);
              }}
              className="finished__check">
              Check my answers
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestReview;
