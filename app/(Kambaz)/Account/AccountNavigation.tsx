"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  
  // Type assertion: Explicitly tell TypeScript that currentUser is either
  // an object with _id, role, and username properties, or null when logged out
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: { _id: string; role: string; username: string } | null };

  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();
  return (
    <Nav variant="pills">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={link}
            active={pathname.endsWith(link.toLowerCase())}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
        <NavLink
          as={Link}
          href={`/Account/Users`}
          active={pathname.endsWith("Users")}
        >
          Users
        </NavLink>
      )}
    </Nav>
  );
}
