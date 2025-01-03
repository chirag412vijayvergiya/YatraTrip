"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavigationClient({ session }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Cabins", href: "/cabins" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      {/* //{" "} */}
      {/* Desktop Navigation */}
      <nav className="z-10 text-xl hidden md:flex">
        <ul className="flex gap-16 items-center">
          <li>
            <Link
              href="/cabins"
              className="hover:text-accent-400 transition-colors"
            >
              Cabins
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-accent-400 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            {session?.user?.image ? (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors flex items-center gap-4"
              >
                <Image
                  className="h-8 rounded-full"
                  src={session.user.image}
                  alt={session.user.name}
                  width={32}
                  height={32}
                  referrerPolicy="no-referrer"
                />
                <span>{session.user.name}</span>
              </Link>
            ) : (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors"
              >
                Guest area
              </Link>
            )}
          </li>
        </ul>
      </nav>
      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-between items-center px-4 py-4 z-10">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-8 h-6 flex flex-col justify-between items-center"
          aria-label="Toggle Menu"
        >
          <span
            className={`block w-full h-1 bg-primary-100 transition-transform ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-full h-1 bg-primary-100 transition-transform ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-full h-1 bg-primary-100 transition-transform ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-10 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-primary-950 text-primary-100 z-20 transition-transform transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-primary-100 hover:text-accent-400"
          aria-label="Close Menu"
        >
          ✕
        </button>

        <ul className="flex flex-col items-center gap-6 py-6 mt-12">
          {navItems.map((item, index) => (
            <li key={index} onClick={() => setMenuOpen(false)}>
              <Link
                href={item.href}
                className="hover:text-accent-400 transition-colors text-lg"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {session?.user?.image && (
            <li onClick={() => setMenuOpen(false)}>
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors flex items-center gap-2"
              >
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full"
                  referrerPolicy="no-referrer"
                />
                <span>{session.user.name}</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
