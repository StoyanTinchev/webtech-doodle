// import "./MeetingInfo.css";
// import { IMeeting } from "../models";

// interface MeetingInfoProps {
//   createdMeeting: IMeeting;
// }

// function MeetingInfo({createdMeeting} : MeetingInfoProps) {
//     return (
//         <div className="meeting-container">
//             <h2 className="meetings-header">Meetings</h2>
//                 <div key={createdMeeting.id} className="meeting-card">
//                     <div className="meeting-info">
//                         <div className="meeting-dates">
//                             {new Date(createdMeeting.dateFrom).toDateString()} ➔ {new Date(createdMeeting.dateTo).toDateString()}
//                         </div>
//                         <div className="meeting-title">
//                             {createdMeeting.title}
//                         </div>
//                         <div className="meeting-owner">
//                             Organizer: {createdMeeting.ownerName}
//                         </div>
//                         <div className="meeting-times">
//                             {createdMeeting.options.map((opt, idx) => (
//                                 <div key={idx}>
//                                     Time: {opt.startTime}:00 - {opt.endTime}:00
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//         </div>
//     );
// }

// export default MeetingInfo;

import "./MeetingInfo.css";
import { IMeeting } from "../models";

interface MeetingInfoProps {
  createdMeeting: IMeeting;
}

function MeetingInfo({ createdMeeting }: MeetingInfoProps) {
  return (
    <div className="meeting-container">
      <h2 className="meetings-header">Meetings</h2>
      <div key={createdMeeting.id} className="meeting-card">
        <div className="meeting-info">
          <div className="meeting-dates">
            {new Date(createdMeeting.dateFrom).toDateString()} ➔ {new Date(createdMeeting.dateTo).toDateString()}
          </div>
          <div className="meeting-title">{createdMeeting.title}</div>
          <div className="meeting-owner">Organizer: {createdMeeting.ownerName}</div>
        </div>
      </div>
    </div>
  );
}

export default MeetingInfo;
