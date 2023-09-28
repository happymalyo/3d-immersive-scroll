const counterReducer = (state = 0, action) => {
    switch (action.type) {
      // This reducer handles any action with type "LOGIN"
      case "INCREMENT":
          return state + action.incrementBy ? action.incrementBy : 1
       default:
          return state;
      } 
};

export default counterReducer;