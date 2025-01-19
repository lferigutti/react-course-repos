import QUESTIONS from "../questions.js";
import {useRef} from "react";

export default function Answers({answers, selectedAnswer, answerState, onAnswerClick}) {

  const shuffledAnswers = useRef();
  if (!shuffledAnswers.current){
    shuffledAnswers.current = [...answers]
    shuffledAnswers.current.sort(()=>Math.random() - 0.5)
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
          let clsName = ''
          const isSelected = answer === selectedAnswer

          if (answerState === '') {
            clsName = ''
          }

          if (isSelected && answerState === 'answered') {
            clsName = 'selected'
          }
          if (isSelected && (answerState === 'correct' || answerState === 'wrong')) {
            clsName = answerState
          }
          return (
            <li key={answer} className="answer">
              <button
                className={clsName}
                onClick={() =>onAnswerClick(answer)}
                disabled={answerState !== ''}>
                {answer}
              </button>
            </li>
          )

        }
      )}
    </ul>
  )
}