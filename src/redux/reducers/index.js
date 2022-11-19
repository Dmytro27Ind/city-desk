import { combineReducers } from "redux";
import language from "./language";
import coord from './coord'
import auth from "./auth";
import userId from "./userId";
import postCoord from "./postCoord";
import filter from "./filter";

const allReducers = combineReducers({
    language: language,
    coord: coord,
    auth: auth,
    userId: userId,
    postCoord: postCoord,
    filter: filter
});
export default allReducers;
