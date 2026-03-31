"use client";

export default function ClickEvent() {
  const hello = () => { // declare a function to handle the event
    alert("Hello, World!");
  };
  const lifeIs = (good: string) => {
    alert(`Life is ${good}`);
  };
  return (
    <div id="wd-click-event">
      <h2>Click Event</h2>
      <button onClick={hello} id="wd-hello-world-click"> 
        Hello World!
      </button>
      <button onClick={() => lifeIs("Good!")} id="wd-life-is-good-click">
        Life is Good!
      </button>
      <button
        onClick={() => {
          hello();
          lifeIs("Great!");
        }}
        id="wd-life-is-great-click"
      >
        Life is Great!
      </button>
      <hr />
    </div>
  );
}
