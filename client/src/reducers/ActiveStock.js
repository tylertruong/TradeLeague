export default (state = null, action) => {
  
  switch (action.type) {
  case 'STOCK_SELECTED':
    return stock.payload;
  }

  return state;
};