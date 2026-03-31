"use client";

import { Provider } from "react-redux";
import store from "./store/store";
import ReduxExamples from "./ReduxExamples/page";

import ClickEvent from "./ClickEvent";
import PassingDataOnEvents from "./PassingDataOnEvents";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
export const dynamic = 'force-dynamic';
export default function Lab4() {
  function sayHello() {
    // implement callback function
    alert("Hello!");
  }
  return (
    <Provider store={store}>
      <div>
        <h2>Lab 4 </h2>
        <ReduxExamples />
        <ClickEvent />
        <PassingDataOnEvents />
        <PassingFunctions theFunction={sayHello} />
        <EventObject />
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
      </div>
    </Provider>
  );
}
