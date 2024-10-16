import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Nav() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav>
      <Link
        to="/timeline"
        className={`link ${pathname === "/timeline" ? "active" : ""}`}
      >
        Home
      </Link>
      <Link
        to="/buildResume"
        className={`link ${pathname === "/buildResume" ? "active" : ""}`}
      >
        Build Resume
      </Link>
    </nav>
  );
}

export default Nav;
