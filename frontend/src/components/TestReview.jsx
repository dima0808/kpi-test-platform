import React, { useState } from 'react';
import SingleChoiceReview from '../components/review/SingleChoiceReview';
import MultipleChoicesReview from '../components/review/MultipleChoicesReview';
import MatchPairsReview from '../components/review/MatchPairsReview';
import {calculateTimeDifference} from "../utils/timeUtils";

function TestReview({ testSession }) {
  const [IsAnswer, setIsAnswer] = useState(false);

  return (
    <div className="container">
      {IsAnswer ? (
        <div>
          <h2>Відповіді</h2>
          <div>Студент: {testSession.studentGroup} {testSession.studentName}</div>
          <div>Почато: {testSession.startedAt}</div>
          <div>Закінчено: {testSession.finishedAt}</div>
          <div>Тривалість: {calculateTimeDifference(testSession.startedAt, testSession.finishedAt)}</div>
          {testSession.responses.map((response, index) => (
            <div key={response.id} className="question__body">
              <div className="question__timer">
                <div className="question__counter">
                  {index + 1}/{testSession.responses.length}
                </div>
              </div>
              <h1 className="question__type">
                {(() => {
                  switch (response.question.type) {
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
              <h1 className="question__name">{response.question.content}</h1>

              {response.question.type === 'single_choice' && (
                <SingleChoiceReview
                  answers={response.question.answers}
                  selectedAnswer={response.answerIds}
                />
              )}
              {response.question.type === 'multiple_choices' && (
                <MultipleChoicesReview
                  answers={response.question.answers}
                  selectedAnswer={response.answerIds}
                />
              )}
              {response.question.type === 'matching' && (
                <MatchPairsReview
                  answers={response.question.answers}
                  selectedAnswer={response.answerIds}
                />
              )}
            </div>
          ))}
          <button onClick={() => window.print()} className="test-info__pdf-button">
            Save as PDF {/* todo: fix radio buttons */}
          </button>
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
