import { Appointment } from "@/store/store";

export interface Props {
    events: Appointment[];
    openNewModal: (fecha: string, hora: string) => void;
    openEditModal: (appointment: Appointment) => void;
}