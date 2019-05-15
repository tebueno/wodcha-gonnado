import * as reducers from 'reducers/wods';
import * as combinedReducers from 'reducers';
import * as types from 'actions/types';
import testData from 'testData/fetchWodsResp';
import expectedResults from 'testData/expectedFetchWods';

describe('Test reducer used for displaying wods: wodReducers()',() => {
    it('Handles action type FETCH_WODS',() => {
        const action =  { 
            type: types.FETCH_WODS,
            payload: testData
        };
        const response = reducers.wodReducers([], action);
        response.forEach((val, index) => expect(val).toEqual(expectedResults[index]));
    });

    it('Handles action type FETCH_WODS_ERROR',() => {
        const action = {
            type: types.FETCH_WODS_ERROR,
            payload: 'Some stupid error message',
        };
        const output = reducers.wodReducers([], action);
        // TODO: add assertion for console.error()
        expect(output).toEqual([]);
    });
    it('Handles unknown action type',() => {
        const action = { type: 'meh' };
        const output = reducers.wodReducers(undefined, action);
        expect(output).toEqual([]);
    });
});

describe('Test reducer used for displaying wods: wodObjReducers()',() => {
    it('Handles action type FETCH_WOD_BY_ID',() => {
        const action =  { 
            type: types.FETCH_WOD_BY_ID,
            payload: { id: '123', workout: 'blah' }
        };
        const output = reducers.wodObjReducers({}, action);
        expect(output).toEqual(action.payload);
    });

    it('Handles action type FETCH_WOD_BY_ID_ERROR',() => {
        const action = {
            type: types.FETCH_WODS_BY_ID_ERROR,
            payload: 'Some stupid error message',
        };
        const output = reducers.wodObjReducers({}, action);
        // TODO: add assertion for console.error()
        expect(output).toEqual({});
    });

    it('Handles action type CHANGE_WORKOUT_TXT',() => {
        const action =  { 
            type: types.CHANGE_WORKOUT_TXT,
            payload: 'workout text'
        };
        const output = reducers.wodObjReducers({}, action);
        expect(output).toEqual({ workout: action.payload });
    });

    it('Handles action type REMOVE_MOVEMENT',() => {
        let initState = { movements: ['pullup'] };
        const action =  { 
            type: types.REMOVE_MOVEMENT,
            payload: 'pullup'
        };
        const output = reducers.wodObjReducers(initState, action);
        expect(output.movements).toEqual([]);
    });

    it('Handles unknown action type',() => {
        const action = { type: 'meh' };
        const output = reducers.wodObjReducers(undefined, action);
        expect(output).toEqual({ movements: ['placeholder']});
    });
});

describe('Test reducer used for displaying wods: movementReducers()',() => {
    it('Handles action type MOVEMENT_SEARCH_TXT',() => {
        const action =  { 
            type: types.MOVEMENT_SEARCH_TXT,
            payload: '1 Arm Suitcase Walk'
        };
        const output = reducers.movementReducers([], action);
        expect(output).toEqual(['1 Arm Suitcase Walk']);
    });

    it('Handles special character searches',() => {
        const action =  { 
            type: types.MOVEMENT_SEARCH_TXT,
            payload: 'Single Arm High-pull'
        };
        const output = reducers.movementReducers([], action);
        expect(output).toEqual(['Single Arm High-pull']);
    });

    it('Handles case insentitive character searches',() => {
        const action =  { 
            type: types.MOVEMENT_SEARCH_TXT,
            payload: 'Single Arm high-puLl'
        };
        const output = reducers.movementReducers([], action);
        expect(output).toEqual(['Single Arm High-pull']);
    });

    it('Handles unknown action type',() => {
        const action = { type: 'meh' };
        const output = reducers.movementReducers(undefined, action);
        expect(output).toEqual([]);
    });
});