"use client";

import { useState } from "react";
import React from "react";

export default function EventObject() {
 const [event, setEvent] = useState(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
 const handleClick = (e: any) => {
  e.target = e.target.outerHTML;
  delete e.view;
  setEvent(e);
};

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={(e) => handleClick(e)}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr />
    </div>
  );
}
