import React from "react";
import LandingPage from "./pages/LandingPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";

export default () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/newpassword" element={<NewPassword />} />
        </Routes>
    </Router>
)
