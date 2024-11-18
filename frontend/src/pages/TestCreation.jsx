import React, { useEffect, useState } from 'react';
import {
  createTest,
  getAllCollections,
  getQuestionsByTestId,
  getSamplesByTestId,
  getTestById,
} from '../utils/http';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import Questions from '../components/creation/Questions';

function TestCreation() {
  const location = useLocation();
  const [test, setTest] = useState({
    name: '',
    openDate: '',
    deadline: '',
    minutesToComplete: 10,
    questions: [],
    samples: [],
  });
  const [collections, setCollections] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cloneId = params.get('cloneId');
    if (cloneId) {
      const token = Cookies.get('token');
      getTestById(cloneId, token)
        .then((testData) => {
          getQuestionsByTestId(cloneId, token)
            .then((questionsData) => {
              getSamplesByTestId(cloneId, token)
                .then((samplesData) => {
                  setTest({
                    name: testData.name,
                    openDate: testData.openDate,
                    deadline: testData.deadline,
                    minutesToComplete: testData.minutesToComplete,
                    questions: questionsData.questions.map((question) => ({
                      content: question.content,
                      points: question.points,
                      type: question.type,
                      answers:
                        question.type === 'matching'
                          ? question.answers
                              .filter((answer) => answer.isCorrect)
                              .map((answer) => ({
                                leftOption: answer.leftOption,
                                rightOption: answer.rightOption,
                              }))
                          : question.answers,
                      collection: '',
                      isSaved: false,
                    })),
                    samples: samplesData.samples.map((sample) => ({
                      collectionName: sample.collectionName,
                      points: sample.points,
                      questionsCount: sample.questionsCount,
                    })),
                  });
                })
                .catch((error) => console.error('Error fetching collections:', error));
            })
            .catch((error) => console.error('Error fetching questions:', error));
        })
        .catch((error) => console.error('Error fetching test data:', error));
    }
  }, [location.search]);

  useEffect(() => {
    getAllCollections()
      .then((data) => setCollections(data.collections))
      .catch((error) => console.error('Error fetching collections:', error));
  }, []);

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
          answers: [],
          collection: '',
          isSaved: false,
        },
      ],
    });
  };

  const handleAddCollection = () => {
    setTest({
      ...test,
      samples: [
        ...test.samples,
        {
          collectionName: collections[0]?.name || '',
          points: 0,
          questionsCount: 0,
        },
      ],
    });
  };

  const handleDeleteCollection = (collectionIndex) => {
    const samples = [...test.samples];
    samples.splice(collectionIndex, 1);
    setTest({ ...test, samples });
  };

  const handleCollectionChange = (collectionIndex, e) => {
    const { name, value } = e.target;
    const samples = [...test.samples];
    samples[collectionIndex][name] = value;
    setTest({ ...test, samples });
  };

  const handleCollectionNameChange = (collectionIndex, e) => {
    const { value } = e.target;
    const samples = [...test.samples];
    samples[collectionIndex].collectionName = value;
    setTest({ ...test, samples });
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
    return error === '';
  };

  const handleSubmit = async () => {
    const token = Cookies.get('token');
    createTest(test, token)
      .then(() => navigate('/tests'))
      .catch((error) => {
        setErrors((prevErrors) => ({ ...prevErrors, submit: error.message }));
      });
  };

  return (
    <div className="test-creation">
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
          placeholder="e.g., 11.11.2024 12:35"
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
          placeholder="e.g., 11.11.2024 15:35"
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
        {errors.minutesToComplete && (
          <div className="error-message">{errors.minutesToComplete}</div>
        )}
      </div>
      <Questions
        instance={test}
        collections={collections}
        errors={errors}
        setInstance={setTest}
        setErrors={setErrors}
      />
      <div className="collections-container">
        {test.samples.map((sample, sIndex) => (
          <div className="collection" key={sIndex}>
            <div className="collection-form">
              <div>
                <label>Collection Name:</label>
                <select
                  name="collectionName"
                  value={sample.collectionName}
                  onChange={(e) => handleCollectionNameChange(sIndex, e)}>
                  {collections.map((collection) => (
                    <option key={collection.id} value={collection.name}>
                      {collection.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Points:</label>
                <input
                  type="number"
                  name="points"
                  value={sample.points}
                  onChange={(e) => handleCollectionChange(sIndex, e)}
                  onBlur={(e) => validateField('collection-points', e.target.value, sIndex)}
                  className={errors[`collection-points-${sIndex}`] ? 'error-border' : ''}
                />
                {errors[`collection-points-${sIndex}-0`] && (
                  <div className="error-message">{errors[`collection-points-${sIndex}-0`]}</div>
                )}
              </div>
              <div>
                <label>Questions count:</label>
                <input
                  type="number"
                  name="questionsCount"
                  value={sample.questionsCount}
                  onChange={(e) => handleCollectionChange(sIndex, e)}
                  onBlur={(e) => validateField('collection-points', e.target.value, sIndex)}
                  className={errors[`collection-questions-count-${sIndex}`] ? 'error-border' : ''}
                />
                {errors[`collection-questions-count-${sIndex}-0`] && (
                  <div className="error-message">
                    {errors[`collection-questions-count-${sIndex}-0`]}
                  </div>
                )}
              </div>
            </div>
            <button className="delete-button" onClick={() => handleDeleteCollection(sIndex)}>
              Delete Collection
            </button>
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button onClick={handleAddQuestion}>Add Question</button>
        <button onClick={handleAddCollection}>Add Collection</button>
        <button onClick={handleSubmit}>Create Test</button>
      </div>

      {errors.submit &&
        errors.submit.split(',').map((error, index) => (
          <div key={index} className="error-message">
            {error}
          </div>
        ))}
    </div>
  );
}

export default TestCreation;
