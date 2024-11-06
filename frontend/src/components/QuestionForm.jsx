import React, { useState } from 'react';

function QuestionForm({ question, onChange }) {
  const { content, points, type, answers } = question;
  const [errors, setErrors] = useState({});

  const handleQuestionChange = (key, value) => {
    onChange({ ...question, [key]: value });
  };

  const handleAnswerChange = (index, key, value) => {
    const updatedAnswers = answers.map((a, i) => (i === index ? { ...a, [key]: value } : a));
    onChange({ ...question, answers: updatedAnswers });
  };

  const addAnswer = () => {
    const newAnswer =
      type === 'matching' ? { leftOption: '', rightOption: '' } : { content: '', isCorrect: false };
    onChange({ ...question, answers: [...answers, newAnswer] });
  };

  const deleteAnswer = (index) => {
    const updatedAnswers = answers.filter((_, i) => i !== index);
    onChange({ ...question, answers: updatedAnswers });
  };

  const validateField = (key, value) => {
    let error = '';
    if (key === 'content' && !value) {
      error = 'Question content cannot be empty.';
    } else if (key === 'points' && (!value || value <= 0)) {
      error = 'Points must be greater than 0.';
    } else if (key === 'answer' && value.length < 3) {
      error = 'Answer text must be at least 3 characters.';
    }
    setErrors((prevErrors) => ({ ...prevErrors, [key]: error }));
  };

  return (
    <div className="question-form">
      <label>
        Question Content:
        <input
          type="text"
          value={content}
          onChange={(e) => handleQuestionChange('content', e.target.value)}
          onBlur={(e) => validateField('content', e.target.value)}
          className={errors.content ? 'error-border' : ''}
        />
        {errors.content && <div className="error-message">{errors.content}</div>}
      </label>
      <label>
        Points:
        <input
          type="number"
          value={points}
          min={1}
          onChange={(e) => handleQuestionChange('points', e.target.value)}
          onBlur={(e) => validateField('points', e.target.value)}
          className={errors.points ? 'error-border' : ''}
        />
        {errors.points && <div className="error-message">{errors.points}</div>}
      </label>
      <label>
        Question Type:
        <select value={type} onChange={(e) => handleQuestionChange('type', e.target.value)}>
          <option value="single_choice">Single Choice</option>
          <option value="multiple_choices">Multiple Choices</option>
          <option value="matching">Matching Pairs</option>
        </select>
      </label>

      {answers.map((answer, index) => (
        <div key={index} className="answer-input">
          {type === 'matching' ? (
            <>
              <input
                type="text"
                placeholder="Left Option"
                value={answer.leftOption}
                onChange={(e) => handleAnswerChange(index, 'leftOption', e.target.value)}
                onBlur={(e) => validateField('answer', e.target.value)}
                className={errors[`answer-${index}-left`] ? 'error-border' : ''}
              />
              {errors[`answer-${index}-left`] && (
                <div className="error-message">{errors[`answer-${index}-left`]}</div>
              )}
              <input
                type="text"
                placeholder="Right Option"
                value={answer.rightOption}
                onChange={(e) => handleAnswerChange(index, 'rightOption', e.target.value)}
                onBlur={(e) => validateField('answer', e.target.value)}
                className={errors[`answer-${index}-right`] ? 'error-border' : ''}
              />
              {errors[`answer-${index}-right`] && (
                <div className="error-message">{errors[`answer-${index}-right`]}</div>
              )}
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Answer Text"
                value={answer.content}
                onChange={(e) => handleAnswerChange(index, 'content', e.target.value)}
                onBlur={(e) => validateField('answer', e.target.value)}
                className={errors[`answer-${index}`] ? 'error-border' : ''}
              />
              {errors[`answer-${index}`] && (
                <div className="error-message">{errors[`answer-${index}`]}</div>
              )}
              <label>
                <input
                  type={type === 'single_choice' ? 'radio' : 'checkbox'}
                  checked={answer.isCorrect}
                  onChange={() => handleAnswerChange(index, 'isCorrect', !answer.isCorrect)}
                />
                Correct
              </label>
            </>
          )}
          <button onClick={() => deleteAnswer(index)}>Delete Answer</button>
        </div>
      ))}

      <button onClick={addAnswer}>Add Answer</button>
    </div>
  );
}

export default QuestionForm;
