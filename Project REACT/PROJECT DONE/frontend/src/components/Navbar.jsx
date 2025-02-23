/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as TfiIcons from "react-icons/tfi";
import { SidebarData } from "./data/SidebarData";
import "./styles/Navbar.css";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar-custom navbar-expand-lg sticky-top container-fluid">
          <div className="container-fluid">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? (
                <TfiIcons.TfiClose size={30} />
              ) : (
                <TfiIcons.TfiMenu size={30} />
              )}
            </button>
          </div>
          <Link to="/registro" className="navbar-custom px-2">
            <AiIcons.AiOutlineUserAdd size={30} />
          </Link>
          <Link to="/inicio-sesion" className="navbar-custom px-2">
            <AiIcons.AiOutlineUser size={30} />
          </Link>
          <Link to="/" className="navbar-custom px-2">
            <AiIcons.AiFillHome size={30} />
          </Link>
        </div>
        <nav className={sidebarOpen ? "nav-menu active" : "nav-menu"}>
          <ul
            className="nav-menu-items"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <TfiIcons.TfiClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};
