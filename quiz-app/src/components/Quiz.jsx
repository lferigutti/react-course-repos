import QUESTIONS from "../questions.js"
import {useCallback, useState} from "react";
import trophyImage from "../assets/quiz-complete.png"
import Question from "./Question.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([])

  const indexQuestion = userAnswers.length
  const isQuizComplete = indexQuestion === QUESTIONS.length


  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer){
    setUserAnswers((prevState)=> {
        return [...prevState, answer]
      })
    }
    , []);


  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null)
  }, [handleSelectAnswer]);

  if (isQuizComplete) {
    return (
      <div id="summary">
        <img src={trophyImage} alt="Trophy "/>
        <h2> Quiz Complete </h2>
      </div>
    )
  }

  return (
    <div id="quiz">
      <Question
      key={indexQuestion}
      indexQuestion = {indexQuestion}
      onClickAnswer={handleSelectAnswer}
      handleSkip={handleSkipAnswer}
      />
    </div>
  );
}