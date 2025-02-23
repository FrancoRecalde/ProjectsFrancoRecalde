/* eslint-disable */
import { useState, useEffect, useMemo, useRef } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import clientesService from "../../services/clientes.service.js";
import { useForm } from "react-hook-form";
import "../styles/Tablas.css";
import { COLUMNS_CLIENTES } from "../data/columns.jsx";
import { ModalDelete } from "../ModalDelete.jsx";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import empleadosService from "../../services/empleados.service.js";
import regionesService from "../../services/regiones.service.js";

export const TablaClientes = () => {
    const estados = [
        { id: 1, nombre: "activo" },
        { id: 2, nombre: "no activo" },
    ];
    const [data, setData] = useState([]);
    const COLUMNS = useMemo(() => COLUMNS_CLIENTES, []);
    const [regiones, setRegiones] = useState([]);
    const [jefes, setJefes] = useState([]);
    const [accordion, setAccordion] = useState(-1);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [modal, setModal] = useState(false);
    const [modalItem, setModalItem] = useState(-1);
    const myRef = useRef(null);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        state,
        prepareRow,
    } = useTable(
        {
            columns: COLUMNS,
            data: data,
        },
        useSortBy,
        usePagination
    );

    const filterSubmit = async (data) => {
        try {
            console.log("DATA", data);
            clientesService
                .getClientesFiltradas(data)
                .then((data) => setData(data));
        } catch (error) {
            console.error("Error fetching filtered clientes:", error);
        }
    };

    useEffect(() => {
        clientesService.getClientes().then((response) => setData(response));
        getData();
    }, []);

    const toggleAccordion = (index) => {
        if (index === accordion) {
            reset();
            setAccordion(-1);
        } else {
            reset();
            setAccordion(index);
        }
    };

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await clientesService.updateCliente(data);
            clientesService.getClientes().then((data) => setData(data));
            setAccordion(-1);
        } catch (e) {
            alert("Ha ocurrido un error");
        }
    };

    const eliminar = async (clienteId) => {
        try {
            await clientesService.deleteCliente(clienteId);
            clientesService
                .getClientes()
                .then((clienteId) => setData(clienteId));
            setModal(false);
        } catch (e) {
            alert("Esta entrada esta referenciada.");
        }
    };

    const getData = async () => {
        const reg = await regionesService.getRegiones();
        setRegiones(reg);
        const jef = await empleadosService.getEmpleados();
        setJefes(jef);
    };

    const { pageIndex } = state;

    return (
        <div className="bg-gradient-to-br from-[#ff9bd5] to-[#0E86D4] h-[fit-content]">
            <div ref={myRef}>
                <ModalDelete
                    open={modal}
                    onClose={() => {
                        setModal(false);
                    }}
                    onConfirm={() => {
                        eliminar(modalItem);
                    }}
                    frase={
                        "Desea eliminar el almacen con ID " + modalItem.id + "?"
                    }
                />
            </div>
            <div className="text-white font-bold text-[3rem] flex justify-between w-[80vw] m-auto">
                <span className="text-center">
                    <Link to="/tablas" className="flex items-center">
                        <IoIcons.IoIosArrowBack size={64} />
                        Volver
                    </Link>
                </span>
                <span className="text-[3rem] text-center">
                    Tabla de Clientes
                </span>
            </div>
            <form onChange={handleSubmit(filterSubmit)}>
                <div className="font-bold text-[1.5rem] w-[40vw] flex flex-row items-center ml-[12.75rem] form__group field">
                    <input
                        type="text"
                        className="h-[30%] w-[100%] form__field"
                        {...register("nombre")}
                    />
                    <label htmlFor="nombre" className="pb-2 form__label">
                        Nombre
                    </label>
                </div>
            </form>
            <div className="container mt-3 pb-3">
                <table {...getTableProps()} className="table table-bordered">
                    <thead className="table-secondary">
                        {headerGroups.map((hg) => (
                            <tr {...hg.getHeaderGroupProps()}>
                                {hg.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                    >
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? "⬇️"
                                                    : "⬆️"
                                                : ""}
                                        </span>
                                    </th>
                                ))}
                                <th>ABM</th>
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, index) => {
                            prepareRow(row);
                            return (
                                <>
                                    <tr {...row.getRowProps()} key={row.id}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render("Cell")}
                                                </td>
                                            );
                                        })}
                                        <td className="flex justify-evenly w-[250px]">
                                            <div className="w-[100px] h-[50px]">
                                                <button
                                                    onClick={async () => {
                                                        toggleAccordion(index);
                                                    }}
                                                    className="bg-yellow-300 text-black rounded-lg h-[100%] w-[100%]"
                                                >
                                                    Modificar
                                                </button>
                                            </div>
                                            <div className="w-[100px] h-[50px]">
                                                <button
                                                    onClick={() => {
                                                        setModal(true);
                                                        setModalItem(
                                                            row.values
                                                        );
                                                        myRef.current.scrollIntoView(
                                                            {
                                                                behavior:
                                                                    "smooth",
                                                                block: "start",
                                                            }
                                                        );
                                                    }}
                                                    className="bg-black text-white rounded-lg h-[100%] w-[100%]"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr key={index + `b`}>
                                        {index === accordion ? (
                                            <td colSpan={13}>
                                                <form
                                                    onSubmit={handleSubmit(
                                                        onSubmit
                                                    )}
                                                >
                                                    <div className="form__group field">
                                                        <input
                                                            className="form__field"
                                                            defaultValue={
                                                                row.values
                                                                    .nombre
                                                            }
                                                            {...register(
                                                                "nombre",
                                                                {
                                                                    required:
                                                                        "El nombre es requerido",
                                                                    maxLength: 20,
                                                                }
                                                            )}
                                                        ></input>
                                                        <label className="p-2 form__label">
                                                            Ingrese el nuevo
                                                            nombre:
                                                        </label>
                                                        {errors.nombre && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        .nombre
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="form__group field">
                                                        <input
                                                            className="form__field"
                                                            defaultValue={
                                                                row.values
                                                                    .telefono
                                                            }
                                                            {...register(
                                                                "telefono",
                                                                {
                                                                    required:
                                                                        "Teléfono es requerido",
                                                                    pattern: {
                                                                        value: /^[+][0-9]{2}[-][0-9]{3}[-][0-9]{3,4}[-][0-9]{3,4}$/g,
                                                                        message:
                                                                            "Teléfono debe ser un número",
                                                                    },
                                                                }
                                                            )}
                                                        ></input>
                                                        <label className="p-2 form__label">
                                                            Ingrese el nuevo
                                                            teléfono:
                                                        </label>
                                                        {errors.telefono && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        .telefono
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="form__group field">
                                                        <input
                                                            className="form__field"
                                                            defaultValue={
                                                                row.values
                                                                    .direccion
                                                            }
                                                            {...register(
                                                                "direccion",
                                                                {
                                                                    required:
                                                                        "Dirección es requerida",
                                                                    maxLength: 200,
                                                                }
                                                            )}
                                                        ></input>
                                                        <label className="p-2 form__label">
                                                            Ingrese la nueva
                                                            dirección:
                                                        </label>
                                                        {errors.direccion && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        .direccion
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="form__group field">
                                                        <input
                                                            className="form__field"
                                                            defaultValue={
                                                                row.values
                                                                    .ciudad
                                                            }
                                                            {...register(
                                                                "ciudad",
                                                                {
                                                                    required:
                                                                        "La ciudad es requerida",
                                                                    maxLength: 50,
                                                                }
                                                            )}
                                                        ></input>
                                                        <label className="p-2 form__label">
                                                            Ingrese la nueva
                                                            ciudad:
                                                        </label>
                                                        {errors.ciudad && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        .ciudad
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="form__group field">
                                                        <select
                                                            {...register(
                                                                "estado",
                                                                {
                                                                    required:
                                                                        "El estado es requerido",
                                                                }
                                                            )}
                                                        >
                                                            <option value={""}>
                                                                Seleccione un
                                                                estado
                                                            </option>
                                                            {estados.map(
                                                                (e) => (
                                                                    <option
                                                                        key={
                                                                            e.id
                                                                        }
                                                                        value={
                                                                            e.nombre
                                                                        }
                                                                    >
                                                                        {
                                                                            e.nombre
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                        {errors.estado && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        .estado
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="form__group field">
                                                        <input
                                                            className="form__field"
                                                            defaultValue={
                                                                row.values.pais
                                                            }
                                                            {...register(
                                                                "pais",
                                                                {
                                                                    required:
                                                                        "El pais es requerido",
                                                                    maxLength: 30,
                                                                }
                                                            )}
                                                        ></input>
                                                        <label className="p-2 form__label">
                                                            Ingrese el nuevo
                                                            pais:
                                                        </label>
                                                        {errors.pais && (
                                                            <span className="error-message">
                                                                {
                                                                    errors.pais
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="form__group field">
                                                        <input
                                                            className="form__field"
                                                            defaultValue={
                                                                row.values
                                                                    .cod_postal
                                                            }
                                                            {...register(
                                                                "cod_postal",
                                                                {
                                                                    required:
                                                                        "Código Postal es requerido",
                                                                    pattern: {
                                                                        value: /^[0-9]{4,5}$/g,
                                                                        message:
                                                                            "Código Postal debe ser un número",
                                                                    },
                                                                }
                                                            )}
                                                        ></input>
                                                        <label className="p-2 form__label">
                                                            Ingrese el nuevo
                                                            código postal:
                                                        </label>
                                                        {errors.cod_postal && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        .cod_postal
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="form__group field">
                                                        <input
                                                            className="form__field"
                                                            defaultValue={
                                                                row.values
                                                                    .calificacion_CREDITO
                                                            }
                                                            {...register(
                                                                "calificacion_CREDITO",
                                                                {
                                                                    required:
                                                                        "Calificacion credito es requerido",
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
                                                                }
                                                            )}
                                                        ></input>
                                                        <label className="p-2 form__label">
                                                            Ingrese la nueva
                                                            calificacion
                                                            credito:
                                                        </label>
                                                        {errors.calificacion_CREDITO && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        .calificacion_CREDITO
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="form__group field">
                                                        <select
                                                            {...register(
                                                                "id_vendedor",
                                                                {
                                                                    required:
                                                                        "Este campo es requerido",
                                                                }
                                                            )}
                                                        >
                                                            <option value={""}>
                                                                Seleccione un
                                                                vendedor
                                                            </option>
                                                            {jefes.map((v) => (
                                                                <option
                                                                    key={v.id}
                                                                    value={v.id}
                                                                >
                                                                    {v.nombre}{" "}
                                                                    {v.apellido}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.id_vendedor && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        .id_vendedor
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="form__group field">
                                                        <select
                                                            {...register(
                                                                "id_region",
                                                                {
                                                                    required:
                                                                        "Este campo es requerido",
                                                                }
                                                            )}
                                                        >
                                                            <option value={""}>
                                                                Seleccione una
                                                                region
                                                            </option>
                                                            {regiones.map(
                                                                (r) => (
                                                                    <option
                                                                        key={
                                                                            r.id
                                                                        }
                                                                        value={
                                                                            r.id
                                                                        }
                                                                    >
                                                                        {
                                                                            r.nombre
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                        {errors.id_region && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        .id_region
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="form__group field">
                                                        <input
                                                            className="form__field"
                                                            defaultValue={
                                                                row.values
                                                                    .comentarios
                                                            }
                                                            {...register(
                                                                "comentarios",
                                                                {
                                                                    required:
                                                                        "El comentario es requerido",
                                                                    maxLength: 50,
                                                                }
                                                            )}
                                                        ></input>
                                                        <label className="p-2 form__label">
                                                            Ingrese el
                                                            comentario:
                                                        </label>
                                                        {errors.comentarios && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        .comentarios
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="w-[100%] flex justify-end pt-2">
                                                        <button
                                                            type="submit"
                                                            className="bg-yellow-400 text-black items-center w-[15%] rounded-2xl h-[60px]"
                                                        >
                                                            Modificar entrada
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="hidden"
                                                        value={row.values.id}
                                                        {...register("id")}
                                                    ></input>
                                                </form>
                                            </td>
                                        ) : (
                                            <></>
                                        )}
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex justify-evenly items-center w-[60%] inset-0 m-auto">
                    <button
                        onClick={() => {
                            gotoPage(0);
                            setAccordion(-1);
                        }}
                        disabled={!canPreviousPage}
                        className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] enabled:hover:brightness-110 enabled:active:brightness-90 disabled:bg-blue-300 disabled:border-blue-400"
                    >
                        {"<<<"}
                    </button>
                    <button
                        onClick={() => {
                            previousPage();
                            setAccordion(-1);
                        }}
                        disabled={!canPreviousPage}
                        className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] enabled:hover:brightness-110 enabled:active:brightness-90 disabled:bg-blue-300 disabled:border-blue-400"
                    >
                        Anterior pagina
                    </button>
                    <span className="font-bold form__group field w-[20%] pb-3">
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={(e) => {
                                setAccordion(-1);
                                const pageNumber = e.target.value
                                    ? Number(e.target.value) - 1
                                    : 0;
                                gotoPage(pageNumber);
                            }}
                            className="form__field text-base"
                        ></input>
                        <label htmlFor="direccion" className="pb-2 form__label">
                            Ir a la pagina
                        </label>
                    </span>
                    <label className="border-3 p-1 rounded-md border-blue-500 w-[15%] justify-center flex font-bold">
                        Page {pageIndex + 1} of {pageCount}
                    </label>
                    <button
                        onClick={() => {
                            nextPage();
                            setAccordion(-1);
                        }}
                        disabled={!canNextPage}
                        className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] enabled:hover:brightness-110 enabled:active:brightness-90 disabled:bg-blue-300 disabled:border-blue-400"
                    >
                        Proxima pagina
                    </button>
                    <button
                        onClick={() => {
                            gotoPage(pageCount - 1);
                            setAccordion(-1);
                        }}
                        disabled={!canNextPage}
                        className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] enabled:hover:brightness-110 enabled:active:brightness-90 disabled:bg-blue-300 disabled:border-blue-400"
                    >
                        {">>>"}
                    </button>
                </div>
            </div>
        </div>
    );
};
