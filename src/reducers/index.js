import { combineReducers } from 'redux'

const defaultState = {}

function exampleReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case 'EXAMPLE':
      return payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
  example: exampleReducer
});

export default rootReducer
