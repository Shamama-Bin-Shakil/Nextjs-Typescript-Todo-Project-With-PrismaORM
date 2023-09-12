"use client";
import { Button, ContextProvider } from "@/components/Client";
import "@/style/Header.scss";
import Link from "next/link";
import { useContext } from "react";
const Header = () => {
  const data = useContext(ContextProvider);

  return (
    <nav>
      <div className="logo">
        <h1>My Website</h1>
      </div>
      <div className="menu">
        <Link href="/">Home</Link>

        {data?.user === false ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (<Button />)}
      </div>
    </nav>
  );
};

export default Header;
