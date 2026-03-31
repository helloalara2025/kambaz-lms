import { useState } from "react";
import { FormControl } from "react-bootstrap";

export default function DateStateVariable() {
    
  const [startDate, setStartDate] = useState(new Date()); // declare and intialize with today/s 10/22/2025 date
  const dateObjectToHtmlDateString = (date: Date) => { // utility function to convert date to object

     return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ""}${
      date.getMonth() + 1
    }-${date.getDate() + 1 < 10 ? 0 : ""}${date.getDate() + 1}`;
  };

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>

      {/* display raw date object. Changed from prof's code to avoid Hydration Error (mistmatch of server to client data) */}
      <h3>{startDate.toString()}</h3>

      {/* display of YYYY-MM-DDformat for input of type data */}
      <h3>{dateObjectToHtmlDateString(startDate)}</h3>
      {/* set HTML input type to date */}
      <FormControl
        type="date"
        defaultValue={dateObjectToHtmlDateString(startDate)} /* set HTML input type to date */
        onChange={(e) => setStartDate(new Date(e.target.value))}  /* update when you change the date with the date picker*/
      />

      <hr />
    </div>
  );
}
