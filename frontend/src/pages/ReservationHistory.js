import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Timeline, Event } from "react-timeline-scribble";
import Sidebar from "../components/sidebar/Sidebar";
import AnimatedContainer from "../helpers/AnimatedContainer";
import moment from "moment";

export default () => {
    const [reservations, setReservations] = useState([]);
    useEffect(() => {
        async function getUpcomingReservations() {
            let response = await fetch('http://bookmyvenue.live:6969/reservations/user/' + sessionStorage.getItem('user_name'), {
                method: 'GET'
            });
            let jsonResponse = await response.json();
            if (jsonResponse.status) {
                setReservations(jsonResponse.data.details.reservations);
            }
        }
        getUpcomingReservations().catch(console.error);
    }, []);
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
                                            <h6 className="text-blueGray-700 text-xl font-bold">Upcoming Reservations</h6>
                                        </div>
                                    </div>
                                    <div>
                                        <Timeline>
                                            {reservations.map(reservation => (
                                                <Event interval={moment(reservation.date).format('MMMM Do YYYY')} title={reservation.event_name}
                                                       subtitle={'From ' + reservation.start_time + ' to ' + reservation.end_time}>
                                                    {reservation.description}
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