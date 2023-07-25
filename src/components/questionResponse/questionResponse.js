import React, { useState, useEffect } from "react";
import { api } from "../../api";

function QuestionResponse({ match }) {
  const [questionResponse, setQuestionResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Before API call");
      const response = await api.get(`/questionResponse/`);
      console.log("after API call");
      setQuestionResponse(response.data);
    };

    fetchData();
  }, [match]);

  if (!questionResponse) {
    return <div>Loading questionResponse...</div>;
  }

  return (
    <div>
      <h1>Question Response Details</h1>
      <p>
        <strong>Question:</strong> {questionResponse.question}
      </p>
      <p>
        <strong>Answer one :</strong> {questionResponse.answer_one}
      </p>
      <p>
        <strong>Answer two :</strong> {questionResponse.answer_two}
      </p>
      <p>
        <strong>Answer three:</strong> {questionResponse.answer_three}
      </p>
      <p>
        <strong>Good answer:</strong> {questionResponse.good_answer}
      </p>
      <p>
        <strong>Mark :</strong> {questionResponse.mark}
      </p>
    </div>
  );
}

export default QuestionResponse;
