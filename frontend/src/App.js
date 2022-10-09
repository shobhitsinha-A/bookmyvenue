import React from "react";
import LandingPage from "./pages/LandingPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";

export default () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/profile" element={<ProfilePage />}/>
        </Routes>
    </Router>
)
