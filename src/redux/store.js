import { createStore, applyMiddleware } from "redux";
import { logActionOnDispatch } from "./enhancers";
import thunkMiddleware from "redux-thunk";

const initialState = {
  searchPanelVisible: true,
  historyPanelVisible: true,
  placeHistory: [],
};

const reducer = (state = initialState, action) => {
  // Clone the current state
  const newState = {
    ...state,
    // Don't forget to deep-clone members too
    placeHistory: [...state.placeHistory],
  };

  // Determine next state
  switch (action.type) {
    case "history/place_added":
      if (action.payload && action.payload.place) {
        newState.placeHistory = [
          action.payload.place,
          ...newState.placeHistory,
        ];
      }
      break;

    case "history/place_removed":
      if (action.payload && action.payload.index >= 0) {
        newState.placeHistory.splice(action.payload.index, 1);
      }
      break;

    case "history/all_place_removed":
      newState.placeHistory = [];
      break;

    case "history_panel_toggled":
      newState.historyPanelVisible = !state.historyPanelVisible;
      break;

    default:
      break;
  }
  return newState;
};

export default createStore(reducer, initialState, logActionOnDispatch);
