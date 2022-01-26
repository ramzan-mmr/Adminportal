import "./Sidebar.css";
import organlogo from "../../assets/organlogo.jpg";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import Jwt from 'jwt-decode'
import {AsyncStorage} from 'AsyncStorage'

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const history = useNavigate();
  const [Role, setRole] = useState([])
  const loggedInUser = localStorage.getItem("token")
  const hanldeLogout = () => {
    // window.localStorage.removeItem("token");
    localStorage.clear();
    history('/')
    window.location.reload();
  }
  useEffect(() => {
    if (loggedInUser) {
      const userDecode = Jwt(loggedInUser)
      setRole(userDecode.Role)
      AsyncStorage.setItem('Role',userDecode.Role)
    }
  }, [])
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={organlogo} alt="organlogo" style={{ borderRadius: "50%" }} />
          <h1>Portal</h1>
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>
      {/* Admin Role */}
      {(Role === "Admin") && (
        <div className="sidebar__menu">
          <div className="sidebar__link active_menu_link">
            <i className="fa fa-home"></i>
            <a onClick={() => history('/')} href="#">Dashboard</a>
          </div>

          {/* <h2>Hospital</h2> */}
          <div className="sidebar__link">
            <i className="fa fa-building-o"></i>
            <a onClick={() => history('/hospital')} href="#">Hospital</a>
          </div>

          <div className="sidebar__link">
            <i className="fa fa-building-o"></i>
            <a onClick={() => history('/organ')} href="#">Organ</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-building-o"></i>
            <a onClick={() => history('/donar')} href="#">Donars</a>
          </div>

          <div className="sidebar__link">
            <i className="fa fa-building-o"></i>
            <a onClick={() => history('/requestbyHos')} href="#">Patient Request</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-building-o"></i>
            <a onClick={() => history('/users')} href="#">Application User</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-building-o"></i>
            <a onClick={() => history('/portalUser')} href="#">Portal User</a>
          </div>
          <h2>Report's</h2>

          <div className="sidebar__link">
            <i className="fa fa-question"></i>
            <a href="#">Hospital Report's</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-question"></i>
            <a href="#">User Report's</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-question"></i>
            <a href="#">Register Donar Report's</a>
          </div>

          <div className="sidebar__logout">
            <i className="fa fa-power-off"></i>
            <a onClick={hanldeLogout} href="#">Log out</a>
          </div>
        </div>
      )}
      {/* If hospital login */}
      {(Role === "Hospital") && (
        <div className="sidebar__menu">
          <div className="sidebar__link active_menu_link">
            <i className="fa fa-home"></i>
            <a onClick={() => history('/')} href="#">Dashboard</a>
          </div>

          <div className="sidebar__link">
            <i className="fa fa-building-o"></i>
            <a onClick={() => history('/requestbyHos')} href="#">Patient Request</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-building-o"></i>
            <a onClick={() => history('/donar')} href="#">Donars</a>
          </div>

          <h2>Report's</h2>

          <div className="sidebar__link">
            <i className="fa fa-question"></i>
            <a href="#">Hospital Report's</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-question"></i>
            <a href="#">Register Donar Report's</a>
          </div>

          <div className="sidebar__logout">
            <i className="fa fa-power-off"></i>
            <a onClick={hanldeLogout} href="#">Log out</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
