"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();

  return (
    <Nav variant="pills">
      <NavItem>
        <span className="navbar-brand">Links</span>
      </NavItem>
    </Nav>
  );
}
