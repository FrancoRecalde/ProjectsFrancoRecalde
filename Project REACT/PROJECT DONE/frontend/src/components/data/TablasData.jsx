/* eslint-disable no-unused-vars */
import React from "react";
import * as GrIcons from "react-icons/gr";
import * as TiIcons from "react-icons/ti";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

export const TablasData = [
  {
    title: "Empleados",
    path: "/tablas/empleados",
    icon: <GrIcons.GrUserManager />,
  },
  {
    title: "Almacenes",
    path: "/tablas/almacenes",
    icon: <FaIcons.FaWarehouse />,
  },
  {
    title: "Clientes",
    path: "/tablas/clientes",
    icon: <FaIcons.FaUser />,
  },
  {
    title: "Departamentos",
    path: "/tablas/departamentos",
    icon: <FaIcons.FaBuilding />,
  },
  {
    title: "Inventarios",
    path: "/tablas/inventarios",
    icon: <MdIcons.MdInventory />,
  },
  {
    title: "Productos",
    path: "/tablas/productos",
    icon: <FaIcons.FaShoppingCart />,
  },
  {
    title: "Regiones",
    path: "/tablas/regiones",
    icon: <TiIcons.TiWorld />,
  },
];
