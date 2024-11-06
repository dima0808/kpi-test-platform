import React, { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import { createTest } from '../http';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";

function TestCreation() {
  const [testName, setTestName] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [minutesToComplete, setMinutesToComplete] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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

  const validateField = (key, value) => {
    let error = '';
    const dateTimeRegex = /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/;

    if (key === 'testName' && !value) {
      error = 'Test name cannot be empty.';
    } else if (key === 'openDate' && (!value || !dateTimeRegex.test(value))) {
      error = 'Open date must be in the format DD.MM.YYYY HH:MM.';
    } else if (key === 'deadline' && (!value || !dateTimeRegex.test(value))) {
      error = 'Deadline must be in the format DD.MM.YYYY HH:MM.';
    } else if (key === 'minutesToComplete' && (!value || value <= 0)) {
      error = 'Minutes to complete must be greater than 0.';
    }
    setErrors((prevErrors) => ({ ...prevErrors, [key]: error }));
  };

  const handleSubmit = async () => {
    const testData = {
      name: testName,
      openDate,
      deadline,
      minutesToComplete,
      questions: questions.map(({ id, ...q }) => q)
    };

    console.log(testData);
    const token = Cookies.get('token');

    try {
      createTest(testData, token).then(() => {
        navigate('/tests');
      });
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, submit: error.message }));
    }
  };

  return (
    <div className="test-creation">
      <h2>Create a Test</h2>
      <label>
        Name:
        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          onBlur={(e) => validateField('testName', e.target.value)}
          className={errors.testName ? 'error-border' : ''}
        />
        {errors.testName && <div className="error-message">{errors.testName}</div>}
      </label>
      <label>
        Open Date:
        <input
          type="text"
          placeholder="e.g., 11.11.2024 23:35"
          value={openDate}
          onChange={(e) => setOpenDate(e.target.value)}
          onBlur={(e) => validateField('openDate', e.target.value)}
          className={errors.openDate ? 'error-border' : ''}
        />
        {errors.openDate && <div className="error-message">{errors.openDate}</div>}
      </label>
      <label>
        Deadline:
        <input
          type="text"
          placeholder="e.g., 11.11.2024 23:59"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          onBlur={(e) => validateField('deadline', e.target.value)}
          className={errors.deadline ? 'error-border' : ''}
        />
        {errors.deadline && <div className="error-message">{errors.deadline}</div>}
      </label>
      <label>
        Minutes to Complete:
        <input
          type="number"
          value={minutesToComplete}
          onChange={(e) => setMinutesToComplete(e.target.value)}
          onBlur={(e) => validateField('minutesToComplete', e.target.value)}
          className={errors.minutesToComplete ? 'error-border' : ''}
        />
        {errors.minutesToComplete && (
          <div className="error-message">{errors.minutesToComplete}</div>
        )}
      </label>

      <div className="questions-container">
        {questions.map((question) => (
          <div key={question.id} className="question">
            <QuestionForm
              question={question}
              onChange={(updatedQuestion) => handleQuestionChange(question.id, updatedQuestion)}
            />
            <button className="delete-button" onClick={() => deleteQuestion(question.id)}>
              Delete Question
            </button>
          </div>
        ))}
      </div>

      <div className="buttons-container">
        <button onClick={addQuestion}>Add Question</button>
        <button onClick={handleSubmit}>Submit Test</button>
      </div>

      {errors.submit && <p className="error">{errors.submit}</p>}
    </div>
  );
}

export default TestCreation;
