import {useEffect, useState} from "react";

export default function QuestionTimer({timeTimer, handleTimeOut}) {
  const [timeRemaining, setTimeRemaining] = useState(timeTimer)

  useEffect(() => {
    const timer = setTimeout(()=>{
      handleTimeOut()
      },
      timeTimer)
    return ()=>clearTimeout(timer)
  }, [timeTimer, handleTimeOut]);

  useEffect(() => {
    const interval = setInterval(()=> {
      setTimeRemaining((prevState)=> prevState - 10)
      },
      10)
    return () => {
      clearInterval(interval)
    }
  }, []);

  return (
    <progress id="question-time" value={timeRemaining} max={timeTimer} />
  )
}