import * as types from 'actions/types';

export const fetchWods = page => {
  // TODO: need to find a way to have 'size' be a config param? What do other apps do?
  // TODO: remove endpoint hardcoding

  let response = fetch(`http://localhost/api/wods/all?size=15&page=${page}`)
    .then(response => response.json())
    .then(data => {
      return { 
        type: types.FETCH_WODS, 
        payload: data 
      };
    })
    .catch((err) => {
      return { type: types.FETCH_WODS_ERROR, payload: `error while executing fetchWods() action: ${err}` };
    });

    return response;
};

export const fetchWodById = id => {
  let response = fetch(`http://localhost/api/wods/${id}`)
    .then(resp => resp.json())
    .then(resp => {
      return {
        type: types.FETCH_WOD_BY_ID,
        payload: resp,
      }
    })
    .catch(err => { 
      return { type: types.FETCH_WODS_BY_ID_ERROR, payload: `error while executing fetchWodById() action: ${err}` }
    });

    return response
}

export const changeWorkoutTxt = text => {
  return {
    type: types.CHANGE_WORKOUT_TXT,
    payload: text,
  }
}

export const removeMovement = movement => {
  return {
    type: types.REMOVE_MOVEMENT,
    payload: movement,
  }
}

export const searchMovements = searchText => {
  return {
    type: types.MOVEMENT_SEARCH_TXT,
    payload: searchText,
  }
}
