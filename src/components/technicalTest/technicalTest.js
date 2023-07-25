import React, { useState, useEffect } from "react";
import { api } from "../../api";

function TechnicalTest({ match }) {
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchTest = async () => {
      const response = await api.get(`/techTest/`);
      setTest(response.data);
    };
    fetchTest();
  }, [match]);

  if (!test) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{test.title}</h1>
      <ul>
        {questions.map((questionId) => (
          <li key={questionId}>
            <Question questionId={questionId} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Question({ questionId }) {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await api.get(`/questions/${questionId}`);
      setQuestion(response.data);
    };
    fetchQuestion();
  }, [questionId]);

  if (!question) {
    return <div>Loading question...</div>;
  }

  return <div>{question.text}</div>;
}

export default TechnicalTest;
