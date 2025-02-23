/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import "../styles/Crear.css";
import { Link, useNavigate } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import departamentosService from "../../services/departamentos.service";
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

export const CrearDepartamentos = () => {
    const [existe, setExiste] = useState(false);
    const [region, setRegion] = useState([]);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const getData = async () => {
            const reg = await regionesService.getRegiones();
            setRegion(reg);
        };
        getData();
    }, []);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("DATOS DEL FORMULARIO:", data);
        const nuevo = {
            nombre: data.nombre,
            idRegion: data.idRegion.value,
        };
        try {
            await departamentosService.postDeptos(nuevo);
            const deptos = await departamentosService.getDeptos();
            console.log("Nuevo depto agregado:", nuevo);
            console.log(deptos);
            navigate("/tablas/departamentos");
        } catch (error) {
            console.error("Error al agregar nuevo depto:", error);
            setExiste(true);
        }
    };

    const regionOptions = region.map((r) => ({
        value: r.id,
        label: r.nombre,
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
                <div className="m-2">
                    <span>Ingrese un Nombre: </span>
                    <input
                        className="text-black"
                        {...register("nombre", {
                            required: "Este campo es requerido",
                            maxLength: 30,
                        })}
                    ></input>
                    {errors.nombre && (
                        <p className="text-red-500">El nombre es requerido</p>
                    )}
                </div>
                <div className="m-2 flex flex-row w-[100%] justify-center text-black">
                    <span className="w-[45%] text-yellow-300">Seleccione una región: </span>
                    <Controller
                        name="idRegion"
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
                    {errors.idRegion && (
                        <p className="text-red-500">La región es requerida</p>
                    )}
                </div>
                <span className="flex glow-on-hover w-[300px] justify-center mt-3">
                    <button className="m-5 flex justify-end ">
                        Crear Departamento
                    </button>
                </span>
                {existe ? (
                    <span className="text-red-500">
                        Ocurrió un error al crear el almacen
                    </span>
                ) : (
                    <></>
                )}
            </form>
        </div>
    );
};

export default CrearDepartamentos;
