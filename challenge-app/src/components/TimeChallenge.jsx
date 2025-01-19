import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimeChallenge({title, targetTime}) {

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)

    const timer = useRef();
    const dialog = useRef();

    const timeStarted = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining<=0){
        clearInterval(timer.current)
        dialog.current.open()
    }

    function handleStartTime(){
        timer.current = setInterval(()=> {
            setTimeRemaining(prevState => prevState -10)
        }, 10)
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000)

    }

    function handleStop(){
        dialog.current.open()
        clearInterval(timer.current)
    }

    return (
        <>
            <ResultModal
                ref={dialog}
                targetTime={targetTime}
                timeRemaining={timeRemaining}
                onReset={handleReset}
            />
            <section className="challenge">
                <h2>
                    {title}
                </h2>
                <p className="challenge-time"> {targetTime} second{targetTime > 1 ? "s" : ""}</p>
                <button onClick={timeStarted ? handleStop : handleStartTime}>
                    {timeStarted ? "Stop" : "Start"} Challenge
                </button>
                <p className={timeStarted ? "active" : undefined}>
                    {timeStarted ? "Time is running ..." : "Time Inactive"}
                </p>
            </section>
        </>
    )
}