import { GET_PORTFOLIO } from '../actions/index';

export default (state = [], action) => {
  switch (action.type) {
  case GET_PORTFOLIO:
    return action.payload;
  }
  return state;
};

