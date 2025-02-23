/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import "../styles/Crear.css";
import { Link, useNavigate } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import empleadosServices from "../../services/empleados.service.js";
import departamentosService from "../../services/departamentos.service.js";

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

export const CrearEmpleados = () => {
    const [existe, setExiste] = useState(false);
    const [deptos, setDeptos] = useState([]);
    const [jefes, setJefes] = useState([]);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const dep = await departamentosService.getDeptos();
            setDeptos(dep);
            const jef = await empleadosServices.getEmpleados();
            setJefes(jef);
        };
        getData();
    }, []);

    const deptoOptions = deptos.map((r) => ({
        value: r.id,
        label: r.id + " " + r.nombre,
    }));
    const jefeOptions = jefes.map((r) => ({
        value: r.id,
        label: r.nombre + " " + r.apellido,
    }));

    const onSubmit = async (data) => {
        console.log("DATOS DEL FORMULARIO:", data);
        const nuevo = {
            nombre: data.nombre,
            apellido: data.apellido,
            id_usuario: data.id_usuario,
            fecha_ingreso: data.fecha_ingreso,
            comentarios: data.comentarios,
            id_jefe: data.id_jefe.value,
            depto_id: data.depto_id.value,
            salario: data.salario,
            porcent_comission: data.porcent_comission,
        };
        try {
            await empleadosServices.postEmpleados(nuevo);
            const empleados = await empleadosServices.getEmpleados();
            console.log("Nuevo empleado agregado:", nuevo);
            console.log(empleados);
            navigate("/tablas/empleados");
        } catch (error) {
            console.error("Error al agregar nuevo empleado:", error);
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
                            maxLength: 30,
                        })}
                    ></input>
                    {errors.nombre && (
                        <p className="text-red-500">El nombre es requerido</p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese un Apellido: </span>
                    <input
                        className="text-black"
                        {...register("apellido", {
                            required: "El apellido es requerido",
                            maxLength: 30,
                        })}
                    ></input>
                    {errors.apellido && (
                        <p className="text-red-500">El apellido es requerido</p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese un ID Usuario: </span>
                    <input
                        className="text-black"
                        type="Number"
                        {...register("id_usuario", {
                            required: "El id de usuario es requerido",
                            min: 1,
                        })}
                    ></input>
                    {errors.id_usuario && (
                        <p className="text-red-500">
                            El id de usuario es requerido
                        </p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese un Fecha de Ingreso: </span>
                    <input
                        className="text-black"
                        type="date"
                        {...register("fecha_ingreso", {
                            required: "La fecha de ingreso es requerida",
                        })}
                    ></input>
                    {errors.fecha_ingreso && (
                        <p className="text-red-500">
                            La fecha de ingreso es requerida
                        </p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese un Comentarios </span>
                    <input
                        className="text-black"
                        {...register("comentarios", {
                            required: "Los comentarion requeridos",
                            pattern: {
                                value: /^[^0-9]*$/,
                                message:
                                    "No se permiten números en los comentarios",
                            },
                        })}
                    ></input>
                </div>
                <div className="m-2 flex flex-row w-[100%] justify-center text-black">
                    <span className="w-[25%] text-yellow-300">Seleccione jefe: </span>
                    <Controller
                        name="id_jefe"
                        control={control}
                        defaultValue={null}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={jefeOptions}
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
                <div className="m-2 flex flex-row w-[100%] justify-center text-black">
                    <span className="w-[40%] text-yellow-300">Seleccione departamento: </span>
                    <Controller
                        name="depto_id"
                        control={control}
                        defaultValue={null}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={deptoOptions}
                                isSearchable
                                styles={customStyles}
                                onChange={(option) => field.onChange(option)}
                            />
                        )}
                    />
                    {errors.id_jegion && (
                        <p className="text-red-500">
                            El departamento es requerido
                        </p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese el Salario: </span>
                    <input
                        className="text-black"
                        {...register("salario", {
                            required: "El salario es requerido",
                            min: 100,
                        })}
                    ></input>
                    {errors.salario && (
                        <p className="text-red-500">El salario es requerido</p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese un Porcentaje de Comision: </span>
                    <input
                        className="text-black"
                        {...register("porcent_comission", {
                            required: "El porcentaje de comision es requerido",
                            min: 0,
                            max: 100,
                        })}
                    ></input>
                    {errors.porcent_comission && (
                        <p className="text-red-500">
                            El porcentaje de comision es requerido num{"<"}100
                        </p>
                    )}
                </div>

                <span className="flex glow-on-hover w-[300px] justify-center mt-3">
                    <button className="m-5 flex justify-end ">
                        Crear empleado
                    </button>
                </span>
            </form>
        </div>
    );
};
