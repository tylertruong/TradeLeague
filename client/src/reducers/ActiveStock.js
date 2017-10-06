export default (state = null, action) => {
  
  switch (action.type) {
  case 'STOCK_SELECTED':
    return action.payload;
  }

  return state;
};