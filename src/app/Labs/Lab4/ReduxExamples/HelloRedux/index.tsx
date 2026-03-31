"use client";

import { useSelector } from "react-redux"; 
import { RootState } from "../../store/store";
export default function HelloReudx() {
    const { message } = useSelector((state: RootState) => state.helloReducer);
    return (
        <div id="wd-hello-redux">
            <h3>Hello Redux</h3>
            <h4>{message}</h4>
            <hr/>
        </div>
    );
}