import React from "react";
import LandingPage from "./pages/LandingPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import VenueDetails from "./pages/VenueDetails";
import OAuthSignUp from "./pages/OAuthSignUp";
import AddVenue from "./pages/AddVenuePage";
import MyVenues from "./pages/MyVenues";
import FavoriteVenues from "./pages/FavoriteVenues";
import VenueReservation from "./pages/VenueReservation";
import ReservationHistory from "./pages/ReservationHistory";
import Chat from "./pages/ChatPage";
import Logout from "./pages/Logout";
import EditVenue from "./pages/EditVenuePage";
import RatingsPage from "./pages/RatingsPage";
import BookingsPage from "./pages/Bookings";
import EditVenueReservation from "./pages/EditVenueReservation";

export default () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/oauth" element={<OAuthSignUp />} />
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="/venue" element={<VenueDetails />} />
            <Route path="/addvenue" element={<AddVenue />} />
            <Route path="/myvenues" element={<MyVenues />} />
            <Route path="/favorites" element={<FavoriteVenues />} />
            <Route path="/reserve" element={<VenueReservation />} />
            <Route path="/reservations" element={<ReservationHistory />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/editvenue" element={<EditVenue />} />
            <Route path="/ratings" element={<RatingsPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/editreservation" element={<EditVenueReservation />} />
        </Routes>
    </Router>
)
