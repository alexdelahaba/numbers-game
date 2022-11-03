import { useReducer } from "react";
import { INITIAL_STATE } from "../constants/initialState";
import { reducer } from "../reducer";

import "./Puzzle.css";

const Puzzle = () => {
  const [state, dispatch] = useReducer(reducer, {
    items: INITIAL_STATE,
  });

  return (
    <div className="Puzzle">
      <div className="Puzzle-squares">
        {state.items.map((s, i) => (
          <div
            className={`Puzzle-square ${s ? "" : "Puzzle-square-empty"}`}
            key={`square-${i}`}
            onClick={() => dispatch({ type: "move", payload: i })}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="Puzzle-controls">
        <button className="Puzzle-shuffle" onClick={() => dispatch({ type: "shuffle" })}>
          Shuffle
        </button>
        <button className="Puzzle-reset" onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
      </div>
      <div className="Puzzle-controls">
        <button className="Puzzle-undo" onClick={() => dispatch({ type: "undo" })}>
          Undo
        </button>
        <button className="Puzzle-undo" onClick={() => dispatch({ type: "redo" })}>
          Redo
        </button>
      </div>
      {state.complete && <div className="Puzzle-complete">Complete!</div>}
    </div>
  );
};

export default Puzzle;
