import { combineReducers, createStore } from "redux";

/* Create reducer */
// const initialState = {
//   count: 50,
//   posts: [
//     { id: 1, title: "About Redux" },
//     { id: 2, title: "About Hooks" },
//   ],
// };
// const reducer = (state = initialState) => {
//   return state;
// };

const countReducer = (
  state = {
    count: 40,
  }
) => {
  return state;
};

const postsReducer = (
  state = {
    posts: [
      { id: 3, title: "Reduxについて" },
      { id: 4, title: "ReduxのHooksについて" },
    ],
  }
) => {
  return state;
};

const rootReducer = combineReducers({
  countReducer,
  postsReducer,
});

/* Create store */
const store = createStore(rootReducer);
console.log(store.getState());

export default store;
