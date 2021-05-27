import { createStore } from "redux";

import { codeReducer, getInitialState } from "./reducers/codeReducer";

const store = createStore(codeReducer, getInitialState());

export default store;
