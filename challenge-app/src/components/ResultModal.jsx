import {useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";

export default function ResultModal({ref, targetTime, timeRemaining, onReset}) {
    const dialog = useRef();
    const isLost = timeRemaining <= 0;
    const formatedTimeRemaining = (timeRemaining/1000).toFixed(2)
    const score = Math.round((1-(timeRemaining / (targetTime * 1000))) * 100)


    // This help to create an API for the Result Modal ref. With this we can change the dialog
    // if we want and we decouple the component
    useImperativeHandle(ref, ()=>{
        return {
            open() {
                dialog.current.showModal()
            }
        }
    })
    // This create portal send the dialog to whatever you send the element.
    return createPortal(
        <dialog ref={dialog} className="result-modal">
            {isLost && <h2>You Lost - Loser</h2>}
            {!isLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong> </p>
            <p>You stopped the timer with <strong>{formatedTimeRemaining} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    )
}