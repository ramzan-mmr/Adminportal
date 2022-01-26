import "./Navbar.css";
import avatar from "../../assets/avatar.svg";
import { useEffect, useState } from "react";
import Jwt from 'jwt-decode'
import { AsyncStorage } from 'AsyncStorage';

const Navbar = ({ sidebarOpen, openSidebar }) => {
  const loggedInUser = localStorage.getItem("token")
  const [Role, setRole] = useState("")
  useEffect(()=>{
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
        <a href="#!">
          <img width="30" src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
