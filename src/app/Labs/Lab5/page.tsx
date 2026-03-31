// Lab 5 page.tsx
import PathParameters from "./PathParameters";
import EnvironmentVariables from "./EnvironmentVariables";
import QueryParmeters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";
import HttpClient from "./HttpClient";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a
          href={`${HTTP_SERVER}/lab5/welcome`} // hyperlink navigates to http://localhost:4000/lab5/welcome
          className="list-group-item"
        >
          Welcome
        </a>
      </div>
      < EnvironmentVariables />
      <PathParameters />
      <QueryParmeters />
      <WorkingWithObjects />
      <WorkingWithArrays />
      <HttpClient />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArraysAsynchronously />
      <hr />
    </div>
  );
}
