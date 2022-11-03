import { INITIAL_STATE } from "./constants/initialState";

let undoHistory = [];
let redoHistory = [];

function moveHandler(payload, items) {
  const position = payload;
  const newItems = [...items];
  const coor = {
    col: position % 3,
    row: position <= 2 ? 0 : position <= 5 ? 1 : 2,
  };
  const nullPosition = items.indexOf(null);
  const coordNull = {
    col: nullPosition % 3,
    row: nullPosition <= 2 ? 0 : nullPosition <= 5 ? 1 : 2,
  };

  if (Math.abs(coor.row - coordNull.row) + Math.abs(coor.col - coordNull.col) === 1) {
    newItems[nullPosition] = items[position];
    newItems[position] = null;
    console.log(undoHistory);
    undoHistory.push(items);
    console.log(undoHistory);
  }

  return newItems;
}

function arraysEqual(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

const CORRECT = ["1", "2", "3", "4", "5", "6", "7", "8", null];

const shuffle = () => {
  const totalElements = CORRECT.length;
  const positions = Array.from(Array(totalElements)).map((e, i) => i);
  const elements = [...CORRECT];
  let newArr = [];
  do {
    const randomIndex = Math.round(Math.random() * (positions.length - 1));
    newArr[positions[randomIndex]] = elements.pop();
    positions.splice(randomIndex, 1);
  } while (elements.length !== 0);
  return newArr;
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "move":
      const newItems = moveHandler(payload, state.items);
      return { ...state, items: newItems, complete: arraysEqual(newItems, CORRECT) };

    case "shuffle":
      const arr = shuffle();
      undoHistory = [[...arr]];
      return { ...state, items: arr, complete: arraysEqual(arr, CORRECT) };

    case "reset":
      undoHistory = [];
      return {
        ...state,
        items: [...CORRECT],
        complete: true,
      };

    case "undo":
      console.log("redo", redoHistory);
      console.log("undo", undoHistory);
      if (undoHistory.length === 0) return { ...state };
      redoHistory.push([...state.items]);
      const previousState = undoHistory.pop();
      return {
        ...state,
        items: previousState,
        complete: arraysEqual(previousState, CORRECT),
      };

    case "redo":
      console.log("redo", redoHistory);
      console.log("undo", undoHistory);
      if (redoHistory.length === 0) return { ...state };
      const nextState = redoHistory.pop();
      undoHistory.push(state.items);
      return {
        ...state,
        items: nextState,
        complete: arraysEqual(nextState, CORRECT),
      };

    default: {
      throw new Error("Unknown action: " + action.type);
    }
  }
};
