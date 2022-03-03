import "./Navbar.css";
import avatar from "../../assets/avatar.svg";
import { useEffect, useRef, useState } from "react";
import Jwt from 'jwt-decode'
import { AsyncStorage } from 'AsyncStorage';
import { useDetectOutsideClick } from "./../useDetectOutsideClick";
import { useNavigate } from "react-router-dom"


const Navbar = ({ sidebarOpen, openSidebar }) => {
  const history = useNavigate();
  const loggedInUser = localStorage.getItem("token")
  const [Role, setRole] = useState("")
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const hanldeLogout = () => {
    // window.localStorage.removeItem("token");
    localStorage.clear();
    history('/')
    window.location.reload();
  }
  useEffect(() => {
    AsyncStorage.getItem('Role', (err, result) => {
      setRole(result)
    })
  })
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">

        <a className="active_link" href="#">
          {Role === "Admin" ? "Admin" : "Hospital"}
        </a>
      </div>
      <div className="navbar__right">
        <a href="#">
          <i className="fa fa-search search-form " aria-hidden="true" >
            <input
              type="text"
              placeholder="Search"

            />
          </i>
        </a>
        <a href="#">
          <i className="fa fa-clock-o" aria-hidden="true"></i>
        </a>
        <a>
          {/* <img width="30" src={avatar} alt="avatar" /> */}
          <div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
              <span>User</span>
              <img
                src={avatar}
                alt="User avatar"
                style={{width:25}}
              />
            </button>
            <nav
              ref={dropdownRef}
              className={`menu ${isActive ? "active" : "inactive"}`}
            >
              <ul>
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <a href="#" style={{color:"red"}} onClick={hanldeLogout} >Logout</a>
                </li>
              </ul>
            </nav>
          </div>
        </a>
      </div>
    </nav>
  );
};
export default Navbar;
