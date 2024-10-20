import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { IoSettings } from "react-icons/io5";
import LogoutButton from "./Logout";

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
        <HiHome className="icon" />
      </Link>
      <Link
        to="/buildResume"
        className={`link ${pathname === "/buildResume" ? "active" : ""}`}
      >
        Build Resume
        <IoSettings className="icon" />
      </Link>

      <div className={`link ${pathname === "/buildResume" ? "active" : ""}`}>
        <LogoutButton />
      </div>
    </nav>
  );
}

export default Nav;
