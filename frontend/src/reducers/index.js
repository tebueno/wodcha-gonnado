import { combineReducers } from 'redux';
import { wodReducers, wodObjReducers, movementReducers } from 'reducers/wods'

export default combineReducers({
    wods: wodReducers,
    wodObj: wodObjReducers,
    movements: movementReducers,
});