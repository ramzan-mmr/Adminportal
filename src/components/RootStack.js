import React, { useEffect, useState } from "react";
import Dashboard from './../screens/Dashboard'
import LoginScren from "../screens/Login/LoginScren";
import PageNotFound from "../screens/PageNotFound";
import Hospital from "../screens/Hospital/Hospital";
import Users from "../screens/Users/Users"
import Organ from "../screens/Organ/Organ"
import Donar from "../screens/Donar/Donar"
import RequestbyHos from "../screens/RequestbyHos/RequestbyHos";
import Main from "./main/Main";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Jwt from 'jwt-decode'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom"
import RequestForOrgan from "../screens/RequestForOrgan";
import PortalUser from "../screens/portalUser/PortalUser";


const RootStack = () => {
  const [Role, setRole] = useState([])
  const loggedInUser = localStorage.getItem("token")

  useEffect(() => {
    if (loggedInUser) {
      const userDecode = Jwt(loggedInUser)
      setRole(userDecode.Role)
    }
  }, [])
  return (
    <>
      {!loggedInUser && (
        <Router>
          <Routes>
            <Route path="/" exact element={<LoginScren />} />

            <Route path="/*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      )
      }
      {(Role === "Admin") && (
        <Router>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/hospital" exact element={<Hospital />} />
            <Route path="/donar" exact element={<Donar />} />
            <Route path="/organ" exact element={<Organ />} />
            <Route path="/users" exact element={<Users />} />
            <Route path="/requestbyHos" exact element={<RequestbyHos />} />
            <Route path="/portalUser" exact element={<PortalUser />} />
            <Route path="/*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      )
      }
      {(Role === "Hospital") && (
        <Router>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/donar" exact element={<Donar />} />
            <Route path="/requestbyHos" exact element={<RequestbyHos />} />
            <Route path="/requestForOrgan" exact element={<RequestForOrgan />} />
            <Route path="/*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      )
      }
    </>
  )
}
export default RootStack;