import { UPDATE_VALUE } from "./action.js";

//Reducer
const initialState = {
  calculateValue: 0,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_VALUE:
      return {
        ...state,
        calculateValue: action.payload,
      };
    default:
      return state;
  }
}
