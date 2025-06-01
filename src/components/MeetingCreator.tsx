import {useState} from 'react';
import Calendar from './Calendar';
import Meeting from './Meeting';
import './MeetingCreator.css';
import { IMeeting } from '../models';
import MeetingInfo from './MeetingInfo';

function MeetingCreator() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [meeting, setmeeting] = useState<IMeeting | null>(null);

  return (
    <div className="MeetingCreator">
      <h1>Create your meeting</h1>
      <div className='MeetingCreatorContainer'>
        <Calendar
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          />
        {
          startDate != null && endDate != null ? 
          <Meeting startDate={startDate} endDate={endDate} createdMeeting={meeting} setcreatedMeeting={setmeeting}/>:
          ""
        }
      </div>
    </div>
  );
}

export default MeetingCreator;
