"use client";


import { Props } from './types'


import NewAppointmentModal from '../NewAppointmentModal/NewAppointmentModal';
import EditAppointmentModal from '../EditAppointmentModal/EditAppointmentModal';

import DatePickerComponent from '../DatePickerComponent/DatePickerComponent';
import WeekNavigation from '../WeekNavigation/WeekNavigation';
import EventList from '../EventList/EventList';
import useCalendarLogic from '@/hooks/useCalendarLogic';

const CalendarSection = ({ appointments }: Props) => {

    const {
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
    } = useCalendarLogic(appointments);

    return (
        <div className="p-4 flex">

            <DatePickerComponent
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
            />

            <div className="w-3/4">

                <WeekNavigation
                    currentWeek={currentWeek}
                    selectedDate={selectedDate}
                    setSelectedDate={handleDateChange}
                    handlePrevWeek={handlePrevWeek}
                    handleNextWeek={handleNextWeek}
                    backToToday={backToToday}
                />

                <EventList
                    events={eventsWithTimeSlots}
                    openNewModal={openNewModal}
                    openEditModal={openEditModal}
                />

            </div>
            <NewAppointmentModal
                isOpen={isNewModalOpen}
                onClose={() => setIsNewModalOpen(false)}
                initialDate={newAppointmentDetails.fecha}
                initialTime={newAppointmentDetails.hora}
            />
            {selectedAppointment && (
                <EditAppointmentModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    appointment={selectedAppointment}
                />
            )}
        </div>
    )
}

export default CalendarSection