export interface Props {
    currentWeek: Date;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    handlePrevWeek: () => void;
    handleNextWeek: () => void;
    backToToday: () => void;
}