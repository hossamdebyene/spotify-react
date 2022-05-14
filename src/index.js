import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import { createStore } from "redux";
import allReducres from "./reducers";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");

    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log("", e);
    return undefined;
  }
}
const persistedState = loadFromLocalStorage();
const store = createStore(
  allReducres,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(({
    trace: true,
    traceLimit: 25
  }))
);
store.subscribe(() => saveToLocalStorage(store.getState()));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
