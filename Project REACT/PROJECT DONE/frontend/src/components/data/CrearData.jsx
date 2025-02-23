/* eslint-disable no-unused-vars */
import React from "react";
import * as GrIcons from "react-icons/gr";
import * as TiIcons from "react-icons/ti";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

export const CrearData = [
  {
    title: "Empleados",
    path: "/crear/empleados",
    icon: <GrIcons.GrUserManager />,
  },
  {
    title: "Almacenes",
    path: "/crear/almacenes",
    icon: <FaIcons.FaWarehouse />,
  },
  {
    title: "Clientes",
    path: "/crear/clientes",
    icon: <FaIcons.FaUser />,
  },
  {
    title: "Departamentos",
    path: "/crear/departamentos",
    icon: <FaIcons.FaBuilding />,
  },
  {
    title: "Inventarios",
    path: "/crear/inventarios",
    icon: <MdIcons.MdInventory />,
  },
  {
    title: "Productos",
    path: "/crear/productos",
    icon: <FaIcons.FaShoppingCart />,
  },
  {
    title: "Regiones",
    path: "/crear/regiones",
    icon: <TiIcons.TiWorld />,
  },
];
