import { Appointment } from "@/store/store";

export interface Props {
    isOpen: boolean;
    onClose: () => void;
    appointment: Appointment;
}