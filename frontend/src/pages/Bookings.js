import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Timeline, Event } from "react-timeline-scribble";
import Sidebar from "../components/sidebar/Sidebar";
import AnimatedContainer from "../helpers/AnimatedContainer";
import moment from "moment";
import '../css/ReservationHistory.css';

export default () => {
    const [reservations, setReservations] = useState([]);
    async function getUpcomingReservations() {
        let response = await fetch('https://bookmyvenue.live:6969/reservations/availability/venues/host/' + sessionStorage.getItem('user_name'), {
            method: 'GET'
        });
        let jsonResponse = await response.json();
        if (jsonResponse.status) {
            setReservations(jsonResponse.data.details.reservations);
        }
    }
    useEffect(() => {
        getUpcomingReservations().catch(console.error);
    }, []);
    async function cancelReservation(reservation_id) {
        let response = await fetch('https://bookmyvenue.live:6969/reservations/reservation/cancel/' + reservation_id, {
            method: 'GET'
        });
        let jsonResponse = await response.json();
        if (jsonResponse.status) {
            alert('Reservation cancelled successfully');
            getUpcomingReservations().catch(console.error);
        }
    }
    const navigate = useNavigate();
    if (sessionStorage.getItem('user_name')) {
        return (
            <div className="bg-blueGray-600">
                <AnimatedContainer>
                    <Sidebar role={sessionStorage.getItem('role')} />
                    <div style={{paddingLeft: '16rem'}}>
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                                        <div className="text-center flex justify-between">
                                            <h6 className="text-blueGray-700 text-xl font-bold">Upcoming Bookings</h6>
                                        </div>
                                    </div>
                                    <div>
                                        <Timeline>
                                            {reservations.map(reservation => (
                                                <Event interval={moment(reservation.date).format('MMMM Do YYYY')} title={reservation.event_name}
                                                       subtitle={'From ' + reservation.start_time + ' to ' + reservation.end_time}>
                                                    <div className="flex flex-row">
                                                        <div className="flex flex-col">
                                                            <p>at {reservation.venue_name} by {reservation.user_id}</p>
                                                            <p>{reservation.description}</p>
                                                        </div>
                                                        <div className="flex flex-row ml-auto reservation-controls">
                                                            <div className="mx-2">
                                                                <button
                                                                    className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                                    type="button"
                                                                    onClick={() => cancelReservation(reservation.id)}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Event>
                                            ))}
                                        </Timeline>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedContainer>
            </div>
        );
    } else {
        navigate('/login');
    }
}