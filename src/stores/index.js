import { combineReducers, createStore} from "redux";
import useReducerAuth from "./modules/auth";
import useReducerLoading from "./modules/loading";

const rootReducer = combineReducers({
    auth: useReducerAuth,
    loading: useReducerLoading
});

export default createStore(rootReducer);