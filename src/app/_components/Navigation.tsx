"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ACTIVE_ROUTE = "bg-green-700";
const INACTIVE_ROUTE = "";
const authenticatedNavigationItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Meal Plan", href: "/meal-plan" },
  { name: "About", href: "/about" },
];
const noAUth = [ { name: "About", href: "/about" }, { name: "Sign in", href: "/" }];
const signout_ = (
  <li key="signout">
    <button onClick={() => signOut()} className="px-4 py-2 rounded  text-white cursor-pointer">
      Sign out
    </button>
  </li>
);

const Navigation = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  let navigationItems = session ? authenticatedNavigationItems : noAUth;

  let navArray = navigationItems.map((item) => {
    return (
      <li key={item.name}>
        <Link
          href={item.href}
          className={`px-4 py-2 rounded cursor-pointer ${
            pathname === item.href ? ACTIVE_ROUTE : INACTIVE_ROUTE
          }`}
        >
          {item.name}
        </Link>
      </li>
    );
  });
  
  session ? navArray.push(signout_):'';

  return (
    <ul className="flex space-x-6 justify-center items-center">
      {navArray}
      {session && (
        <li className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src={session?.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-white"
            />
            <span>{session?.user?.name}</span>
          </button>
        </li>
      )}
    </ul>
  );
};

export default Navigation;
