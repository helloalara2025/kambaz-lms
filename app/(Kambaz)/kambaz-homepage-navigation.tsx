// Kambaz Navigation Sidebar Component
// Provides main navigation links for the Kambaz app
// Includes links to sections: Account, Dashboard, Courses, Calendar, Inbox, and Labs

"use client";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaCogSolid, LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import {usePathname } from 'next/navigation';

export default function KambazNavigation() {
  const pathname= usePathname();

  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Courses", icon: LiaBookSolid},
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  return (
    <ListGroup 
    id="wd-kambaz-navigation" 
    style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      >
      {/* Northeastern University Link */}
      <ListGroupItem 
      id="wd-neu-link" 
      target="_blank" 
      href="https://www.northeastern.edu/"
        action 
        className="bg-black border-0 text-center"> 
        <img src="/images/NEU.png" width={75} alt="Northeastern University logo" />
        </ListGroupItem>

      {/* Account */}
           <ListGroupItem
        as={Link}
        href="/Account"
        className={`text-center border-0 ${
          pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${
            pathname.includes("Account") ? "text-danger" : "text-white"
          }`}
        />
        <br />
        Account
      </ListGroupItem>

      {/* Dynamic Links */}
      {links.map((link) => (
        <ListGroupItem
          key={link.path}
          as={Link}
          href={link.path}
          className={`text-center border-0 ${
            pathname.includes(link.label) ? "bg-white text-danger" : "bg-black text-white"
          }`}
        >
          <link.icon
            className={`fs-1 ${
              pathname.includes(link.label) ? "text-danger" : "text-white"
            }`}
          />
          <br />
          {link.label}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}