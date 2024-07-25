import { addDays, format, isToday, startOfWeek } from "date-fns";
import { Props } from "./types"
import { Button } from "../ui/button";
import { es } from "date-fns/locale";


const WeekNavigation = ({
    currentWeek,
    selectedDate,
    setSelectedDate,
    handlePrevWeek,
    handleNextWeek,
    backToToday
}: Props) => {

    const startCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const daysOfWeek = [];

    for (let i = 0; i < 7; i++) {
        daysOfWeek.push(addDays(startCurrentWeek, i));
    }


    return (
        <div className="mb-4 flex justify-between items-center">
            <Button variant="outline" onClick={handlePrevWeek}>
                &lt;
            </Button>

            <div className="flex flex-col items-center">
                <span className="text-lg font-bold">
                    {format(startCurrentWeek, 'MMMM yyyy', { locale: es })}
                </span>
                <div className="flex space-x-4 mt-2">
                    {daysOfWeek.map((day) => (
                        <div key={day.toString()} className="flex flex-col items-center">
                            <span className={`text-sm ${format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'font-bold' : ''}`}>
                                {format(day, 'EEE', { locale: es })}
                            </span>
                            <Button
                                className={`p-2 rounded ${format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'bg-blue-500 text-white' : isToday(day) ? 'bg-gray-300' : 'bg-gray-100'}`}
                                onClick={() => setSelectedDate(day)}
                                variant="outline"
                            >
                                {format(day, 'dd', { locale: es })}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <Button variant="outline" onClick={handleNextWeek}>
                &gt;
            </Button>

            <Button
                variant="outline"
                onClick={backToToday}
                className='bg-yellow-500 text-white hover:bg-yellow-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded p-2 transition duration-200 ease-in-out'
            >
                Hoy
            </Button>
        </div>
    );
}

export default WeekNavigation