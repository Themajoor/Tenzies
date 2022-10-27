import React from "react";
import Die from "./Components/Die";
import ReactConfetti from "react-confetti";

function App() {
  const [Tenzies, setTenzies] = React.useState();
  const [startGame, setStartGame] = React.useState(false);
  const [dieSelection, setDieSelection] = React.useState({
    selection: "",
  });
  const styles = {
    display: Tenzies ? "none" : "block",
  };
  const [Dice, setDice] = React.useState([
    {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: Math.random(),
    },
  ]);
  const [notSelected, setnotSelected] = React.useState(false);

  function generateDieObjects() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: Math.random(),
    };
  }
  React.useEffect(() => {
    const allSame = Dice.every((die) => die.isHeld);
    allSame ? setTenzies(true) : setTenzies(false);
  }, [Dice]);

  function GameStarted() {
    if (dieSelection.selection === "") {
      setnotSelected(true);
    } else {
      setStartGame(true);
      setDice(newDice());
    }
  }

  function rollDice() {
    if (!Tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateDieObjects();
        })
      );
    }
  }

  function newDice() {
    const newDice = [];
    for (let i = 0; i < dieSelection.selection; i++) {
      newDice.push(generateDieObjects());
    }
    return newDice;
  }
  function startOver() {
    setStartGame(false);
    setnotSelected(false);
  }

  function holdClick(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return id === die.id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function generateDieElements() {
    const dieElements = Dice.map((item) => (
      <Die
        onClick={() => holdClick(item.id)}
        isHeld={item.isHeld}
        key={item.id}
        value={item.value}
      />
    ));
    return dieElements;
  }

  function goBack() {
    setStartGame(false);
    setTenzies(false);
  }
  function playAgain() {
    setStartGame(true);
    setDice(newDice());
  }

  function handleSelection(event) {
    const { name, value } = event.target;
    setDieSelection(() => {
      return { [name]: value };
    });
    setnotSelected(false);
  }
  return (
    <main>
      {!startGame & !notSelected && (
        <div className="homepage">
          <div className="homepage-info">
            <h1>Tenzies</h1>
            <p>
              Roll the dice until all the numbers are the same. Click each die
              to freeze the number between rolls
            </p>
          </div>
          <fieldset>
            <legend>Choose Number of Dice</legend>
            <label>
              <input
                onChange={handleSelection}
                value="10"
                type="radio"
                name="selection"
                checked={dieSelection.selection === "10"}
              />
              10
            </label>
            <label>
              <input
                onChange={handleSelection}
                value="20"
                type="radio"
                name="selection"
                checked={dieSelection.selection === "20"}
              />
              20
            </label>
            <label>
              <input
                onChange={handleSelection}
                value="30"
                type="radio"
                name="selection"
                checked={dieSelection.selection === "30"}
              />
              30
            </label>
          </fieldset>
          <button onClick={GameStarted}>Start Game</button>
        </div>
      )}
      {startGame && (
        <div className="container">
          <div className="die-container">{generateDieElements()}</div>
          <button style={styles} onClick={rollDice}>
            {" "}
            {!Tenzies ? "Roll Again" : ""}{" "}
          </button>
          <button onClick={goBack}>Go back</button>
        </div>
      )}
      {notSelected && (
        <div className="warning">
          <h1>Please select the number of dice</h1>
          <button style={styles} onClick={startOver}>
            Go back
          </button>
        </div>
      )}
      {Tenzies && (
        <div className="winner-popup">
          <h1>🎉 You Won 🎉</h1>
          <button onClick={playAgain}>Play Again</button>
          <button onClick={goBack}>Go Back</button>
        </div>
      )}
      {Tenzies && <ReactConfetti />}
    </main>
  );
}

export default App;
