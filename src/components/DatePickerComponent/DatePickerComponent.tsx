import DatePicker from "react-datepicker"
import { Props } from "./types"
import { es } from "date-fns/locale"
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerComponent.css';


const DatePickerComponent = ({ selectedDate, handleDateChange }: Props) => {

  
  return (
    <div className="w-1/4 pr-4">
      <div className="mb-4 rounded-lg p-2">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => handleDateChange(date)}
          locale={es}
          showMonthYearPicker
          showFullMonthYearPicker
          dateFormat="MMMM yyyy"
          className="w-full text-center"

        />
      </div>
    </div>
  );
}

export default DatePickerComponent