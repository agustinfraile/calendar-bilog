import { z } from "zod";

const appointmentSchema = z.object({
    id_agenda: z.string(),
    id_paciente: z.string().nullable(),
    fecha: z.string(),
    hora: z.string(),
    ape_nom: z.string().nullable(),
});

export const appointmentArraySchema = z.array(appointmentSchema);

export { appointmentSchema };