import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ loggedInUser }) => {
  return (
    <div className="navComponent">
      <div className="navContainer p-3">
        <div className="logo">
          <Link to="/">
            <img src="/src/assets/logo.png" alt="Logo" />
          </Link>
          <Link to="/">
            <h2>TaskDuty</h2>
          </Link>
        </div>
        {loggedInUser ? (
          <div className="menu">
            <nav>
              <ul>
                <li>
                  <Link to={"newtask"} className="navlink">
                    New Task
                  </Link>
                </li>
                <li>
                  <Link to={"mytasks"} className="navlink">
                    All Tasks
                  </Link>
                </li>
                <li className="fs-4">
                  Hi, {loggedInUser?.username}
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div className="d-flex gap-3 align-items-center">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
