import * as types from 'actions/types';
import movements from 'movements.json';

export const wodReducers = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_WODS:
            const cleanData = action.payload.map(entry => {
                return {
                    id: entry._id,
                    wod: entry.workout.replace(/\n\n\n|\n\n/g, '')
                };
            });
            return [...state, ...cleanData]
        case types.FETCH_WODS_ERROR:
            console.error(action.payload);
            return state
        default:
            return state
    }
}

export const wodObjReducers = (state = { movements: ['placeholder'] }, action) => {
    switch (action.type) {
        case types.FETCH_WOD_BY_ID:
            return {...state, ...action.payload }
        case types.FETCH_WODS_BY_ID_ERROR:
            console.error(action.payload);
            return state;
        case types.CHANGE_WORKOUT_TXT:
            return { ...state, workout: action.payload }
        case types.REMOVE_MOVEMENT:
            const filteredMovements = state.movements.filter(movement => movement !== action.payload);
            return { ...state, movements: filteredMovements }
        default:
            return state
    }
}

export const movementReducers = (state = [], action) => {
    switch (action.type) {
        case types.MOVEMENT_SEARCH_TXT:
            const filteredMovements = movements.filter(elm => {
                return elm.label.toLowerCase().includes(action.payload.toLowerCase())
            }).map(elm => elm.label);
            return filteredMovements;
        default:
            return state;
    }
}

