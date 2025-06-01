// import "./Meeting.css";
// import { useState } from "react";
// import { IOption, IMeeting } from "../models";
// import Option from "./Option";
// import OptionCreator from "./OptionCreator";

// interface MeetingProps {
//     startDate: Date | null;
//     endDate: Date | null;
//     createdMeeting: IMeeting | null;
//     setcreatedMeeting: (meeting:IMeeting | null)=>void;
// }

// function Meeting({ startDate, endDate,createdMeeting, setcreatedMeeting }: MeetingProps) {
//     const [options, setOptions] = useState<Array<IOption>>([]);
//     const [title, setTitle] = useState<string>("");
//     const [ownerName, setOwnerName] = useState<string>("");
    
//     const createMeeting = () => {
//         if (!startDate || !endDate) {
//             alert("You must select start and end date first!");
//             return;
//         }
//         if (!title || !ownerName) {
//             alert("You must enter title and owner name!");
//             return;
//         }
        
//         const newMeeting: IMeeting = {
//             id: crypto.randomUUID(),
//             title: title,
//             ownerName: ownerName,
//             dateFrom: startDate.toISOString(),
//             dateTo: endDate.toISOString(),  
//             options: options.map(opt => ({ ...opt }))
//         };

//         setcreatedMeeting(newMeeting);
//         // if(createMeeting == null)   
//         //     fetch("fkhiretke",{method:"POST", body: {"data" : newMeeting}})
//         // else 
//         //     fetch("fkhiretke",{method:"PUT", body: {"data" : newMeeting}})
//     };

//     return (
//         <div className="meeting-container">
//             {startDate && endDate ? (
//                 <>
//                     <div className="form-section">
//                         <div className="label-input">
//                         <label>Meeting Title:</label>
//                         <input
//                             type="text"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             placeholder="Enter meeting title"
//                             className="input-field"
//                         />
//                         </div>

//                         <div className="label-input">
//                         <label>Owner Name:</label>
//                         <input
//                             type="text"
//                             value={ownerName}
//                             onChange={(e) => setOwnerName(e.target.value)}
//                             placeholder="Enter owner name"
//                             className="input-field"
//                         />
//                         </div>

//                         <button className="create-button" onClick={createMeeting} disabled={!options.length}>Create Meeting</button>
//                     </div>

//                     <div className="options-section">
//                         {options.map((option: IOption) => (
//                             <Option
//                                 key={option.id}
//                                 option={option}
//                                 options={options}
//                                 setOptions={setOptions}
//                             />
//                         ))}
//                         <OptionCreator options={options} setOptions={setOptions} />
//                     </div>
//                 </>
//             ) : (
//                 <p>Please select a start and end date first!</p>
//             )}
//         </div>
//     );
// }

// export default Meeting;


import "./Meeting.css";
import { useState } from "react";
import { IMeeting } from "../models";

interface MeetingProps {
  startDate: Date | null;
  endDate: Date | null;
  createdMeeting: IMeeting | null;
  setcreatedMeeting: (meeting: IMeeting | null) => void;
}

function Meeting({ startDate, endDate, createdMeeting, setcreatedMeeting }: MeetingProps) {
  const [title, setTitle] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  let user;
//   fetch("server dai mi potrebitel")
//   .then(response=>{
//     if(response.ok)
//         return response.json()
//     if(response.status >= 300 && response.status < 400 )
//         window.open("/login");
//   })
//   .then(data=>{
//     user = data;
//   })
//   .catch(error=>{
//     window.open("/");
//   })
  const createMeeting = async () => {
    if (!startDate || !endDate) {
      alert("You must select start and end date first!");
      return;
    }
    if (!title || !ownerName) {
      alert("You must enter title and owner name!");
      return;
    }

    const newMeeting: IMeeting = {
      id:"",
      title: title,
      ownerName: ownerName,
      description: description,
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString()
    };

  fetch("https://webtech-doodle-f3165275f403.herokuapp.com/api/meetings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMeeting),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed. Please try again.");
      }
      return response.json();
    })
    .then((data) => {
        window.open(`http://localhost:3000/meeting/${data.id}`)
        // setcreatedMeeting(data);
    })
    .catch((error) => {
       console.error("Error creating meeting:", error);
      alert("Failed to create meeting. Please check the console for details.");
    });
  };

  return (
    <div className="meeting-container">
        <div className="form-section">
            <div className="label-input">
                <label>Meeting Title:</label>
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter meeting title"
                className="input-field"
                />
            </div>

            <div className="label-input">
                <label>Owner Name:</label>
                <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Enter owner name"
                className="input-field"
                />
                {/* <label>{user.name}</label> */}
            </div>

            <div className="label-input descCont">
                <label>Discription:</label>
                <textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="input-field"
                />
            </div>


            <button className="create-button" onClick={createMeeting}>
                Create Meeting
            </button>
        </div>
    </div>
  );
}

export default Meeting;
