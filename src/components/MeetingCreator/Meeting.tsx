import "./Meeting.css";
import { useState } from "react";
import { IMeeting } from "../../interfaces";
import { useNavigate } from "react-router";
import { format } from "date-fns";

interface MeetingProps {
  startDate: Date | null;
  endDate: Date | null;
  createdMeeting: IMeeting | null;
  setcreatedMeeting: (meeting: IMeeting | null) => void;
}

function Meeting({
  startDate,
  endDate,
  createdMeeting,
  setcreatedMeeting,
}: MeetingProps) {
  const navigate = useNavigate();
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
      id: "",
      title: title,
      ownerName: ownerName,
      description: description,
      dateFrom: format(startDate, "yyyy-MM-dd"),
      dateTo: format(endDate, "yyyy-MM-dd"),
      optionIds: [],
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
        //window.open(`http://localhost:3000/meeting/${data.id}`)
        navigate(`/meeting/${data.id}`);
        // setcreatedMeeting(data);
      })
      .catch((error) => {
        console.error("Error creating meeting:", error);
        alert(
          "Failed to create meeting. Please check the console for details."
        );
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
