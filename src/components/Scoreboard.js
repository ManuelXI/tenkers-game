function Scoreboard(props) {
  return (
    <>
      <div
        className="score-board"
        style={{
          color: props.header ? "black" : "#76818d",
          marginBottom: props.header ? "15px" : "10px",
        }}
      >
        <p>{props.rolls}</p>
        <p id="scoreboard--time">
          {props.time} {!props.header && "seconds"}
        </p>
        <p>{props.date}</p>
      </div>
    </>
  );
}

export default Scoreboard;
