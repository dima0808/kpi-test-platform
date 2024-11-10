import React, { useState } from 'react';
import { createTest } from '../utils/http';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function TestCreation() {
  const [test, setTest] = useState({
    name: '',
    openDate: '',
    deadline: '',
    minutesToComplete: 0,
    questions: [],
    samples: []
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTest({ ...test, [name]: value });
  };

  const handleAddQuestion = () => {
    setTest({
      ...test,
      questions: [
        ...test.questions,
        {
          content: '',
          points: 0,
          type: 'multiple_choices',
          answers: []
        }
      ]
    });
  };

  const handleDeleteQuestion = (index) => {
    const questions = [...test.questions];
    questions.splice(index, 1);
    setTest({ ...test, questions });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const questions = [...test.questions];
    questions[index][name] = value;
    setTest({ ...test, questions });
  };

  const handleQuestionTypeChange = (index, e) => {
    const { value } = e.target;
    const questions = [...test.questions];
    const currentType = questions[index].type;

    if (currentType === 'matching' || value === 'matching') {
      questions[index].answers = [];
    } else {
      questions[index].answers = questions[index].answers.map(answer => ({ ...answer, isCorrect: false }));
    }

    questions[index].type = value;
    setTest({ ...test, questions });
  };

  const handleAddAnswer = (questionIndex) => {
    const questions = [...test.questions];
    const question = questions[questionIndex];
    const newAnswer = question.type === 'matching' ? { leftOption: '', rightOption: '' } : { content: '', isCorrect: false };
    question.answers.push(newAnswer);
    setTest({ ...test, questions });
  };

  const handleDeleteAnswer = (questionIndex, answerIndex) => {
    const questions = [...test.questions];
    questions[questionIndex].answers.splice(answerIndex, 1);
    setTest({ ...test, questions });
  };

  const validateField = (key, value, index1 = -1, index2 = 0) => {
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
    } else if (key === 'question-content' && !value) {
      error = 'Question content cannot be empty.';
    } else if (key === 'question-points' && (!value || value <= 0)) {
      error = 'Points must be greater than 0.';
    } else if (key === 'question-answer' && value.length < 3) {
      error = 'Answer text must be at least 3 characters.';
    } else if (key === 'question-answer-right' && value.length < 1) {
      error = 'Right option text must be at least 1 character.';
    } else if (key === 'question-answer-left' && value.length < 1) {
      error = 'Left option text must be at least 1 character.';
    }
    setErrors((prevErrors) =>
      ({ ...prevErrors, [index1 !== -1 ? key + '-' + index1 + '-' + index2 : key]: error })
    );
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const { name, value } = e.target;
    const questions = [...test.questions];
    const question = questions[questionIndex];
    if (question.type === 'single_choice' && name === 'isCorrect') {
      question.answers = question.answers.map((answer, index) => ({
        ...answer,
        isCorrect: index === answerIndex
      }));
    } else {
      question.answers[answerIndex][name] = value;
    }
    setTest({ ...test, questions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    createTest(test, token).then(() => navigate('/tests'))
      .catch((error) => setErrors((prevErrors) => ({ ...prevErrors, submit: error.message })));
  };

  return (
    <form className="test-creation" onSubmit={handleSubmit}>
      <h2>Create a Test</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={test.name}
          onChange={handleInputChange}
          onBlur={(e) => validateField('testName', e.target.value)}
          className={errors.testName ? 'error-border' : ''}
        />
        {errors.testName && <div className="error-message">{errors.testName}</div>}
      </div>
      <div>
        <label>Open Date:</label>
        <input
          type="text"
          name="openDate"
          value={test.openDate}
          onChange={handleInputChange}
          onBlur={(e) => validateField('openDate', e.target.value)}
          className={errors.openDate ? 'error-border' : ''}
        />
        {errors.openDate && <div className="error-message">{errors.openDate}</div>}
      </div>
      <div>
        <label>Deadline:</label>
        <input
          type="text"
          name="deadline"
          value={test.deadline}
          onChange={handleInputChange}
          onBlur={(e) => validateField('deadline', e.target.value)}
          className={errors.deadline ? 'error-border' : ''}
        />
        {errors.deadline && <div className="error-message">{errors.deadline}</div>}
      </div>
      <div>
        <label>Minutes to Complete:</label>
        <input
          type="number"
          name="minutesToComplete"
          value={test.minutesToComplete}
          onChange={handleInputChange}
          onBlur={(e) => validateField('minutesToComplete', e.target.value)}
          className={errors.minutesToComplete ? 'error-border' : ''}
        />
        {errors.minutesToComplete && <div className="error-message">{errors.minutesToComplete}</div>}
      </div>
      <div>
        <button type="button" onClick={handleAddQuestion}>Add Question</button>
      </div>
      {test.questions.map((question, qIndex) => (
        <div key={qIndex}>
          <div>
            <label>Question Content:</label>
            <input
              type="text"
              name="content"
              value={question.content}
              onChange={(e) => handleQuestionChange(qIndex, e)}
              onBlur={(e) => validateField('question-content', e.target.value, qIndex)}
              className={errors[`question-content-${qIndex}`] ? 'error-border' : ''}
            />
            {errors[`question-content-${qIndex}-0`] && (
              <div className="error-message">{errors[`question-content-${qIndex}-0`]}</div>
            )}
          </div>
          <div>
            <label>Points:</label>
            <input
              type="number"
              name="points"
              value={question.points}
              onChange={(e) => handleQuestionChange(qIndex, e)}
              onBlur={(e) => validateField('question-points', e.target.value, qIndex)}
              className={errors[`question-points-${qIndex}`] ? 'error-border' : ''}
            />
            {errors[`question-points-${qIndex}-0`] && (
              <div className="error-message">{errors[`question-points-${qIndex}-0`]}</div>
            )}
          </div>
          <div>
            <label>Type:</label>
            <select name="type" value={question.type} onChange={(e) => handleQuestionTypeChange(qIndex, e)}>
              <option value="multiple_choices">Multiple Choices</option>
              <option value="single_choice">Single Choice</option>
              <option value="matching">Matching</option>
            </select>
          </div>
          <div>
            <button type="button" onClick={() => handleAddAnswer(qIndex)}>Add Answer</button>
            <button type="button" onClick={() => handleDeleteQuestion(qIndex)}>Delete Question</button>
          </div>
          {question.answers.map((answer, aIndex) => (
            <div key={aIndex}>
              {question.type === 'matching' ? (
                <>
                  <div>
                    <label>Left Option:</label>
                    <input
                      type="text"
                      name="leftOption"
                      value={answer.leftOption}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                      onBlur={(e) => validateField('question-answer-left', e.target.value, qIndex, aIndex)}
                      className={errors[`question-answer-left-${qIndex}-${aIndex}`] ? 'error-border' : ''}
                    />
                    {errors[`question-answer-left-${qIndex}-${aIndex}`] && (
                      <div className="error-message">{errors[`question-answer-left-${qIndex}-${aIndex}`]}</div>
                    )}
                  </div>
                  <div>
                    <label>Right Option:</label>
                    <input
                      type="text"
                      name="rightOption"
                      value={answer.rightOption}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                      onBlur={(e) => validateField('question-answer-right', e.target.value, qIndex, aIndex)}
                      className={errors[`question-answer-right-${qIndex}-${aIndex}`] ? 'error-border' : ''}
                    />
                    {errors[`question-answer-right-${qIndex}-${aIndex}`] && (
                      <div className="error-message">{errors[`question-answer-right-${qIndex}-${aIndex}`]}</div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label>Content:</label>
                    <input
                      type="text"
                      name="content"
                      value={answer.content}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                      onBlur={(e) => validateField('question-answer', e.target.value, qIndex, aIndex)}
                      className={errors[`question-answer-${qIndex}-${aIndex}`] ? 'error-border' : ''}
                    />
                    {errors[`question-answer-${qIndex}-${aIndex}`] && (
                      <div className="error-message">{errors[`question-answer-${qIndex}-${aIndex}`]}</div>
                    )}
                  </div>
                  <div>
                    <label>Is Correct:</label>
                    {question.type === 'single_choice' ? (
                      <input
                        type="radio"
                        name={`isCorrect-${qIndex}`}
                        checked={answer.isCorrect}
                        onChange={(e) => handleAnswerChange(qIndex, aIndex, {
                          target: {
                            name: 'isCorrect',
                            value: e.target.checked
                          }
                        })}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        name="isCorrect"
                        checked={answer.isCorrect}
                        onChange={(e) => handleAnswerChange(qIndex, aIndex, {
                          target: {
                            name: 'isCorrect',
                            value: e.target.checked
                          }
                        })}
                      />
                    )}
                  </div>
                </>
              )}
              <button type="button" onClick={() => handleDeleteAnswer(qIndex, aIndex)}>Delete Answer</button>
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Create Test</button>

      {errors.submit && <p className="error">{errors.submit}</p>}
    </form>
  );
}

export default TestCreation;
