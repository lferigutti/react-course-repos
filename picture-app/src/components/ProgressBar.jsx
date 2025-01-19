import {useEffect, useState} from "react";

export default function ProgressBar({timer}) {
  const [timeRemaining, setTimeRemaining] = useState(timer)

  useEffect(() => {
    const interval = setInterval(()=> {
      setTimeRemaining((prevTime) => prevTime - 10)
    }, 10)

    return () => {
      clearInterval(interval)
    }
  }, []);

  return (
    <>
      <p>Removing...</p>
      <progress value={timer - timeRemaining} max={timer}/>
    </>
  )
}