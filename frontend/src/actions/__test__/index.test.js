import * as actions from 'actions';
import * as types from 'actions/types'
import fetchMock from 'fetch-mock';
import reduxPromise from 'redux-promise';
import configureMockStore from 'redux-mock-store';
import testData from 'testData/fetchWodsResp';

const middlewares = [reduxPromise]
const mockStore = configureMockStore(middlewares)

describe('Test action for changing workout description: changeWorkoutTxt()', () => {
    it('has correct type', () => {
        const action = actions.changeWorkoutTxt();
        expect(action.type).toEqual(types.CHANGE_WORKOUT_TXT);
    });
    it('has correct payload', () => {
        const workoutTxt = '20 Thrusters';
        const action = actions.changeWorkoutTxt(workoutTxt);
        expect(action.payload).toEqual(workoutTxt);
    })
});

describe('Test action for removing a movement from wodObj: removeMovement()', () => {
    it('has correct type', () => {
        const action = actions.removeMovement();
        expect(action.type).toEqual(types.REMOVE_MOVEMENT);
    });
    it('has correct payload', () => {
        const movement = 'thruster';
        const action = actions.removeMovement(movement);
        expect(action.payload).toEqual(movement);
    })
});

describe('Test action to search for a movement: searchMovements()', () => {
    it('has correct type', () => {
        const action = actions.searchMovements();
        expect(action.type).toEqual(types.MOVEMENT_SEARCH_TXT);
    });
    it('has correct payload', () => {
        const searchTxt = 'abc';
        const action = actions.searchMovements(searchTxt);
        expect(action.payload).toEqual(searchTxt);
    })
});

describe('Test async action for getting wods by page numebr: fetchWods()', () => {
    afterEach(() => fetchMock.restore());

    it('has correct type and payload', () => {
        fetchMock.getOnce('http://localhost/api/wods/all?size=15&page=1', testData);
        const store = mockStore({});

        return store.dispatch(actions.fetchWods(1)).then(() => {
            const response = store.getActions()[0];
            expect(response.type).toEqual(types.FETCH_WODS);

            response.payload.forEach((item, i) => expect(item).toEqual(testData[i]));
        });
    });

    it('handles error response', () => {
        fetchMock.getOnce('http://localhost/api/wods/all?size=15&page=1', 404);

        const store = mockStore({});

        return store.dispatch(actions.fetchWods(1)).then(() => {
            const response = store.getActions()[0];
            expect(response.type).toEqual(types.FETCH_WODS_ERROR);
            expect(response.payload).toEqual('error while executing fetchWods() action: FetchError: invalid json response body at http://localhost/api/wods/all?size=15&page=1 reason: Unexpected end of JSON input');

        })

    })
})

describe('Test async action for getting wods by Id: fetchWodById()', () => {
    afterEach(() => fetchMock.restore());

    it('has correct type and payload', () => {
        const mockResponse = testData[0];
        const { _id: wodId } = mockResponse;
        fetchMock.getOnce(`http://localhost/api/wods/${wodId}`, mockResponse);

        const store = mockStore({});

        return store.dispatch(actions.fetchWodById(wodId)).then(() => {
            const response = store.getActions()[0];
            expect(response.type).toEqual(types.FETCH_WOD_BY_ID);

            expect(response.payload).toEqual(mockResponse);

        })
    })

    it('handles error response', () => {
        fetchMock.getOnce('http://localhost/api/wods/5c0747cf9b78ae203b86fa6f', 404);

        const store = mockStore({});

        return store.dispatch(actions.fetchWodById('5c0747cf9b78ae203b86fa6f')).then(() => {
            const response = store.getActions()[0];
            expect(response.type).toEqual(types.FETCH_WODS_BY_ID_ERROR);
            expect(response.payload).toEqual('error while executing fetchWodById() action: FetchError: invalid json response body at http://localhost/api/wods/5c0747cf9b78ae203b86fa6f reason: Unexpected end of JSON input');

        })

    })
})