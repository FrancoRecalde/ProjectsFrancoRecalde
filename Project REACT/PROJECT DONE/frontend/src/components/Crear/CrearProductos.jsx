/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/Crear.css";
import { Link, useNavigate } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import productosService from "../../services/productos.service.js";

export const CrearProductos = () => {
    const [existe, setExiste] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("DATOS DEL FORMULARIO:", data);
        const nuevo = {
            nombre: `${data.nombre}`,
            descripcion: `${data.descripcion}`,
            precioSugerido: `${Number(data.precioSugerido)}`,
            unidades: `${Number(data.unidades)}`,
        };
        try {
            await productosService.postProductos(data);
            const productos = await productosService.getProductos();
            console.log("Nuevo producto agregado:", nuevo);
            console.log(productos);
            navigate("/tablas/productos");
        } catch (error) {
            console.error("Error al agregar nuevo producto:", error);
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
                        {...register("nombre", {
                            required: "El nombre es requerido",
                        })}
                    ></input>
                    {errors.nombre && (
                        <p className="text-red-500">El nombre es requerido</p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese una Descripcion: </span>
                    <input
                        className="text-black"
                        {...register("descripcion", {
                            required: "La descripcion es requerida",
                        })}
                    ></input>
                    {errors.descripcion && (
                        <p className="text-red-500">
                            La Descripcion es requerida
                        </p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese un Precio Sugerido: </span>
                    <input
                        className="text-black"
                        type="Float"
                        {...register("precioSugerido", {
                            required: "El precio es requerido",
                            min: 0,
                        })}
                    ></input>
                    {errors.precioSugerido && (
                        <p className="text-red-500">
                            El precio sugerido es requerido
                        </p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese las Unidades: </span>
                    <input
                        className="text-black"
                        type="Number"
                        {...register("unidades", {
                            required: "Las unidades son requeridas",
                            min: 0,
                        })}
                    ></input>
                    {errors.unidades && (
                        <p className="text-red-500">La unidad es requerida</p>
                    )}
                </div>

                <span className="flex glow-on-hover w-[300px] justify-center mt-3">
                    <button className="m-5 flex justify-end ">
                        Crear Producto
                    </button>
                </span>
                {existe ? (
                    <span className="text-red-500">
                        Ocurrio un error al crear el Producto
                    </span>
                ) : (
                    <></>
                )}
            </form>
        </div>
    );
};
