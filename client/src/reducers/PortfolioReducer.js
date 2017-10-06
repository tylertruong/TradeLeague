import { GET_PORTFOLIO } from '../actions/index';

export default (state = [], action) => {
  switch (action.type) {
  case GET_PORTFOLIO:
    if (!action.payload.data) {
      return state;
    }
    return action.payload.data;
  }
  return state;
};

