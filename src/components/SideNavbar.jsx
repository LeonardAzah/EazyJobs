"use client";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { MdOutlineAnalytics } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { SiHelpscout } from "react-icons/si";
import { FiPhoneCall } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
function SideNavbar() {
  return (
    <Disclosure as="nav">
      <Disclosure.Button className="absolute  right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
        <GiHamburgerMenu
          className="block md:hidden h-6 w-6"
          aria-hidden="true"
        />
      </Disclosure.Button>
      <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
        <div className="flex flex-col justify-start item-center">
          <div className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
            <Image src="/images/img.jfif" width={120} height={10} />
          </div>
          <div className=" my-4 border-b border-gray-100 pb-4">
            <Link href="/">
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Profile
                </h3>
              </div>
            </Link>
            <Link href="/jobs">
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Jobs
                </h3>
              </div>
            </Link>
            <Link href="/applied-jobs">
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <FaCheck className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Applied Jobs
                </h3>
              </div>
            </Link>
          </div>
          <div className=" my-4 border-b border-gray-100 pb-4">
            <Link href="/about-us">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <SiHelpscout className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  About us
                </h3>
              </div>
            </Link>
          </div>
          <div className=" my-4">
            <Link href="contact-us">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <FiPhoneCall className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Contact us
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}

export default SideNavbar;
