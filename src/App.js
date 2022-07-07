import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import Dice from "./components/Dice";
import Scoreboard from "./components/Scoreboard";

function App() {
  const [allDice, setAllDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [counter, setCounter] = useState(0);
  const [startCount, setStartCount] = useState(false);

  const [userStats, setUserStats] = useState(
    () => JSON.parse(localStorage.getItem("stats")) || []
  );

  useEffect(() => {
    if (startCount && !tenzies) {
      setTimeout(() => setCounter(counter + 1), 1000);
    }
  }, [counter, startCount]);

  useEffect(() => {
    sortUserStats();
    if (userStats.length > 5) trimStats();
    localStorage.setItem("stats", JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    // checkTenzie();
    const firstValue = allDice[0].value;
    const allTruths = allDice.every(
      (die) => die.value === firstValue && die.isHeld
    );
    if (allTruths) {
      setStartCount(false);
      setTenzies(true);
      saveUserStats();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDice]);

  function trimStats() {
    setUserStats((prevStats) => {
      const newArr = [];
      for (let i = 0; i < 5; i++) {
        newArr.push(prevStats[i]);
      }
      return newArr;
    });
  }

  function allNewDice() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(generateNewDie());
    }
    return arr;
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function sortUserStats() {
    setUserStats((prevStats) => {
      return prevStats.sort((a, b) => {
        return a.time - b.time;
      });
    });
  }

  function rollDice() {
    getDate();
    if (!tenzies) {
      if (!startCount) setStartCount(true);
      setRolls((prevRolls) => prevRolls + 1);
      setAllDice((oldDice) =>
        oldDice.map((dice) => {
          return !dice.isHeld ? generateNewDie() : dice;
        })
      );
    } else {
      // setStartCount(true);
      setCounter(0);
      setAllDice(allNewDice());
      setRolls(0);
      setTenzies(false);
    }
  }

  function saveUserStats() {
    const newScore = {
      rolls: rolls,
      time: counter,
      id: nanoid(),
      date: getDate(),
    };
    setUserStats((oldStats) => [
      ...oldStats,
      {
        ...newScore,
      },
    ]);
  }

  function holdDice(id) {
    if (!tenzies) {
      setStartCount(true);
    }
    setAllDice((oldDice) =>
      oldDice.map((dice) => {
        return dice.id === id
          ? {
              ...dice,
              isHeld: !dice.isHeld,
            }
          : dice;
      })
    );
  }

  function getDate() {
    const finalDate = new Date();

    return `${finalDate.getDay()}/${finalDate.getMonth()}/${finalDate.getFullYear()}`;
  }

  // getDate();
  // localStorage.clear("stats");

  const diceElements = allDice.map((item) => (
    <Dice
      key={item.id}
      value={item.value}
      isHeld={item.isHeld}
      holdDice={() => holdDice(item.id)}
    />
  ));

  const scoreElements = userStats.map((item) => (
    <Scoreboard
      key={item.id}
      rolls={item.rolls}
      time={item.time}
      date={item.date}
    />
  ));

  return (
    <main>
      <div className="main--body">
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="rolls-time">
          <p className="rolls">
            Rolls: <span className="rolls--num">{rolls}</span>
          </p>
          <p className="rolls">
            Time: <span className="rolls--num">{counter}</span> seconds
          </p>
        </div>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-button" onClick={rollDice}>
          {!tenzies ? "Roll" : "New Game"}
        </button>
        <Scoreboard header={true} rolls="Rolls" time={"Time"} date="Date" />
        {scoreElements}
      </div>
    </main>
  );
}

export default App;
