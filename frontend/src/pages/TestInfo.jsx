import React, { useEffect, useState } from 'react';
import {getFinishedSessionsByTestId, getFinishedSessionsByTestIdInCsv, getTestById} from '../utils/http';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import {calculateTimeDifference} from "../utils/timeUtils";

function TestInfo() {
  const { id } = useParams();
  const [testData, setTestData] = useState(null);
  const [testFinishedSessions, setTestFinishedSessions] = useState([]);
  const testLink = `http://localhost:3000/${id}`;

  useEffect(() => {
    const token = Cookies.get('token');
    getTestById(id, token)
      .then(setTestData)
      .catch((error) => console.error('Error fetching test data: ', error));
    getFinishedSessionsByTestId(id, token)
      .then((data) => setTestFinishedSessions(data.sessions))
      .catch((error) => console.error('Error fetching finished sessions: ', error));
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(testLink);
  };

  if (!testData) return <div>Loading...</div>;

  return (
    <div className="test-info">
      <h2 className="test-info__title">{testData.name}</h2>

      <div className="test-info__controls">
        <div className="test-info__link">
          <input type="text" value={testLink} readOnly className="test-info__link-input" />
          <button onClick={handleCopyLink} className="test-info__copy-button">
            Copy Link
          </button>
        </div>
      </div>

      <div className="test-info__details">
        <p>Open Date: {testData.openDate}</p>
        <p>Deadline: {testData.deadline}</p>
        <p>Time Limit: {testData.minutesToComplete} minutes</p>
        <p>Max Score: {testData.maxScore}</p>
        <p>Questions: {testData.questionsCount}</p>
        <p>Started Sessions: {testData.startedSessions}</p>
        <p>Finished Sessions: {testData.finishedSessions}</p>
      </div>

      <button
        onClick={() => getFinishedSessionsByTestIdInCsv(testData.name, id, Cookies.get('token'))}
        className="test-info__import-button"
      >
        Export
      </button>
      <table className="test-info__table">
        <thead>
          <tr>
            <th>Group</th>
            <th>Full Name</th>
            <th>Score</th>
            <th>Completion Time</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {testFinishedSessions.map((session, index) => (
            <tr key={index}>
              <td>{session.studentGroup}</td>
              <td>{session.studentName}</td>
              <td>{session.mark}</td>
              <td>{calculateTimeDifference(session.startedAt, session.finishedAt)}</td>
              <td>
                <button className="test-info__details-button">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TestInfo;
