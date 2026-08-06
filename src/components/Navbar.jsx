import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FiLogOut } from "react-icons/fi";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    let userName = "My Account";

    if (token) {

        try {

            const decoded = jwtDecode(token);

            if (decoded.sub) {

                userName = decoded.sub
                    .split("@")[0]
                    .replace(/[._-]/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase());

            }

        } catch (error) {

            console.error("Invalid token:", error);

        }

    }

    const handleLogout = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <nav className="navbar">

            <div className="navbar-container">

                {/* Logo */}

                <NavLink
                    to="/dashboard"
                    className="navbar-brand"
                >

                    <div className="brand-icon">
                        🔗
                    </div>

                    <div className="brand-text">

                        <span className="brand-name">
                            Shorturl
                        </span>

                        <span className="brand-tagline">
                            URL Manager
                        </span>

                    </div>

                </NavLink>

                {/* Navigation */}

                <ul className="nav-links">

                    <li>

                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            <span className="nav-icon">
                                ⌂
                            </span>

                            Dashboard

                        </NavLink>

                    </li>

                    <li>

                        <NavLink
                            to="/create"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            <span className="nav-icon">
                                ＋
                            </span>

                            Create URL

                        </NavLink>

                    </li>

                    <li>

                        <NavLink
                            to="/my-urls"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            <span className="nav-icon">
                                ↗
                            </span>

                            My URLs

                        </NavLink>

                    </li>

                </ul>

                {/* User Section */}

                <div className="navbar-user">

                    <div className="user-avatar">

                        {userName.charAt(0)}

                    </div>

                    <div className="user-info">

                        <span className="user-name">

                            {userName}@gmail.com

                        </span>

                        <span className="user-status">

                            <span className="status-dot"></span>

                            Online

                        </span>

                    </div>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >  
                    <FiLogOut size={18} />
                     <span>Logout</span>
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;