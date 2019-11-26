import {combineReducers} from 'redux';
import useUndo from './useUndo'

const rootReducer = combineReducers({
  useUndo,
})

export default rootReducer