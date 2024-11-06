import React, { useEffect, useState } from 'react';
import { getTestById } from '../http';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function TestInfo() {
  const { id } = useParams();
  const [testData, setTestData] = useState(null);
  const testLink = `http://localhost:3000/${id}`;

  useEffect(() => {
    async function fetchData() {
      const token = Cookies.get('token');
      try {
        const data = await getTestById(id, token);
        setTestData(data);
      } catch (error) {
        console.error('Error fetching test data:', error);
      }
    }
    fetchData();
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

      <button className="test-info__import-button">Export</button>
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
          {Array.from({ length: 3 }).map((_, idx) => (
            <tr key={idx}>
              <td>Group A</td>
              <td>John Doe</td>
              <td>27</td>
              <td>35 mins</td>
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
