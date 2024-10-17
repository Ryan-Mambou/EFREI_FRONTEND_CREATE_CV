import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { IoSettings } from "react-icons/io5";

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
    </nav>
  );
}

export default Nav;
