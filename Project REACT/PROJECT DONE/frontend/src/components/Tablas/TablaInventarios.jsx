/* eslint-disable */
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import { useForm } from "react-hook-form";
import { ModalDelete } from "../ModalDelete.jsx";
import { COLUMNS_INVENTARIOS } from "../data/columns.jsx";
import inventariosService from "../../services/inventarios.service.js";

const initialState = { hiddenColumns: ["idProducto"] };

export const TablaInventarios = () => {
    const [data, setData] = useState([]);
    const [accordion, setAccordion] = useState(-1);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();
    const [modal, setModal] = useState(false);
    const [modalItem, setModalItem] = useState(-1);
    const myRef = useRef(null);
    const COLUMNS = useMemo(() => COLUMNS_INVENTARIOS, []);
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
        allColumns,
    } = useTable(
        {
            columns: COLUMNS,
            data: data,
            initialState: initialState,
        },
        useSortBy,
        usePagination
    );

    const toggleAccordion = (index) => {
        if (index === accordion) {
            reset();
            setAccordion(-1);
        } else {
            reset();
            setAccordion(index);
        }
    };

    const filterSubmit = async (data) => {
        try {
            inventariosService
                .getInventariosFiltradas(data)
                .then((data) => setData(data));
        } catch (error) {
            console.error("Error fetching filtered inventarios:", error);
        }
    };

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await inventariosService.updateInventario(data);
            inventariosService.getInventarios().then((data) => setData(data));
            setAccordion(-1);
        } catch (e) {
            alert("Ha ocurrido un error");
        }
    };

    useEffect(() => {
        inventariosService
            .getInventarios()
            .then((response) => setData(response));
    }, []);

    const eliminar = async (inventario) => {
        try {
            await inventariosService.deleteInventario(inventario);
            inventariosService.getInventarios().then((data) => setData(data));
            setModal(false);
        } catch (e) {
            alert("Esta entrada esta referenciada.");
        }
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
                    Tabla de Inventarios
                </span>
            </div>
            <form onChange={handleSubmit(filterSubmit)}>
                <div className="font-bold text-[1.5rem] w-[40vw] flex flex-row items-center ml-[12.75rem] form__group field">
                    <input
                        type="text"
                        className="h-[30%] w-[100%] form__field"
                        {...register("almacenId")}
                    />
                    <label htmlFor="almacenId" className="pb-2 form__label">
                        ID de Almacen
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
                                        <td className="flex justify-evenly">
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
                                            <td colSpan={8}>
                                                <form
                                                    onSubmit={handleSubmit(
                                                        onSubmit
                                                    )}
                                                >
                                                    <input
                                                        type="hidden"
                                                        value={
                                                            row.values[
                                                                "idAlmacenes"
                                                            ]
                                                        }
                                                        {...register(
                                                            "idAlmacenes"
                                                        )}
                                                    ></input>
                                                    <input
                                                        type="hidden"
                                                        value={
                                                            row.values[
                                                                "idProducto"
                                                            ]
                                                        }
                                                        {...register(
                                                            "idProducto"
                                                        )}
                                                    ></input>
                                                    <div className="form__group field">
                                                        <input
                                                            className="form__field"
                                                            defaultValue={
                                                                row.values
                                                                    .cantEnStock
                                                            }
                                                            {...register(
                                                                "cantEnStock",
                                                                {
                                                                    required:
                                                                        "Cantidad en Stock es requerida",
                                                                    pattern: {
                                                                        value: /^\d+$/,
                                                                        message:
                                                                            "Cantidad en Stock debe ser un número",
                                                                    },
                                                                }
                                                            )}
                                                        ></input>
                                                        <label className="p-2 form__label">
                                                            Ingrese la Cantidad
                                                            en Stock:
                                                        </label>
                                                        {errors.cantEnStock && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        .cantEnStock
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
                                                                    .maxEnStock
                                                            }
                                                            {...register(
                                                                "maxEnStock",
                                                                {
                                                                    required:
                                                                        "Máximo en Stock es requerido",
                                                                    pattern: {
                                                                        value: /^\d+$/,
                                                                        message:
                                                                            "Máximo en Stock debe ser un número",
                                                                    },
                                                                }
                                                            )}
                                                        ></input>
                                                        <label className="p-2 form__label">
                                                            Ingrese el Máximo en
                                                            Stock:
                                                        </label>
                                                        {errors.maxEnStock && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        .maxEnStock
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="form__group field">
                                                        <input
                                                            type="date"
                                                            className="form__field"
                                                            defaultValue={
                                                                row.values
                                                                    .fechaDeRestock
                                                            }
                                                            {...register(
                                                                "fechaDeRestock",
                                                                {
                                                                    required:
                                                                        "Fecha de Restock es requerida",
                                                                }
                                                            )}
                                                        ></input>
                                                        <label className="p-2 form__label">
                                                            Ingrese la Fecha de
                                                            Restock:
                                                        </label>
                                                        {errors.fechaDeRestock && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        .fechaDeRestock
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    {errors.stockMinMax && (
                                                        <span className="error-message">
                                                            {
                                                                errors
                                                                    .stockMinMax
                                                                    .message
                                                            }
                                                        </span>
                                                    )}
                                                    <div className="w-[100%] flex justify-end pt-2">
                                                        <button
                                                            type="submit"
                                                            className="bg-yellow-400 text-black items-center w-[15%] rounded-2xl h-[60px]"
                                                        >
                                                            Modificar entrada
                                                        </button>
                                                    </div>
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
