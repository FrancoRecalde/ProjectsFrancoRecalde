/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/Crear.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import regionesService from "../../services/regiones.service.js";

export const CrearRegiones = () => {
    const [existe, setExiste] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("DATOS DEL FORMULARIO:", data);
        const nuevo = {
            nombre: `${data.nombre}`,
        };
        try {
            await regionesService.postRegiones(data);
            const regiones = await regionesService.getRegiones();
            console.log("Nueva región agregada:", nuevo);
            console.log(regiones);
            navigate("/tablas/regiones");
        } catch (error) {
            console.error("Error al agregar nueva región:", error);
            setExiste(true);
        }
    };

    return (
        <div className="flex items-center justify-center h-[90%] font-bold text-3xl text-yellow-300 ">
            <form
                className="p-3 rounded-2xl items-center flex flex-col shadow-black shadow-2xl bg-[#222]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <span className="w-[100%] items-start text-green-400">
                    <Link
                        to="/crear"
                        className="flex items-center mr-4 mt-1 mb-1 w-[100%]"
                    >
                        <IoIcons.IoIosArrowBack size={64} />
                        Volver
                    </Link>
                </span>
                <div className="m-2">
                    <span>Ingrese un Nombre: </span>
                    <input
                        className="text-black"
                        {...register("nombre", { required: true })}
                    ></input>
                    {errors.nombre && (
                        <p className="text-red-500">El nombre es requerido</p>
                    )}
                </div>
                <span className="flex glow-on-hover w-[300px] justify-center mt-3">
                    <button className="m-5 flex justify-end">
                        Crear Región
                    </button>
                </span>
                {existe ? (
                    <span className="text-red-500">
                        Ocurrio un error al crear la Region
                    </span>
                ) : (
                    <></>
                )}
            </form>
        </div>
    );
};
