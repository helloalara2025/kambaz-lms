"use client";

import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs - Table of Contents</h1>

      <h3>Alara H. </h3>
      <h5>CS5610 Web Development - 2025</h5>

      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2: CSS Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab4" id="wd-lab4-link">
            Lab 4: Maintaing State in React Applications
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab5" id="wd-lab5-link">
            Lab 5: Backend
          </Link>
        </li>
        <li>
          <Link href="/Account/Signin">Kambaz</Link>
        </li>
      </ul>
      <h3>Links</h3>
      <ul>
        <li>
          <Link href="/Account/Signin">Kambaz Application</Link>
        </li>
        <li>
          <a href="https://github.com/ellapitts/kambaz-final-front-end" 
          id="wd-github-client-side">
            Ella Pitts and Alara Hakki GitHub Repository - Front End
          </a>
        </li>

        {/* Backend */}
        <li>
          <a
            href="https://github.com/ellapitts?tab=repositories"
            id="wd-github-server-side"
          >
            Backend Repository
          </a>
        </li>


        {/* Mongo */}
        <li>
          <a
            href="https://cloud.mongodb.com/v2/692d3923ef03995c996a7cdf#/explorer/692d3c3b8a52ed5ad1d5d71f/kambaz/users/find"
            id="wd-github-mongo-db-atlas"
          >
            MongoDB Atlas lin
          </a>
        </li>
      </ul>
    </div>
  );
}
