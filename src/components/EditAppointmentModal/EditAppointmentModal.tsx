"use client";

import { useEffect, useState } from "react";
import { Props } from "./type";
import { useCalendarStore } from "@/store/store";


const EditAppointmentModal = ({ isOpen, onClose, appointment }: Props) => {
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [apeNom, setApeNom] = useState('');
    const { updateAppointment, removeAppointment } = useCalendarStore();

    useEffect(() => {
        if (appointment) {
            if (appointment.fecha) {
                const [datePart, timePart] = appointment.fecha.split('T');
                setFecha(datePart);
                setHora(timePart ? timePart.substring(0, 5) : appointment.hora);
            }
            setApeNom(appointment.ape_nom || '');
        }
    }, [appointment]);

    const handleSave = () => {
        if (!fecha || !hora) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const updatedAppointment = {
            id_agenda: appointment?.id_agenda ?? 0,
            id_paciente: appointment?.id_paciente ?? null,
            fecha: `${fecha}T${hora}:00`,
            hora,
            ape_nom: apeNom,
        };

        if (appointment) {
            updateAppointment(appointment.id_agenda ?? 0, updatedAppointment);
        }
        onClose();
    };

    const handleDelete = () => {
        if (appointment) {
            removeAppointment(appointment.id_agenda);
        }
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Editar Cita</h3>
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
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={handleDelete}
                                >
                                    Eliminar
                                </button>
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

export default EditAppointmentModal