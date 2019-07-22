export default (state = [], action) => {
  //maintain a list of posts we fetch from the json api
  // if (action.type === 'FETCH_POSTS') {
  //   return action.payload;
  // }

  // return state;

  //This is typically handled in a switch instead of a massive if else tree
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload;
    default: 
      return state;
  }
};