"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();

  return (
    <Nav variant="pills">
      <NavItem>
        <span className="navbar-brand">KAMBAZ</span>
        <NavLink
          href="/Labs"
          className={`nav-link${pathname.endsWith("Labs") ? " active" : ""}`}
        >
          Labs
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="/Labs/Lab1"
          className={`nav-link${pathname.endsWith("Lab1") ? " active" : ""}`}
        >
          Lab 1
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="/Labs/Lab2"
          className={`nav-link${pathname.endsWith("Lab2") ? " active" : ""}`}
        >
          Lab 2
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="/Labs/Lab3"
          className={`nav-link${pathname.endsWith("Lab3") ? " active" : ""}`}
        >
          Lab 3
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="/Labs/Lab4"
          className={`nav-link${pathname.endsWith("Lab4") ? " active" : ""}`}
        >
          Lab 4
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="/Labs/Lab5"
          className={`nav-link${pathname.endsWith("Lab5") ? " active" : ""}`}
        >
          Lab 5
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/Account/Signin">Kambaz</NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="https://github.com/helloalara2025/kambaz-next-js">
          Frontend Repository
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="https://github.com/helloalara2025/kambaz-node-server-app">
          Server Repository
        </NavLink>
      </NavItem>
    </Nav>
  );
}
