"use client";
import React, { useContext } from "react";
import Header from "./Header";
import { AiOutlineHome } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import { SiHelpscout } from "react-icons/si";
import { FiPhoneCall } from "react-icons/fi";

import Link from "next/link";
import { MenuContext } from "@/context/MenuContext";
import SideNavbar from "./SideNavbar";
const MainLayout = ({ children }) => {
  const { open } = useContext(MenuContext);
  return (
    <div className="bg-gray-100 w-screen min-h-screen">
      <div className="flex justify-start items-start ">
        <SideNavbar />
        <aside
          className={`bg-white rounded-lg overflow-hidden transition  duration-200 ${
            open ? "w-60 p-4" : "w-0"
          } lg:w-60 lg:p-4`}
        >
          <ul>
            <li className="flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
              <AiOutlineHome className="mr-2" />
              <Link href="/">Profile</Link>
            </li>
          </ul>
        </aside>
        <main className="flex-1 ">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
