import React from "react";
import Cookies from "js-cookie";
import {addQuestionToCollection} from "../../utils/http";

function Questions({ instance, collections, errors, setInstance, setErrors }) {

  const handleDeleteQuestion = (questionIndex) => {
    const questions = [...instance.questions];
    questions.splice(questionIndex, 1);
    setInstance({ ...instance, questions });
  };

  const handleQuestionChange = (questionIndex, e) => {
    const { name, value } = e.target;
    const questions = [...instance.questions];
    questions[questionIndex][name] = value;
    questions[questionIndex].collection = '';
    questions[questionIndex].isSaved = false;
    setInstance({ ...instance, questions });
  };

  const handleQuestionCollectionChange = (questionIndex, e) => {
    const { value } = e.target;
    const questions = [...instance.questions];
    questions[questionIndex].collection = value;
    questions[questionIndex].isSaved = false;
    setInstance({ ...instance, questions });
  }

  const handleAddQuestionToCollection = (questionIndex) => {
    const questions = [...instance.questions];
    const question = questions[questionIndex];
    const token = Cookies.get('token');
    if (!validateField('question-collection', question.collection, questionIndex) ||
      !validateField('question-saved', question.isSaved, questionIndex)) {
      return;
    }
    addQuestionToCollection(question, question.collection, token).then(() => {
      questions[questionIndex].isSaved = true;
      if (instance.samples.some(sample => sample.collectionName === question.collection)) {
        questions.splice(questionIndex, 1);
      }
      setInstance({ ...instance, questions });
    }).catch((error) => {
      setErrors((prevErrors) => ({ ...prevErrors, submit: error.message }));
    });
  }

  const handleQuestionTypeChange = (questionIndex, e) => {
    const { value } = e.target;
    const questions = [...instance.questions];
    const currentType = questions[questionIndex].type;
    if (currentType === 'matching' || value === 'matching') {
      questions[questionIndex].answers = [];
    } else {
      questions[questionIndex].answers = questions[questionIndex].answers.map(answer => ({ ...answer, isCorrect: false }));
    }
    questions[questionIndex].type = value;
    questions[questionIndex].collection = '';
    questions[questionIndex].isSaved = false;
    setInstance({ ...instance, questions });
  };

  const handleAddAnswer = (questionIndex) => {
    const questions = [...instance.questions];
    const question = questions[questionIndex];
    const newAnswer = question.type === 'matching' ? { leftOption: '', rightOption: '' } : { content: '', isCorrect: false };
    question.answers.push(newAnswer);
    questions[questionIndex].collection = '';
    questions[questionIndex].isSaved = false;
    setInstance({ ...instance, questions });
  };

  const handleDeleteAnswer = (questionIndex, answerIndex) => {
    const questions = [...instance.questions];
    questions[questionIndex].answers.splice(answerIndex, 1);
    questions[questionIndex].collection = '';
    questions[questionIndex].isSaved = false;
    setInstance({ ...instance, questions });
  };

  const validateField = (key, value, index1 = -1, index2 = 0) => {
    let error = '';

    if (key === 'question-content' && !value) {
      error = 'Question content cannot be empty.';
    } else if (key === 'question-points' && (!value || value <= 0)) {
      error = 'Points must be greater than 0.';
    } else if (key === 'question-answer' && value.length < 3) {
      error = 'Answer text must be at least 3 characters.';
    } else if (key === 'question-answer-right' && value.length < 1) {
      error = 'Right option text must be at least 1 character.';
    } else if (key === 'question-answer-left' && value.length < 1) {
      error = 'Left option text must be at least 1 character.';
    } else if (key === 'question-collection' && value === '') {
      error = 'Collection must be selected.';
    } else if (key === 'question-saved' && value === true) {
      error = 'Question is already saved.';
    }
    setErrors((prevErrors) =>
      ({ ...prevErrors, [index1 !== -1 ? key + '-' + index1 + '-' + index2 : key]: error })
    );
    return error === '';
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const { name, value } = e.target;
    const questions = [...instance.questions];
    const question = questions[questionIndex];
    if (question.type === 'single_choice' && name === 'isCorrect') {
      question.answers = question.answers.map((answer, index) => ({
        ...answer,
        isCorrect: index === answerIndex
      }));
    } else {
      question.answers[answerIndex][name] = value;
    }
    question.collection = '';
    question.isSaved = false;
    setInstance({ ...instance, questions });
  };

  return (
    <div className="questions-container">
      {instance.questions.map((question, qIndex) => (
        <div className={"question " + (question.isSaved ? " border-saved" : "")} key={qIndex}>
          <div className="question-form">
            {collections && <div>
              <label>Save to collection:</label>
              <select
                name="collection"
                value={question.collection}
                onChange={(e) => handleQuestionCollectionChange(qIndex, e)}
              >
                <option value=''>None</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.name}>{collection.name}</option>
                ))}
              </select>
              <button type="button" onClick={() => handleAddQuestionToCollection(qIndex)}>
                Save into collection
              </button>
              {errors[`question-collection-${qIndex}-0`] && (
                <div className="error-message">{errors[`question-collection-${qIndex}-0`]}</div>
              )}
              {errors[`question-saved-${qIndex}-0`] && question.isSaved && (
                <div className="error-message">{errors[`question-saved-${qIndex}-0`]}</div>
              )}
            </div>}
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
              <select
                name="type"
                value={question.type}
                onChange={(e) => handleQuestionTypeChange(qIndex, e)}
              >
                <option value="multiple_choices">Multiple Choices</option>
                <option value="single_choice">Single Choice</option>
                <option value="matching">Matching</option>
              </select>
            </div>
            <button type="button" onClick={() => handleAddAnswer(qIndex)}>
              Add Answer
            </button>
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex} className="answer-input">
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
          <button className="delete-button" onClick={() => handleDeleteQuestion(qIndex)}>
            Delete Question
          </button>
        </div>
      ))}
    </div>
  )
}

export default Questions;
