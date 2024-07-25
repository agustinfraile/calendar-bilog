import { appointmentArraySchema } from '@/validation';
import axios from 'axios';
import { create } from 'zustand';

export interface Appointment {
    id_agenda: number;
    id_paciente: number | null;
    fecha: string;
    hora: string;
    ape_nom: string | null;
}

export interface StoreState {
    appointments: Appointment[];


    getAllAppointments: () => void;
    addAppointment: (appointment: Appointment) => void;
    removeAppointment: (id_agenda: number) => void;
    updateAppointment: (id_agenda: number, updatedAppointment: Appointment) => void;
}



export const useCalendarStore = create<StoreState>((set) => ({
    appointments: [],
    getAllAppointments: async () => {
        const response = await axios.get('https://my-json-server.typicode.com/juanpernu/bilog-fe-challenge/schedule');
        const citas = await response.data;
        set({ appointments: citas });
        appointmentArraySchema.safeParse(citas);
    },

    addAppointment: (appointment) => set((state) => ({
        appointments: [...state.appointments, appointment]
    })),


    updateAppointment: (id_agenda, updatedAppointment) => set((state) => ({
        appointments: state.appointments.map((appointment) =>
            appointment.id_agenda === id_agenda ? { ...appointment, ...updatedAppointment } : appointment
        ),
    })),

    removeAppointment: (id_agenda) => set((state) => ({
        appointments: state.appointments.filter((appointment) => appointment.id_agenda !== id_agenda)
    })),
}));
