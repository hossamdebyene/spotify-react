import { combineReducers } from "redux";
import { tokeningReducer, artistReducer } from './access'

const allReducres = combineReducers({
    tokening: tokeningReducer,
    artist: artistReducer,

});
export default allReducres;