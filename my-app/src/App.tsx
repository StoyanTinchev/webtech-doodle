import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MeetingPage from "./components/MeetingPage/MeetingPage";
import React from "react";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <React.Fragment>
      <MeetingPage></MeetingPage>
    </React.Fragment>
  );
}

export default App;
