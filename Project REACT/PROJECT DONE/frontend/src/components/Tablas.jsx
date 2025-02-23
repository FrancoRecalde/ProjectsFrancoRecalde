/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "./styles/Tablas.css";
import { TablasData } from "./data/TablasData";
import * as IoIcons from "react-icons/io";

export const Tablas = () => {
  return (
    <>
      <div className="flex flex-row justify-around items-center">
      <Link
        to="/"
        className="text-[5rem] text-center font-bold flex flex-row"
      >
        <IoIcons.IoIosArrowBack size={64} className="mt-[35px]" />
        <span>Volver</span>
      </Link>
      <div className="text-[5rem] text-center font-bold mt-3">Tablas</div>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 w-[70%] h-[75%] inset-0 m-auto mt-2">
        {TablasData.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.path}
              className="grid-item glow-on-hover font-bold text-3xl"
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};
