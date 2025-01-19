import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../questions.js";
import Answers from "./Answers.jsx";
import {useState} from "react";

export default function Question({
                                   indexQuestion,
                                   selectedAnswer,
                                   onClickAnswer,
                                   handleSkip,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  })

  function handleSelectAnswer(answer){
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null
    })

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTIONS[indexQuestion].answers[0]
      })
      setTimeout(()=>{
          onClickAnswer(answer)
        },
        2000)
      }
      ,1000)
  }

  let stateAnswer = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    stateAnswer = answer.isCorrect? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    stateAnswer = 'answered'
  }

  return (
    <div id="question">
      <QuestionTimer
        timeTimer={10000}
        handleTimeOut={handleSkip}/>
      <h2>{QUESTIONS[indexQuestion].text}</h2>
      <Answers
        answers={QUESTIONS[indexQuestion].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={stateAnswer}
        onAnswerClick={handleSelectAnswer}
      />
    </div>
  )
}