import { useLocation, useNavigate } from "react-router-dom";
import "./currentTest.scss";
import { useEffect, useState } from "react";
import { api } from "../../api";
import logo from "../../assets/FINAALLRR.png";
import { Checkbox } from "@mui/material";
import Button from "@mui/material/Button";

export default function CurrentTest() {
  const navigate = useNavigate();
  const location = useLocation();
  const myTestId = location.state?.testId;
  const [technicalTest, setTechnicalTest] = useState({});
  const [responses, setResponses] = useState({});
  useEffect(() => {
    let currentResp = responses;
    technicalTest.questions?.forEach((element, index) => {
      currentResp[index] = null;
      setResponses(currentResp);
    });
  }, [technicalTest]);
  const getData = async () => {
    const response = await api.get(`/userTest/${myTestId}`);
    console.log(response.data);
    setTechnicalTest(response.data.techTest);
  };
  useEffect(() => {
    if (!location.state?.testId) {
      console.log("error to show");
      navigate("/dashboardCandidate/passTest");
    } else {
      getData();
    }
  }, [location]);
  async function checkAndSendData() {
    try {
      let currentMark = 0;
      technicalTest.questions?.forEach((element, index) => {
        console.log("check question");
        if (element.good_answer === responses[index]) {
          console.log("good answer");
          console.log(element.mark);
          currentMark += element.mark;
        }
      });
      const response = await api.put(`/userTest/${myTestId}`, {
        mark: currentMark,
      });
      navigate("/dashboardCandidate/passTest");
    } catch (error) {
      console.log(error);
    }
  }
  if (technicalTest.title) {
    return (
      <div className="currentTest-container">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="title">{technicalTest.title}</div>
        <br></br>
        <div className="questions">
          {technicalTest.questions.map((element, key) => {
            return (
              <div className="question" key={key}>
                <div className="statement">
                  {key + 1} : {element.question}
                </div>
                <div className="response">
                  <Checkbox
                    checked={responses[key] === element.answer_one}
                    onChange={() => {
                      setResponses({ ...responses, [key]: element.answer_one });
                    }}
                  />
                  {element.answer_one}
                </div>
                <div className="response">
                  <Checkbox
                    checked={responses[key] === element.answer_two}
                    onChange={() => {
                      setResponses({ ...responses, [key]: element.answer_two });
                    }}
                  />
                  {element.answer_two}
                </div>
                <div className="response">
                  <Checkbox
                    checked={responses[key] === element.answer_three}
                    onChange={() => {
                      setResponses({
                        ...responses,
                        [key]: element.answer_three,
                      });
                    }}
                  />
                  {element.answer_three}
                </div>
              </div>
            );
          })}
        </div>
        <Button
          className="button"
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={checkAndSendData}
        >
          Envoyer
        </Button>
      </div>
    );
  }
  return <div>loading</div>;
}
