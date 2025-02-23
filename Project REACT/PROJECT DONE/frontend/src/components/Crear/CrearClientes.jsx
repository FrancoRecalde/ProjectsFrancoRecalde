/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "../styles/Crear.css";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import clientesService from "../../services/clientes.service";
import empleadosService from "../../services/empleados.service";
import regionesService from "../../services/regiones.service";

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

export const CrearClientes = () => {
    const estados = [
        { id: 1, nombre: "activo" },
        { id: 2, nombre: "no activo" },
    ];
    const [existe, setExiste] = useState(false);
    const [vendedor, setVendedor] = useState([]);
    const [region, setRegion] = useState([]);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const ven = await empleadosService.getEmpleados();
            setVendedor(ven);
            const reg = await regionesService.getRegiones();
            setRegion(reg);
        };
        getData();
    }, []);

    const onSubmit = async (data) => {
        console.log("DATOS DEL FORMULARIO:", data);
        const nuevo = {
            nombre: data.nombre,
            telefono: data.telefono,
            direccion: data.direccion,
            ciudad: data.ciudad,
            estado: data.estado,
            pais: data.pais,
            cod_postal: data.cod_postal,
            calificacion_CREDITO: data.calificacion_CREDITO,
            id_vendedor: data.id_vendedor.value,
            id_region: data.id_region.value,
            comentarios: data.comentarios,
        };
        try {
            await clientesService.postClientes(nuevo);
            const clientes = await clientesService.getClientes();
            console.log("Nuevo cliente agregado:", nuevo);
            console.log(clientes);
            navigate("/tablas/clientes");
        } catch (error) {
            console.error("Error al agregar nuevo cliente:", error);
            setExiste(true);
        }
    };

    const vendOptions = vendedor.map((ven) => ({
        value: ven.id,
        label: ven.nombre + " " + ven.apellido,
    }));
    const regionOptions = region.map((r) => ({
        value: r.id,
        label: r.nombre,
    }));

    return (
        <div className="flex items-center justify-center h-[90%] font-bold text-3xl text-yellow-300">
            <form
                className="rounded-2xl items-center flex flex-col shadow-black shadow-2xl bg-[#222] w-[60%] p-4"
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
                <div className="m-2 flex-row flex justify-around">
                    <span>Ingrese un Nombre: </span>
                    <input
                        className="text-black"
                        {...register("nombre", {
                            required: "El nombre es requerido",
                            maxLength: 20,
                        })}
                    ></input>
                    {errors.nombre && (
                        <div className="text-red-500 text-2xl text-center pl-2">
                            {errors.nombre.message}
                        </div>
                    )}
                </div>

                <div className="m-2 flex-row flex justify-around">
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
                        <div className="text-red-500 text-2xl text-center pl-2">
                            {errors.telefono.message}
                        </div>
                    )}
                </div>
                <div className="m-2 flex-row flex justify-around">
                    <span>Ingrese una Direccion: </span>
                    <input
                        className="text-black"
                        {...register("direccion", {
                            required: "Dirección es requerida",
                            maxLength: 200,
                        })}
                    ></input>
                    {errors.direccion && (
                        <div className="text-red-500 text-2xl text-center pl-2">
                            {errors.direccion.message}
                        </div>
                    )}
                </div>
                <div className="m-2 flex-row flex justify-around">
                    <span>Ingrese una Ciudad: </span>
                    <input
                        className="text-black"
                        {...register("ciudad", {
                            required: "La ciudad es requerida",
                            maxLength: 50,
                        })}
                    ></input>
                    {errors.ciudad && (
                        <div className="text-red-500 text-2xl text-center pl-2">
                            {errors.ciudad.message}
                        </div>
                    )}
                </div>
                <div className="m-2 flex flex-row w-[78%] text-black">
                    <span className="w-[65%] text-yellow-300">Seleccione un estado: </span>
                    <select
                        className="form-select"
                        {...register("estado", {
                            required: "El estado es requerido",
                        })}
                    >
                        {estados.map((estado) => (
                            <option key={estado.id} value={estado.nombre}>
                                {estado.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.estado && (
                        <div className="text-red-500 text-2xl text-center">
                            {errors.estado.message}
                        </div>
                    )}
                </div>
                <div className="m-2 flex-row flex justify-around">
                    <span>Ingrese un Pais: </span>
                    <input
                        className="text-black"
                        {...register("pais", {
                            required: "El pais es requerido",
                            maxLength: 30,
                        })}
                    ></input>
                    {errors.pais && (
                        <p className="text-red-500 text-2xl text-center pl-2">
                            {errors.pais.message}
                        </p>
                    )}
                </div>
                <div className="m-2 flex-row flex justify-around">
                    <span>Ingrese un Codigo Postal: </span>
                    <input
                        className="text-black"
                        {...register("cod_postal", {
                            required: "Código Postal es requerido",
                            pattern: {
                                value: /^[0-9]{4,5}$/g,
                                message: "Código Postal debe ser un número",
                            },
                        })}
                    ></input>
                    {errors.cod_postal && (
                        <p className="text-red-500 text-2xl text-center pl-2">
                            {errors.cod_postal.message}
                        </p>
                    )}
                </div>
                <div className="m-2 flex-row flex justify-around text-[1.25rem]">
                    <span>Ingrese una Calificacion de Credito: </span>
                    <input
                        className="text-black"
                        type="Number"
                        {...register("calificacion_CREDITO", {
                            required: "Calificacion credito es requerido",
                            min: {
                                value: 1,
                                message:
                                    "Calificacion crediticia debe ser mayor a 1",
                            },
                            max: {
                                value: 10,
                                message:
                                    "Calificacion crediticia debe ser menor a 10",
                            },
                        })}
                    ></input>
                    {errors.calificacion_CREDITO && (
                        <p className="text-red-500 text-2xl text-center pl-2">
                            {errors.calificacion_CREDITO.message}
                        </p>
                    )}
                </div>
                <div className="m-2 flex flex-row w-[100%] justify-center text-black">
                    <span className="w-[32%] text-yellow-300">Seleccione un vendedor: </span>
                    <Controller
                        name="id_vendedor"
                        control={control}
                        defaultValue={null}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={vendOptions}
                                isSearchable
                                styles={customStyles}
                                onChange={(option) => field.onChange(option)}
                            />
                        )}
                    />
                    {errors.id_region && (
                        <p className="text-red-500">El vendedor es requerido</p>
                    )}
                </div>
                <div className="m-2 flex flex-row w-[100%] justify-center text-black">
                    <span className="w-[30%] text-yellow-300">Seleccione una región: </span>
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

                <div className="m-2 flex-row flex justify-around">
                    <span>Ingrese un Comentario: </span>
                    <input
                        className="text-black"
                        {...register("comentarios", {
                            required: "El comentario es requerido",
                            maxLength: 50,
                        })}
                    ></input>
                    {errors.comentarios && (
                        <span className="text-red-500 text-2xl text-center pl-2">
                            {errors.comentarios.message}
                        </span>
                    )}
                </div>

                <span className="flex glow-on-hover w-[300px] justify-center mt-3">
                    <button className="m-5 flex justify-end ">
                        Crear Cliente
                    </button>
                </span>
                {existe ? (
                    <span className="text-red-500">
                        Ocurrio un error al crear el Cliente
                    </span>
                ) : (
                    <></>
                )}
            </form>
        </div>
    );
};
