import { 
  FETCH_WODS, 
  FETCH_WOD_BY_ID,
  CHANGE_WORKOUT_TXT,
  MOVEMENT_SEARCH_TXT,
  REMOVE_MOVEMENT,
} from 'actions/types';

export const fetchWods = page => {
  // TODO: need to find a way to have 'size' be a config param? What do other apps do?

  let payload = fetch(`http://localhost/api/wods/all?size=15&page=${page}`)
    .then(response => response.json())
    .then(data => {

     return data.map(entry => {
        return {
          id: entry._id,
          wod: entry.workout.replace(/\n\n\n|\n\n/g, '')
        };
      }); 
    })
    .catch((err) => {
      console.error(`error while executing fetchWods() action: ${err}`)
    });

    return {
        type: FETCH_WODS,
        payload: payload,
      } 
};

export const fetchWodById = id => {
  let payload = fetch(`http://localhost/api/wods/${id}`)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => console.error(`error while executing fetchWodById() action: ${err}`))

    return {
      type: FETCH_WOD_BY_ID,
      payload: payload,
    }
}

export const changeWorkoutTxt = text => {
  return {
    type: CHANGE_WORKOUT_TXT,
    payload: text,
  }
}

export const removeMovement = movement => {
  return {
    type: REMOVE_MOVEMENT,
    payload: movement,
  }
}

export const searchMovements = searchText => {
  return {
    type: MOVEMENT_SEARCH_TXT,
    payload: searchText,
  }
}
