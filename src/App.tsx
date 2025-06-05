import {Routes, Route, Navigate} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import MeetingCreator from "./components/MeetingCreator/MeetingCreator";
import MeetingPage from "./components/MeetingPage/MeetingPage";

function App() {
    return (
        <AuthProvider>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard/>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/createMeeting"
                    element={
                        <PrivateRoute>
                            <MeetingCreator/>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/meeting/:id"
                    element={
                        <PrivateRoute>
                            <MeetingPage/>
                        </PrivateRoute>
                    }
                />

                <Route path="/" element={<Navigate to="/dashboard"/>}/>
                <Route path="*" element={<p>404: Not Found</p>}/>
            </Routes>
        </AuthProvider>
    );
}

export default App;
