import {useState} from "react"
import "./Calendar.css"

interface CalendarProps {
    startDate: Date | null;
    endDate: Date | null;
    setStartDate: (date: Date | null) => void;
    setEndDate: (date: Date | null) => void;
}

function Calendar({ startDate, endDate, setStartDate, setEndDate }: CalendarProps){
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [isSelecting, setIsSelecting] = useState(false);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    const isInRange = (date: Date) => {
        if (!startDate || !endDate) return false;
        return date >= startDate && date <= endDate;
      };

      const prevMonth = () => {
        setCurrentMonth(prev => (prev === 0 ? 11 : prev - 1));
        if (currentMonth === 0) setCurrentYear(year => year - 1);
      };
    
      const nextMonth = () => {
        setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1));
        if (currentMonth === 11) setCurrentYear(year => year + 1);
      };

    const handleDayClick = (day:number) => {
        const clicked = new Date(currentYear, currentMonth, day);
    
        if (!isSelecting || !startDate) {
          setStartDate(clicked);
          setEndDate(null);
          setIsSelecting(true);
        } else if (clicked >= startDate) {
          setEndDate(clicked);
          setIsSelecting(false);
        } else {
          setStartDate(clicked);
          setEndDate(null);
        }
      };

      const isSameDay = (date1: Date, date2:Date) => {
        return (
          date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear()
        );
      };

    return(
    <div className = "calendarContainer">
      <div className="calendar">
        <h1>Calendar</h1>
        <div className="navigate-date">
          <h2>{monthsOfYear[currentMonth]}, {currentYear}</h2>
          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>
        <div className="weekdays">
          {daysOfWeek.map(day => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {Array.from({length: firstDayOfMonth}).map((_, i) => (
            <span key={`empty-${i}`} />
          ))} 

          {Array.from({length: daysInMonth}).map((_, day) => {
            const thisDate = new Date(currentYear, currentMonth, day + 1);
            const isSelected = isInRange(thisDate) ||
              (startDate && isSameDay(thisDate, startDate)) ||
              (endDate && isSameDay(thisDate, endDate));
            return (
              <span
                key={day + 1}
                className={isSelected ? "selected-day" : ""}
                onClick={() => handleDayClick(day + 1)}
              >
                {day + 1}
              </span>
            );
          })}
        </div>
      </div>
    </div>
    );
}
export default Calendar;