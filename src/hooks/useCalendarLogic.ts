import { useState } from 'react';
import { subWeeks, addWeeks, startOfWeek, format } from 'date-fns';
import { Appointment } from '@/store/store';

const generateTime = () => {
    const time = [];
    for (let hour = 8; hour <= 18; hour++) {
        const hourString = hour.toString().padStart(2, '0');
        time.push(`${hourString}:00`, `${hourString}:30`);
    }
    return time;
};

const useCalendarLogic = (appointments: Appointment[]) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [newAppointmentDetails, setNewAppointmentDetails] = useState({ fecha: '', hora: '' });

    const handlePrevWeek = () => {
        setCurrentWeek(subWeeks(currentWeek, 1));
    };

    const handleNextWeek = () => {
        setCurrentWeek(addWeeks(currentWeek, 1));
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            setCurrentWeek(startOfWeek(date, { weekStartsOn: 1 }));
        }
    };

    const openNewModal = (fecha: string, hora: string) => {
        setNewAppointmentDetails({ fecha, hora });
        setIsNewModalOpen(true);
    };

    const openEditModal = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsEditModalOpen(true);
    };

    const filteredEvents = appointments.filter(
        (appointment: Appointment) =>
            format(new Date(appointment.fecha), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );

    const timeSlots = generateTime();

    const eventsWithTimeSlots = timeSlots.map((slot) => {
        const event = filteredEvents.find((appointment: Appointment) => appointment.hora === slot);
        return {
            hora: slot,
            ape_nom: event && event.id_agenda !== -1 ? event.ape_nom : 'Disponible',
            id_agenda: event ? event.id_agenda : -1,
            fecha: format(selectedDate, 'yyyy-MM-dd'),
            id_paciente: event ? event.id_paciente : null,
        };
    });

    const backToToday = () => {
        const today = new Date();
        setSelectedDate(today);
        setCurrentWeek(startOfWeek(today, { weekStartsOn: 1 }));
    };

    return {
        selectedDate,
        currentWeek,
        isNewModalOpen,
        isEditModalOpen,
        selectedAppointment,
        newAppointmentDetails,
        eventsWithTimeSlots,
        setSelectedDate,
        setIsNewModalOpen,
        setIsEditModalOpen,
        handlePrevWeek,
        handleNextWeek,
        handleDateChange,
        openNewModal,
        openEditModal,
        backToToday
    };
};

export default useCalendarLogic;