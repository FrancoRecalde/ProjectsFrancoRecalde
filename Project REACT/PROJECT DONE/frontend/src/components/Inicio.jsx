/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { FaTable } from "react-icons/fa";

export const Inicio = () => {
  return (
    <div className="flex flex-row justify-evenly items-center h-[90%] bg-gradient-to-br from-[#ff9bd5] to-[#0E86D4]">
      <Link
        to="/crear"
        className="grid-item glow-on-hover font-bold text-3xl h-[30%] w-[30%]"
      >
        <IoMdAddCircle />
        <span>Crear</span>
      </Link>
      <Link
        to="/tablas"
        className="grid-item glow-on-hover font-bold text-3xl h-[30%] w-[30%]"
      >
        <FaTable />
        <span>Tablas</span>
      </Link>
    </div>
  );
};
