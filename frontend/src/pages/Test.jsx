import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import duration from '../assets/icons/duration.svg';
import question from '../assets/icons/question.svg';
import score from '../assets/icons/score.svg';
import group from '../assets/icons/group.svg';
import human from '../assets/icons/human.svg';
import { getTestById } from '../http';

function Test() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);

  useEffect(() => {
    async function fetchTest() {
      try {
        const data = await getTestById(id);
        setTest(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTest();
  }, [id]);

  if (!test) {
    return <div>Loading...</div>;
  }

  const formatDuration = (minutes) => {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const mins = minutes % 60;
    return `${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}h ` : ''}${mins}m`;
  };

  const startTest = () => {
    navigate(`/${id}/start`);
  };

  return (
    <div className="container__center">
      <div className="test">
        <div className="test__info">
          <ul className="info__list">
            <li className="info__duration">
              <img src={duration} alt="duration" />
              <span>{formatDuration(test.minutesToComplete)}</span>
            </li>
            <li className="info__question">
              <img src={question} alt="question" />
              <span>{test.questions ? test.questions : '100'} Questions</span>
            </li>
            <li className="info__score">
              <img src={score} alt="score" />
              <span>{test.maxScore} points</span>
            </li>
          </ul>
        </div>
        <h1 className="test__name">{test.name}</h1>
        <form className="test__form">
          <div className="test__fields">
            <div className="test__field">
              <img src={group} alt="group" />
              <input type="text" placeholder="Group" />
            </div>
            <div className="test__field">
              <img src={human} alt="human" className="test__numan" />
              <input type="text" placeholder="Full Name" />
            </div>
          </div>
          <button onClick={startTest} className="test__button">
            Take a test
          </button>
        </form>
      </div>
    </div>
  );
}

export default Test;
