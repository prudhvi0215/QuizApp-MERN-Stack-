import React from "react";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = () => {
  const [ques, setQues] = useState({});
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState();
  const difficulty = useRef(5);
  const questionCount = useRef(1);
  const navigate = useNavigate();

  async function fetchQuestions() {
    await axios("http://localhost:3001/admin/questions", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        let questionsSet = [...res.data];
        localStorage.setItem("questions", JSON.stringify(questionsSet));
      })
      .catch((err) => {
        console.log(err);
      });

    getQuestion();
  }

  function handleClick() {
    getAnswer();
  }

  function getAnswer() {
    let scoreArray = JSON.parse(localStorage.getItem("scoreBoard"));

    if (questionCount.current >= 10) {
      scoreArray.push(score);
      return navigate("/result/chart", { state: score });
    } else {
      if (ques.correctOption.value === answer) {
        if (difficulty.current === 10) {
          scoreArray.push(score + 5);
          navigate("/result/chart", { state: score + 5 });
          return;
        }
        scoreArray.push(score + 5);
        setScore(score + 5);
        difficulty.current = difficulty.current + 1;
      } else {
        if (difficulty.current === 1) {
          scoreArray.push(score - 2);
          navigate("/result/chart", { state: score - 2 });
          return;
        }
        scoreArray.push(score - 2);
        setScore(score - 2);
        difficulty.current = difficulty.current - 1;
      }
      getQuestion();
      questionCount.current = questionCount.current + 1;
    }

    localStorage.setItem("scoreBoard", JSON.stringify(scoreArray));
  }

  async function getQuestion() {
    // to make sure that the randomly generated question is of given difficulty
    while (true) {
      let questions = JSON.parse(localStorage.getItem("questions"));
      let currentQuestion =
        questions[Math.floor(Math.random() * questions.length)];
      // to make sure that the randomly generated question is of given difficulty
      if (currentQuestion.difficulty == difficulty.current) {
        setQues(currentQuestion);
        setOptions(currentQuestion.options);
        return;
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (
      localStorage.getItem("scoreBoard") == null ||
      JSON.parse(localStorage.getItem("scoreBoard")).length >= 0
    ) {
      localStorage.setItem("scoreBoard", JSON.stringify([]));
    }
    fetchQuestions();
  }, []);

  return (
    <>
      <div className="adminNavbar">
        <h1>User Dashboard</h1>
        <a onClick={handleLogout}>Logout</a>
      </div>
      <div className="questionBox">
        <div className="scoreBoard">
          <h3>Question: {questionCount.current}</h3>
          <h3>Difficulty: {ques.difficulty}</h3>
          <h3>CurrentScore: {score}</h3>
        </div>
        <h2>{ques.title}</h2>
        <div className="optionsBox">
          <div>
            <input
              type="radio"
              name="selectOption"
              onChange={(e) => setAnswer(e.target.value)}
              value={options[0]?.value}
              checked={answer == options[0]?.value}
            />
            <label>{options[0]?.value}</label>
          </div>
          <div>
            <input
              type="radio"
              name="selectOption"
              onChange={(e) => setAnswer(e.target.value)}
              value={options[1]?.value}
              checked={answer == options[1]?.value}
            />
            <label>{options[1]?.value}</label>
          </div>
          <div>
            <input
              type="radio"
              name="selectOption"
              onChange={(e) => setAnswer(e.target.value)}
              value={options[2]?.value}
              checked={answer == options[2]?.value}
            />
            <label>{options[2]?.value}</label>
          </div>
          <div>
            <input
              type="radio"
              name="selectOption"
              onChange={(e) => setAnswer(e.target.value)}
              value={options[3]?.value}
              checked={answer == options[3]?.value}
            />
            <label>{options[3]?.value}</label>
          </div>
        </div>
        <button onClick={handleClick}>Submit</button>
      </div>
    </>
  );
};

export default questions;
