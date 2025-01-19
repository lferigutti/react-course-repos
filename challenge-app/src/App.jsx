import Player from './components/Player.jsx';
import TimeChallenge from "./components/TimeChallenge.jsx";

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
          <TimeChallenge title="Easy" targetTime={1} />
          <TimeChallenge title="Medium" targetTime={3} />
          <TimeChallenge title="Hard" targetTime={7} />
          <TimeChallenge title="Insane" targetTime={10} />
      </div>
    </>
  );
}

export default App;
