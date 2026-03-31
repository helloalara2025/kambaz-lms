"use client";

import { Provider } from "react-redux";
import store from "../store/store"
import CounterRedux from "./CounterRedux";
import HelloReudx from "./HelloRedux";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
  return (
    <Provider store={store}>
      <div>
        <h2>Redux Examples</h2>
        <HelloReudx />
        <CounterRedux />
        <TodoList />
      </div>
    </Provider>
  );
}
