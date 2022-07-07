import diceOne from "../images/diceOne.png";
import diceTwo from "../images/diceTwo.png";
import diceThree from "../images/diceThree.png";
import diceFour from "../images/diceFour.png";
import diceFive from "../images/diceFive.png";
import diceSix from "../images/diceSix.png";

function Dice(props) {
  const imgArray = [diceOne, diceTwo, diceThree, diceFour, diceFive, diceSix];
  return (
    <>
      <div
        onClick={props.holdDice}
        className={`dice-box   ${props.isHeld ? "isHeld" : ""}`}
      >
        <img
          className="dice--image"
          src={imgArray[props.value - 1]}
          alt="die"
        />
        {/* <h2 className="die-num">{props.value}</h2> */}
      </div>
    </>
  );
}

export default Dice;
