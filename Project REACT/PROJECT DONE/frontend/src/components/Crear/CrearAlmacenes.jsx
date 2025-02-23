/* eslint-disable no-unused-vars */
import React, { lazy, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "../styles/Crear.css";
import { Link, useNavigate } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import almacenesService from "../../services/almacenes.service.js";
import regionesService from "../../services/regiones.service.js";
import empleadosService from "../../services/empleados.service.js";
import Select from "react-select";

const customStyles = {
    container: (provided) => ({
        ...provided,
        width: 300,
    }),
    control: (provided) => ({
        ...provided,
        minHeight: 40,
    }),
    menu: (provided) => ({
        ...provided,
        width: 300,
    }),
};

export const CrearAlmacenes = () => {
    const [regiones, setRegiones] = useState([]);
    const [jefes, setJefes] = useState([]);
    const [existe, setExiste] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const reg = await regionesService.getRegiones();
            setRegiones(reg);
            const jef = await empleadosService.getEmpleados();
            setJefes(jef);
        };
        getData();
    }, []);

    const regionOptions = regiones.map((r) => ({
        value: r.id,
        label: r.nombre,
    }));

    const jefeOpions = jefes.map((j) => ({
        value: j.id_jefe,
        label: j.nombre + " " + j.apellido,
    }));

    const onSubmit = async (data) => {
        console.log("DATOS DEL FORMULARIO:", data);
        const nuevo = {
            id_region: data.id_region.value,
            direccion: data.direccion,
            cod_postal: data.cod_postal,
            telefono: data.telefono,
            id_jefe: data.id_jefe.value,
        };
        try {
            await almacenesService.postAlmacenes(nuevo);
            const almacenes = await almacenesService.getAlmacenes();
            console.log("Nuevo almacen agregado:", nuevo);
            console.log(almacenes);
            navigate("/tablas/almacenes");
        } catch (error) {
            console.error("Error al agregar nuevo almacen:", error);
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
                <div className="m-2 flex flex-row w-[100%] justify-center text-black">
                    <span className="w-[40%] text-yellow-300">
                        Seleccione una región:{" "}
                    </span>
                    <Controller
                        name="id_region"
                        control={control}
                        defaultValue={null}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={regionOptions}
                                isSearchable
                                styles={customStyles}
                                onChange={(option) => field.onChange(option)}
                            />
                        )}
                    />
                    {errors.id_region && (
                        <p className="text-red-500">La región es requerida</p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese una Direccion: </span>
                    <input
                        className="text-black"
                        {...register("direccion", {
                            required: "Dirección es requerida",
                            maxLength: 200,
                        })}
                    ></input>
                    {errors.direccion && (
                        <p className="text-red-500 text-2xl text-center">
                            {errors.direccion.message}
                        </p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese un Codigo Postal: </span>
                    <input
                        className="text-black"
                        {...register("cod_postal", {
                            required: "Código Postal es requerido",
                            pattern: {
                                value: /^[0-9]{4,5}$/g,
                                message:
                                    "Código Postal debe ser de 4 o 5 numeros",
                            },
                        })}
                    ></input>
                    {errors.cod_postal && (
                        <p className="text-red-500 text-2xl text-center">
                            {errors.cod_postal.message}
                        </p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese un Telefono: </span>
                    <input
                        className="text-black"
                        {...register("telefono", {
                            required: "Teléfono es requerido",
                            pattern: {
                                value: /^[+][0-9]{2}[-][0-9]{3}[-][0-9]{3,4}[-][0-9]{3,4}$/g,
                                message: "Teléfono debe ser un número",
                            },
                        })}
                    ></input>
                    {errors.telefono && (
                        <p className="text-red-500 text-2xl text-center">
                            {errors.telefono.message}
                        </p>
                    )}
                </div>
                <div className="m-2 flex flex-row w-[100%] justify-center text-black">
                    <span className="w-[28%] text-yellow-300">
                        Seleccione jefe:{" "}
                    </span>
                    <Controller
                        name="id_jefe"
                        control={control}
                        defaultValue={null}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={jefeOpions}
                                isSearchable
                                styles={customStyles}
                                onChange={(option) => field.onChange(option)}
                            />
                        )}
                    />
                    {errors.id_jegion && (
                        <p className="text-red-500">El jefe es requerido</p>
                    )}
                </div>
                <span className="flex glow-on-hover w-[300px] justify-center mt-3">
                    <button className="m-5 flex justify-end ">
                        Crear Almacen
                    </button>
                </span>
                {existe ? (
                    <span className="text-red-500">
                        Ocurrio un error al crear el Almacen
                    </span>
                ) : (
                    <></>
                )}
            </form>
        </div>
    );
};
