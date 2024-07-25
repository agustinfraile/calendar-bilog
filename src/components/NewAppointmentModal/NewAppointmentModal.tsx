"use client";

import { useEffect, useState } from "react";
import { Props } from "./types"
import { useCalendarStore } from "@/store/store";



const NewAppointmentModal = ({ isOpen, onClose, initialDate = '', initialTime = '' }: Props) => {

    const [fecha, setFecha] = useState(initialDate);
    const [hora, setHora] = useState(initialTime);
    const [apeNom, setApeNom] = useState('');
    const { addAppointment } = useCalendarStore();

    useEffect(() => {
        if (initialDate) setFecha(initialDate);
        if (initialTime) setHora(initialTime);
        if (!isOpen) setApeNom('');

    }, [initialDate, initialTime, isOpen]);


    const handleSave = () => {
        if (!fecha || !hora) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const newAppointment = {
            id_agenda: Date.now(),
            id_paciente: null,
            fecha: `${fecha}T${hora}:00`,
            hora,
            ape_nom: apeNom,
        };

        addAppointment(newAppointment);
        onClose();
    };

    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 8; hour <= 18; hour++) {
            const hourString = hour.toString().padStart(2, '0');
            times.push(`${hourString}:00`, `${hourString}:30`);
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

    if (!isOpen) return null;

    const isSaveButtonDisabled = !fecha || !hora || !apeNom;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Crear Nueva Cita</h3>
                    <div className="mt-2 px-7 py-3">
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
                                    Fecha
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="fecha"
                                    type="date"
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hora">
                                    Hora
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="hora"
                                    value={hora}
                                    onChange={(e) => setHora(e.target.value)}
                                >
                                    <option value="">Selecciona una hora</option>
                                    {timeOptions.map((time, index) => (
                                        <option key={index} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apeNom">
                                    Nombre del Paciente
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="apeNom"
                                    type="text"
                                    value={apeNom}
                                    onChange={(e) => setApeNom(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                {
                                    isSaveButtonDisabled
                                        ? <button
                                            className="bg-gray-300 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                                            type="button"
                                            disabled
                                        >
                                            Guardar
                                        </button>
                                        : <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={handleSave}
                                        >
                                            Guardar
                                        </button>
                                }
                                <button
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={onClose}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewAppointmentModal