/* eslint-disable no-unused-vars */
import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Inicio",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text item-slide",
  },
  {
    title: "Crear",
    path: "/crear",
    icon: <IoIcons.IoIosAddCircleOutline />,
    cName: "nav-text item-slide",
  },
  {
    title: "Tablas",
    path: "/tablas",
    icon: <IoIcons.IoIosList />,
    cName: "nav-text item-slide",
  },
];
