import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getTestById } from '../http';
import {IP} from "../constraints";
import {Client} from "@stomp/stompjs";
import TestPreview from "../components/TestPreview";
import Question from "../components/Question";
import Cookies from "js-cookie";
import TestReview from "../components/TestReview";

function Test() {
  const { id } = useParams();
  const [test, setTest] = useState(null);

  const [error, setError] = useState(null);
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [credentials, setCredentials] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [testSession, setTestSession] = useState(null);
  const [question, setQuestion] = useState(null);

  const onTestSessionMessageReceived = (message) => {
    const { type, content, question, testSession } = JSON.parse(message.body);
    console.log(content);
    switch (type) {
      case 'START':
        setIsStarted(true);
        setTestSession(testSession);
        handleNextQuestion();
        break;
      case 'SAVE_ANSWER':
        setTestSession(testSession);
        if (testSession.currentQuestionIndex <= test.questionsCount - 1) {
          handleNextQuestion();
        }
        break;
      case 'NEXT_QUESTION':
        setQuestion(question);
        setTestSession(testSession);
        break;
      case 'FINISH':
        setIsStarted(false);
        setIsFinished(true);
        setTestSession(testSession);
        break;
      default:
        break;
    }
  }

  const onErrorMessageReceived = (message) => {
    const data = JSON.parse(message.body);
    console.log(data.message);
  }

  useEffect(() => {
    getTestById(id)
      .then((data) => {
        setTest(data);
        const client = new Client({
          brokerURL: 'ws://' + IP + '/ws',
          onConnect: () => {
            console.log('WebSocket client connected');
            // client.subscribe('/topic/tests/' + id, onTestMessageReceived);
            setIsConnected(true);
          },
          onStompError: () => {
            console.log('Failed to connect WebSocket client');
            setIsConnected(false);
          },
        });
        client.activate();
        setClient(client);
        return () => {
          client.deactivate().then(() => console.log('WebSocket client disconnected'));
          setClient(null);
          setIsConnected(false);
        };
      })
      .catch((error) => setError({ message: error.message || "An error occurred" }));
  }, [id]);

  useEffect(() => {
    if (client && isConnected && credentials) {
      const errorSubscription =
        client.subscribe(`/user/${credentials}/queue/errors`, onErrorMessageReceived);
      const testSessionSubscription =
        client.subscribe(`/user/${credentials}/queue/testSession`, onTestSessionMessageReceived);
      const studentGroup = credentials.split(':')[0];
      const studentName = credentials.split(':')[1];
      try {
        client.publish({
          destination: `/api/v1/tests/${id}/start`,
          headers: {
            credentials: credentials,
          },
          body: JSON.stringify({
            studentGroup: studentGroup,
            studentName: studentName,
          }),
        });
      } catch (error) {
        console.log('Error starting test (no connection)');
      }
      return () => {
        errorSubscription.unsubscribe();
        testSessionSubscription.unsubscribe();
      };
    }
  }, [client, isConnected, credentials, id]);

  const handleStartTest = (studentGroup, studentName) => {
    if (!client || !isConnected) {
      return; // handle error in a better way
    }
    if (!studentGroup || !studentName) {
      return; // handle error in a better way
    }
    setCredentials(`${studentGroup}:${studentName}`);
    Cookies.set('group', studentGroup);
    Cookies.set('name', studentName);
  }

  const handleNextQuestion = () => {
    if (!client || !isConnected) {
      return; // handle error in a better way
    }
    try {
      client.publish({
        destination: `/api/v1/tests/${id}/nextQuestion`,
        headers: {
          credentials: credentials,
        },
      });
    } catch (error) {
      console.log('Error getting next question (no connection)');
    }
  }

  const handleSaveAnswer = (answers) => {
    if (!client || !isConnected) {
      return; // handle error in a better way
    }
    try {
      client.publish({
        destination: `/api/v1/tests/${id}/saveAnswer`,
        headers: {
          credentials: credentials,
        },
        body: JSON.stringify({
          answerIds: answers,
        }),
      });
    } catch (error) {
      console.log('Error saving answer (no connection)');
    }
  }

  const handleFinishTest = () => {
    if (!client || !isConnected) {
      return; // handle error in a better way
    }
    try {
      client.publish({
        destination: `/api/v1/tests/${id}/finish`,
        headers: {
          credentials: credentials,
        },
      });
    } catch (error) {
      console.log('Error finishing test (no connection)');
    }
  }

  if (error) {
    return <div>{error.message}</div>; // handle error in a better way
  } else if (!test) {
    return <div>Loading...</div>;
  }

  if (!isStarted && !isFinished) {
    return (
      <TestPreview
        test={test}
        handleStartTest={handleStartTest}
      />
    );
  }

  if (isStarted && !isFinished) {
    return (
      <Question
        test={test}
        handleSaveAnswer={handleSaveAnswer}
        handleFinishTest={handleFinishTest}
        testSession={testSession}
        question={question}
      />
    );
  }

  if (!isStarted && isFinished) {
    return (
      <TestReview />
    );
  }
}

export default Test;
