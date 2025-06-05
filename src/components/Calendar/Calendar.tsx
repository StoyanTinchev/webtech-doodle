import {useState} from "react";
import "./Calendar.css";

interface CalendarProps {
    startDate: Date | null;
    endDate: Date | null;
    setStartDate: (date: Date | null) => void;
    setEndDate: (date: Date | null) => void;
}

function Calendar({
                      startDate,
                      endDate,
                      setStartDate,
                      setEndDate
                  }: CalendarProps) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [isSelecting, setIsSelecting] = useState(false);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const isInRange = (date: Date) => {
        if (!startDate || !endDate) return false;
        return date >= startDate && date <= endDate;
    };

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((y) => y - 1);
        } else {
            setCurrentMonth((m) => m - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((y) => y + 1);
        } else {
            setCurrentMonth((m) => m + 1);
        }
    };

    const handleDayClick = (day: number) => {
        const clicked = new Date(currentYear, currentMonth, day);
        if (clicked < new Date(today.setHours(0, 0, 0, 0))) {
            alert("You cannot select past dates.");
            return;
        }

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

    const isSameDay = (d1: Date, d2: Date) => {
        return (
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear()
        );
    };

    return (
        <div className="calendarContainer">
            <div className="calendar">
                <h1>Calendar</h1>
                <div className="navigate-date">
                    <h2>
                        {monthsOfYear[currentMonth]}, {currentYear}
                    </h2>
                    <div className="buttons">
                        <button onClick={prevMonth}>◀</button>
                        <button onClick={nextMonth}>▶</button>
                    </div>
                </div>
                <div className="weekdays">
                    {daysOfWeek.map((d) => (
                        <span key={d}>{d}</span>
                    ))}
                </div>
                <div className="days">
                    {Array.from({length: firstDayOfMonth}).map((_, i) => (
                        <span key={`empty-${i}`}/>
                    ))}

                    {Array.from({length: daysInMonth}).map((_, idx) => {
                        const dateObj = new Date(currentYear, currentMonth, idx + 1);
                        const isSelected =
                            (startDate && isSameDay(dateObj, startDate)) ||
                            (endDate && isSameDay(dateObj, endDate)) ||
                            isInRange(dateObj);
                        return (
                            <span
                                key={idx}
                                className={isSelected ? "selected-day" : ""}
                                onClick={() => handleDayClick(idx + 1)}
                            >
                {idx + 1}
              </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Calendar;
