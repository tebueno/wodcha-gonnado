import { 
    FETCH_WODS, 
    FETCH_WOD_BY_ID,
    CHANGE_WORKOUT_TXT,
    MOVEMENT_SEARCH_TXT,
    REMOVE_MOVEMENT
 } from 'actions/types';
 import movements from 'movements.json';

export const wodReducers = (state = [], action) => {
    switch (action.type) {
        case FETCH_WODS:
            return [...state, ...action.payload]
        default:
            return state
    }
}

export const wodObjReducers = (state = { movements: ['placeholder'] }, action) => {
    switch (action.type) {
        case FETCH_WOD_BY_ID:
            return {...state, ...action.payload }
        case CHANGE_WORKOUT_TXT:
            return { ...state, workout: action.payload }
        case REMOVE_MOVEMENT:
            const filteredMovements = state.movements.filter(movement => movement !== action.payload);
            return { ...state, movements: filteredMovements }
        default:
            return state
    }
}

export const movementReducers = (state = [], action) => {
    switch (action.type) {
        case MOVEMENT_SEARCH_TXT:
            const filteredMovements = movements.filter(elm => {
                return elm.label.toLowerCase().includes(action.payload.toLowerCase())
            }).map(elm => elm.label);

            return filteredMovements;
        default:
            return state;
    }
}

