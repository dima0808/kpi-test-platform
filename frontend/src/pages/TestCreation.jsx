import React, { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import { createTest } from '../http';
import Cookies from 'js-cookie';

function TestCreation({ token }) {
  const [testName, setTestName] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [minutesToComplete, setMinutesToComplete] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validateForm = () => {
    if (!testName || !openDate || !deadline) {
      setError('Test name, open date, and deadline cannot be empty.');
      return false;
    }

    for (const question of questions) {
      if (!question.content) {
        setError(`Question content cannot be empty.`);
        return false;
      }
      if (question.points <= 0) {
        setError(`Points for a question must be greater than 0.`);
        return false;
      }
      if (question.type === 'single_choice' || question.type === 'multiple_choices') {
        for (const answer of question.answers) {
          if (answer.content.length < 3) {
            setError(`Answer text must be at least 3 characters.`);
            return false;
          }
        }
      }
    }

    setError(null);
    return true;
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length, content: '', points: 1, type: 'single_choice', answers: [] },
    ]);
  };

  const handleQuestionChange = (id, updatedQuestion) => {
    setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === id ? updatedQuestion : q)));
  };

  const deleteQuestion = (id) => {
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const testData = {
      name: testName,
      openDate,
      deadline,
      minutesToComplete,
      questions: questions.map(({ id, ...q }) => q),
      samples: [
        {
          collectionName: 'L1',
          points: 1,
          questionsCount: 1,
        },
      ],
    };

    const token = Cookies.get('token');

    try {
      const response = await createTest(testData, token);
      setSuccess('Test created successfully!');
      console.log('Response:', response);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="test-creation">
      <h2>Create a Test</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <label>
        Name:
        <input type="text" value={testName} onChange={(e) => setTestName(e.target.value)} />
      </label>
      <label>
        Open Date:
        <input
          type="text"
          placeholder="e.g., 11.11.2024 23:35"
          value={openDate}
          onChange={(e) => setOpenDate(e.target.value)}
        />
      </label>
      <label>
        Deadline:
        <input
          type="text"
          placeholder="e.g., 11.11.2024 23:59"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </label>
      <label>
        Minutes to Complete:
        <input
          type="number"
          value={minutesToComplete}
          onChange={(e) => setMinutesToComplete(e.target.value)}
        />
      </label>

      <button onClick={addQuestion}>Add Question</button>

      {questions.map((question) => (
        <div key={question.id}>
          <QuestionForm
            question={question}
            onChange={(updatedQuestion) => handleQuestionChange(question.id, updatedQuestion)}
          />
          <button onClick={() => deleteQuestion(question.id)}>Delete Question</button>
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Test</button>
    </div>
  );
}

export default TestCreation;
