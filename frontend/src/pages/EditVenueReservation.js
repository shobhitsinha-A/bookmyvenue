import React, {useEffect, useState} from "react";
import Footer from "../components/footers/Footer";
import moment from "moment";
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TimePicker } from "@mui/x-date-pickers";
import Navbar from "../components/navbar/Navbar";

const isBooked = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
};

export default () => {
    const [date, setDate] = useState(moment());
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [venue, setVenue] = useState({});
    const [reservation, setReservation] = useState({});
    const [bookmarked, setBookmarked] = useState(false);
    async function getBookmark(venueId) {
        let response = await fetch('https://bookmyvenue.live:6969/venues/bookmarks/' + sessionStorage.getItem('user_name') + '/' + venueId, {
            method: 'GET'
        });
        let jsonResponse = await response.json();
        if (jsonResponse.status) {
            setBookmarked(jsonResponse.data.is_bookmarked);
        }
    }
    async function createBookmark(userId, venueId) {
        let response = await fetch('https://bookmyvenue.live:6969/venues/bookmarks', {
            method: 'POST',
            body: JSON.stringify({
                user_id: userId,
                venue_id: venueId
            })
        });
        let jsonResponse = await response.json();
        if (jsonResponse.data.details) {
            alert('Bookmark created successfully');
            setBookmarked(true);
        }
    }
    async function deleteBookmark(userId, venueId) {
        let response = await fetch('https://bookmyvenue.live:6969/venues/bookmarks/' + userId + '/' + venueId, {
            method: 'DELETE'
        });
        let jsonResponse = await response.json();
        if (jsonResponse.data.details === 1) {
            alert('Bookmark deleted successfully');
            setBookmarked(false);
        }
    }
    async function getReservationDetails() {
        let response = await fetch('https://bookmyvenue.live:6969/reservations/'.concat(sessionStorage.getItem('editReservationId')), {
            method: 'GET'
        });
        let jsonResponse = await response.json();
        if (jsonResponse.status) {
            setReservation(jsonResponse.data.details.reservation[0]);
        }
    }
    useEffect(() => {
        async function getVenueDetails() {
            let response = await fetch('https://bookmyvenue.live:6969/venues/'.concat(sessionStorage.getItem('venueId')), {
                method: 'GET'
            });
            let jsonResponse = await response.json();
            if (jsonResponse.status) {
                setVenue(jsonResponse.data.details[0]);
                getReservationDetails().catch(console.error);
                getBookmark(jsonResponse.data.details[0].id).catch(console.error);
            }
        }
        getVenueDetails().catch(console.error);
    }, []);
    let getImageFromResults = (id, images) => {
        if (images) {
            if (images.length > 0) {
                return 'https://bookmyvenue.live:6969/images/' + id + '/' + images[0]['image_name'];
            }
            else return '';
        }
        else return '';
    }
    let validateAndUpdateReservation = async () => {
        const event_name = document.getElementById("event_name").value;
        const expected_no_of_people = document.getElementById("expected_no_of_people").value;
        const description = document.getElementById("description").value;
        const user_id = sessionStorage.getItem("user_name");
        const venue_id = sessionStorage.getItem("venueId");
        const is_cancelled = '0';
        const start_time = moment(startTime).format('hh:mm a');
        const end_time = moment(endTime).format('hh:mm a');
        const event_date = moment(date).format('YYYY-MM-DD');
        let response = await fetch('https://bookmyvenue.live:6969/reservations', {
            method: 'PUT',
            body: JSON.stringify({
                "reservation_id": sessionStorage.getItem('editReservationId'),
                "venue_id": venue_id,
                "user_id": user_id,
                "event_name": event_name,
                "expected_no_of_people": expected_no_of_people,
                "date": event_date,
                "start_time": start_time,
                "end_time": end_time,
                "description": description,
                "is_cancelled": is_cancelled
            })
        });
        let jsonResponse = await response.json();
        if (jsonResponse.status) {
            alert("Reservation edited successfully");
            window.location.href = "/reservations";
        } else {
            alert("There was an error when editing the reservation");
        }
    }
    if (sessionStorage.getItem('user_name')) {
        return (
            <div>
                <main className="profile-page">
                    <Navbar />
                    <section className="relative block h-500-px">
                        <div
                            className="absolute top-0 w-full h-full bg-center bg-cover"
                            style={{
                                backgroundImage:
                                    "url('https://ralphdeal.com/wp-content/uploads/2019/02/loews_venuepage-6.jpg')",
                            }}
                        >
            <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
            ></span>
                        </div>
                        <div
                            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                            style={{transform: "translateZ(0)"}}
                        >
                            <svg
                                className="absolute bottom-0 overflow-hidden"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                                version="1.1"
                                viewBox="0 0 2560 100"
                                x="0"
                                y="0"
                            >
                                <polygon
                                    className="text-blueGray-200 fill-current"
                                    points="2560 0 2560 100 0 100"
                                ></polygon>
                            </svg>
                        </div>
                    </section>
                    <section className="relative py-16 bg-blueGray-200">
                        <div className="container mx-auto px-4">
                            <div
                                className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                            <div className="relative">
                                                <img
                                                    alt="..."
                                                    src={getImageFromResults(venue.id, venue.venue_images)}
                                                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                            <div className="py-6 px-3 mt-32 sm:mt-0">
                                                <button
                                                    className="bg-purple-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={validateAndUpdateReservation}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">

                                                <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {venue.rating}
                        </span>
                                                    <span className="text-sm text-blueGray-400">
                          Rating
                        </span>
                                                </div>
                                                <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {venue.capacity}
                        </span>
                                                    <span className="text-sm text-blueGray-400">
                          Capacity
                        </span>
                                                </div>
                                                {bookmarked ?
                                                    <div className="mr-4 p-3 text-center" onClick={() => deleteBookmark(sessionStorage.getItem('user_name'), venue.id)}>
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          <i
                              className={"fas fa-bookmark mr-2 text-sm opacity-75"}
                          ></i>
                        </span>
                                                        <span className="text-sm text-blueGray-400">
                          Favorite
                        </span>
                                                    </div>:
                                                    <div className="mr-4 p-3 text-center" onClick={() => createBookmark(sessionStorage.getItem('user_name'), venue.id)}>
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          <i
                              className={"far fa-bookmark mr-2 text-sm opacity-75"}
                          ></i>
                        </span>
                                                        <span className="text-sm text-blueGray-400">
                          Favorite
                        </span>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-12">
                                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                            {venue.name}
                                        </h3>
                                        <div
                                            className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                                            {venue.city + ', ' + venue.state}
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-10">
                                            <i className="fas fa-dollar-sign mr-2 text-lg text-blueGray-400"></i>
                                            {venue.price}
                                        </div>
                                    </div>
                                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <StaticDatePicker
                                                        orientation="landscape"
                                                        openTo="day"
                                                        value={date}
                                                        shouldDisableDate={isBooked}
                                                        onChange={(newDate) => {
                                                            setDate(newDate);
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                                    <form>
                                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                                            Event Details
                                                        </h6>
                                                        <div className="flex flex-wrap">
                                                            <div className="w-full lg:w-6/12 px-4">
                                                                <div className="relative w-full mb-3">
                                                                    <label
                                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                        htmlFor="grid-password"
                                                                    >
                                                                        Event Name
                                                                    </label>
                                                                    <input
                                                                        id="event_name"
                                                                        type="text"
                                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                        defaultValue={reservation.event_name}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="w-full lg:w-6/12 px-4">
                                                                <div className="relative w-full mb-3">
                                                                    <label
                                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                        htmlFor="grid-password"
                                                                    >
                                                                        Expected No. of People
                                                                    </label>
                                                                    <input
                                                                        id="expected_no_of_people"
                                                                        type="number"
                                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                        defaultValue={reservation.expected_no_of_people}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="w-full lg:w-6/12 px-4">
                                                                <div className="relative w-full mb-3">
                                                                    <label
                                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                        htmlFor="grid-password"
                                                                    >
                                                                        Start Time
                                                                    </label>
                                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <TimePicker
                                                                            value={startTime}
                                                                            onChange={(newStartTime) => {
                                                                                setStartTime(newStartTime);
                                                                            }}
                                                                            renderInput={(params) =>
                                                                                <TextField {...params} />}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </div>
                                                            </div>
                                                            <div className="w-full lg:w-6/12 px-4">
                                                                <div className="relative w-full mb-3">
                                                                    <label
                                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                        htmlFor="grid-password"
                                                                    >
                                                                        End Time
                                                                    </label>
                                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <TimePicker
                                                                            value={endTime}
                                                                            onChange={(newEndTime) => {
                                                                                setEndTime(newEndTime);
                                                                            }}
                                                                            renderInput={(params) =>
                                                                                <TextField {...params} />}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <hr className="mt-6 border-b-1 border-blueGray-300"/>

                                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                                            Description
                                                        </h6>
                                                        <div className="flex flex-wrap">
                                                            <div className="w-full lg:w-12/12 px-4">
                                                                <div className="relative w-full mb-3">
                                                    <textarea
                                                        id="description"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        rows="4"
                                                        defaultValue={reservation.description}
                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer/>
            </div>

        );
    } else {
        window.location.href = '/login';
    }
}
