export const tokeningReducer = (state = null, action, data) => {
    switch (action.type) {
      case "TOKENING":
        return action.payload;
  
      default:
        return state;
    }
  };
export const artistReducer = (state = null, action, data) => {
    switch (action.type) {
      case "ARTIST":
        return action.payload;
  
      default:
        return state;
    }
  };