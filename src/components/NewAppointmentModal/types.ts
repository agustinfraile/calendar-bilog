import { Appointment } from "@/store/store";

export interface Props {
    isOpen: boolean;
    onClose: () => void;
    initialDate?: string;
    initialTime?: string;
}