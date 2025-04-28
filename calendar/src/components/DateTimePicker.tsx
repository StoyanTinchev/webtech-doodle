import {useState} from 'react';
import Calendar from './Calendar';
import Meeting from './Meeting';
import './DateTimePicker.css';

function DateTimePicker() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <div className="MeetingCreator">

      <Calendar 
        startDate={startDate} 
        endDate={endDate} 
        setStartDate={setStartDate} 
        setEndDate={setEndDate} 
      />
      <Meeting startDate={startDate} endDate={endDate} />
    </div>
  );
}

export default DateTimePicker;
