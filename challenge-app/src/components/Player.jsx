import {useRef, useState} from "react";

export default function Player() {
    const [playerName, setPlayerName] = useState()
    const playerInput = useRef();

    function handlePlayerName(){
        setPlayerName(playerInput.current.value)
        console.log(playerInput)
    }


    return (
    <section id="player">
      <h2>Welcome {playerName ?? "unknown entity"}</h2>
      <p>
        <input
            type="text"
            ref={playerInput}
        />
        <button onClick={handlePlayerName}>Set Name</button>
      </p>
    </section>
  );
}
