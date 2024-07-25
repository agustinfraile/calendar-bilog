import { Card, CardContent } from "../ui/card"
import { Props } from "./types"


const EventList = ({ events, openNewModal, openEditModal }: Props) => {
    return (
        <Card>
            <CardContent className="grid grid-cols-1 gap-1">
                {events.map((appointment) => (
                    <div key={appointment.hora} className="flex items-center border-t border-gray-200 py-2">
                        <div className="w-24 text-right pr-4">
                            <span className="text-gray-700">{appointment.hora}</span>
                        </div>
                        <div
                            className={`flex-1 p-2 rounded cursor-pointer ${appointment.id_agenda !== -1 ? "bg-blue-100" : "bg-gray-100"}`}
                            onClick={() => (appointment.id_agenda !== -1 ? openEditModal(appointment) : openNewModal(appointment.fecha, appointment.hora))}
                        >
                            <span className="text-gray-900">{appointment.ape_nom}</span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default EventList;