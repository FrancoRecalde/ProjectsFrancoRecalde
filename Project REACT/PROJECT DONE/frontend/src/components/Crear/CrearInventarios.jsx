/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import "../styles/Crear.css";
import { Link, useNavigate } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import inventariosService from "../../services/inventarios.service.js";
import productosService from "../../services/productos.service.js";
import almacenesService from "../../services/almacenes.service.js";

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

export const CrearInventarios = () => {
    const [existe, setExiste] = useState(false);
    const [producto, setProducto] = useState([]);
    const [almacen, setAlmacen] = useState([]);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const pro = await productosService.getProductos();
            setProducto(pro);
            const alm = await almacenesService.getAlmacenes();
            setAlmacen(alm);
        };
        getData();
    }, []);

    const onSubmit = async (data) => {
        console.log("DATOS DEL FORMULARIO:", data);
        const nuevo = {
            idProducto: `${data.idProducto.value}`,
            idAlmacenes: `${data.idAlmacenes.value}`,
            cantEnStock: `${data.cantEnStock}`,
            maxEnStock: `${data.maxEnStock}`,
            fechaDeRestock: `${data.fechaDeRestock}`,
        };
        try {
            await inventariosService.postInventarios(nuevo);
            const inventarios = await inventariosService.getInventarios();
            console.log("Nuevo inventario agregado:", nuevo);
            console.log(inventarios);
            navigate("/tablas/inventarios");
        } catch (error) {
            console.error("Error al agregar nuevo inventario:", error);
            setExiste(true);
        }
    };

    const productoOptions = producto.map((r) => ({
        value: r.id,
        label: r.nombre,
    }));
    const almacenOptions = almacen.map((r) => ({
        value: r.id,
        label: r.direccion,
    }));

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
                    <span className="w-[35%] text-yellow-300">Seleccione un producto: </span>
                    <Controller
                        name="idProducto"
                        control={control}
                        defaultValue={null}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={productoOptions}
                                isSearchable
                                styles={customStyles}
                                onChange={(option) => field.onChange(option)}
                            />
                        )}
                    />
                    {errors.idRegion && (
                        <p className="text-red-500">El producto es requerido</p>
                    )}
                </div>
                <div className="m-2 flex flex-row w-[100%] justify-center text-black">
                    <span className="w-[34%] text-yellow-300">Seleccione un almacen: </span>
                    <Controller
                        name="idAlmacenes"
                        control={control}
                        defaultValue={null}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={almacenOptions}
                                isSearchable
                                styles={customStyles}
                                onChange={(option) => field.onChange(option)}
                            />
                        )}
                    />
                    {errors.idRegion && (
                        <p className="text-red-500">La región es requerida</p>
                    )}
                </div>

                <div className="m-2">
                    <span>Ingrese una Cantidad Maxima en Stock: </span>
                    <input
                        className="text-black"
                        {...register("maxEnStock", {
                            required:
                                "La cantidad maxima de stock es requerida",
                            min: 0,
                        })}
                    ></input>
                    {errors.cantEnStock && (
                        <p className="text-red-500">
                            La cantidad de stock es un numero positivo requerido
                        </p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese la Cantidad en Stock: </span>
                    <input
                        className="text-black"
                        {...register("cantEnStock", {
                            required: "La cantidad de stock es requerida",
                            min: 0,
                        })}
                    ></input>
                    {errors.cantEnStock && (
                        <p className="text-red-500">
                            La cantidad de stock es un numero positivo requerido
                            y mayor que la cantidad maxima en stock
                        </p>
                    )}
                </div>
                <div className="m-2">
                    <span>Ingrese la Fecha de Restock: </span>
                    <input
                        className="text-black"
                        type="date"
                        {...register("fechaDeRestock", {
                            required: "fecha es requerida",
                        })}
                    ></input>
                    {errors.cantEnStock && (
                        <p className="text-red-500">
                            La fecha de restock es requerida
                        </p>
                    )}
                </div>

                <span className="flex glow-on-hover w-[300px] justify-center mt-3">
                    <button className="m-5 flex justify-end ">
                        Crear Inventario
                    </button>
                </span>
                {existe ? (
                    <span className="text-red-500">
                        Ocurrio un error al crear el Inventario
                    </span>
                ) : (
                    <></>
                )}
            </form>
        </div>
    );
};
