"use client";

import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs" style={{ padding: 24 }}>
      <h5>CS5610 Alara Hakki — Lab Exercises and TOC</h5>

      <ul>
        <li>
          <Link href="/Kambaz" id="wd-kambaz-link">
            Kambaz (Main App)
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab4" id="wd-lab4-link">
            Lab 4
          </Link>
        </li>
      </ul>
    </div>
  );
}