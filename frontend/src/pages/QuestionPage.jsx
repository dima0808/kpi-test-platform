import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionsByTestId } from '../http';
import Cookies from 'js-cookie';
import SingleChoice from '../components/SingleChoice';
import MultipleChoice from '../components/MultipleChoice';
import MatchPairs from '../components/MatchPairs';

function QuestionPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = Cookies.get('token');
        const questionsData = await getQuestionsByTestId(id, token);
        setQuestions(questionsData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchQuestions();
  }, [id]);

  if (error) return <div>Помилка: {error}</div>;

  console.log(questions);

  return (
    <div className="container">
      <div className="question__body">
        <div className="question__timer">
          <div className="question__counter">14/88</div>
          <div className="timer__count">44:56</div>
        </div>
        <h1 className="question__type">Choose one option</h1>
        <h1 className="question__name">How to print ‘Hello world’ to the console output?</h1>
        {/* <SingleChoice /> */}
        {/* <MultipleChoice /> */}
        {/* <MatchPairs /> */}
        <div className="question__next">
          <button className="question__next-btn">Next</button>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
