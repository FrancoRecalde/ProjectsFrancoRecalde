/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { MdClose } from "react-icons/md";

export const ModalDelete = ({ open, onClose, onConfirm, frase }) => {
    if (!open) return <></>;
    return (
        <div className="w-[100dvw] h-[117.55%] bg-[#000000a2] z-[100000] absolute flex flex-col justify-center items-center top-0">
            <div className="h-[40%] w-[40%] bg-white rounded-2xl flex flex-col justify-evenly">
                <button
                    onClick={onClose}
                    className="ml-5 text-5xl rounded-[1000px] bg-slate-300 w-[6%]"
                >
                    <MdClose />
                </button>
                <div className="text-center text-3xl pt-2">{frase}</div>
                <div className="flex flex-row justify-evenly pt-4">
                    <button
                        onClick={onClose}
                        className="p-3 text-5xl bg-green-400 rounded-xl"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="p-3 text-5xl bg-red-600 rounded-xl"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};
