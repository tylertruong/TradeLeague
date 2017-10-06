import { FETCH_STOCKS } from '../actions/index';

export default (state = [], action) => {
  switch (action.type) {
  case FETCH_STOCKS:
    return action.payload.data;
  }
  return state;
};