import { useReducer } from "react";
import { INITIAL_STATE } from "../constants/initialState";
import { reducer } from "../reducer";
import Confetti from "react-confetti";

import "./Puzzle.css";

const Puzzle = () => {
  const [state, dispatch] = useReducer(reducer, {
    items: INITIAL_STATE,
  });

  return (
    <div className="Puzzle">
      <div>
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
          <button
            className="button-85 reset-button"
            role="button"
            onClick={() => dispatch({ type: "shuffle" })}
          >
            Shuffle
          </button>
          <button className="button-85 shuffle-button" onClick={() => dispatch({ type: "reset" })}>
            Reset
          </button>
        </div>
        <div className="Puzzle-controls">
          <button className="Puzzle-undo" onClick={() => dispatch({ type: "undo" })}>
            Undo
          </button>
          <button className="Puzzle-redo" onClick={() => dispatch({ type: "redo" })}>
            Redo
          </button>
        </div>
        {state.complete && <Confetti />}
      </div>
    </div>
  );
};

export default Puzzle;
