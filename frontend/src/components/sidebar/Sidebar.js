import React from "react";
import {Link} from "react-router-dom";

export default (props) => {
    return (
        props.role === "HOST" ?
            <div>
                <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between fixed md:w-64 z-10 py-4 px-6">
                    <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                        <Link
                            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm font-bold p-4 px-0"
                            to="/"
                        >
                            BookMyVenue
                        </Link>

                        <div
                            className={
                                "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded "
                            }
                        >
                            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                                <li className="items-center">
                                    <Link
                                        className={"text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-lightBlue-600"}
                                        to="/profile"
                                    >
                                        <i
                                            className={"fas fa-user mr-2 text-sm opacity-75"}
                                        ></i>{" "}
                                        Profile
                                    </Link>
                                </li>
                                <li className="items-center">
                                    <Link
                                        className={"text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-lightBlue-600"}
                                        to="/addvenue"
                                    >
                                        <i
                                            className={"fas fa-edit mr-2 text-sm opacity-75"}
                                        ></i>{" "}
                                        Add Venue
                                    </Link>
                                </li>
                                <li className="items-center">
                                    <Link
                                        className={"text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-lightBlue-600"}
                                        to="/myvenues"
                                    >
                                        <i
                                            className={"fas fa-address-book mr-2 text-sm opacity-75"}
                                        ></i>{" "}
                                        My Venues
                                    </Link>
                                </li>
                                <li className="items-center">
                                    <Link
                                        className={"text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-lightBlue-600"}
                                        to="/bookings"
                                    >
                                        <i
                                            className={"fas fa-hotel mr-2 text-sm opacity-75"}
                                        ></i>{" "}
                                        Bookings
                                    </Link>
                                </li>
                                <li className="items-center">
                                    <Link
                                        className={"text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-lightBlue-600"}
                                        to="/chat"
                                    >
                                        <i
                                            className={"fas fa-comments mr-2 text-sm opacity-75"}
                                        ></i>{" "}
                                        Inbox
                                    </Link>
                                </li>
                                <li className="items-center">
                                    <Link
                                        className={"text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-lightBlue-600"}
                                        to="/logout"
                                    >
                                        <i
                                            className={"fas fa-power-off mr-2 text-sm opacity-75"}
                                        ></i>{" "}
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
            : <div>
                <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between fixed md:w-64 z-10 py-4 px-6">
                    <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                        <Link
                            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm font-bold p-4 px-0"
                            to="/"
                        >
                            BookMyVenue
                        </Link>

                        <div
                            className={
                                "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded "
                            }
                        >
                            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                                <li className="items-center">
                                    <Link
                                        className={"text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-lightBlue-600"}
                                        to="/profile"
                                    >
                                        <i
                                            className={"fas fa-user mr-2 text-sm opacity-75"}
                                        ></i>{" "}
                                        Profile
                                    </Link>
                                </li>
                                <li className="items-center">
                                    <Link
                                        className={"text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-lightBlue-600"}
                                        to="/search"
                                    >
                                        <i
                                            className={"fas fa-search mr-2 text-sm opacity-75"}
                                        ></i>{" "}
                                        Search
                                    </Link>
                                </li>
                                <li className="items-center">
                                    <Link
                                        className={"text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-lightBlue-600"}
                                        to="/favorites"
                                    >
                                        <i
                                            className={"fas fa-bookmark mr-2 text-sm opacity-75"}
                                        ></i>{" "}
                                        Favorites
                                    </Link>
                                </li>
                                <li className="items-center">
                                    <Link
                                        className={"text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-lightBlue-600"}
                                        to="/reservations"
                                    >
                                        <i
                                            className={"fas fa-hotel mr-2 text-sm opacity-75"}
                                        ></i>{" "}
                                        Reservations
                                    </Link>
                                </li>
                                <li className="items-center">
                                    <Link
                                        className={"text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-lightBlue-600"}
                                        to="/ratings"
                                    >
                                        <i
                                            className={"fas fa-star mr-2 text-sm opacity-75"}
                                        ></i>{" "}
                                        Ratings
                                    </Link>
                                </li>
                                <li className="items-center">
                                    <Link
                                        className={"text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-lightBlue-600"}
                                        to="/chat"
                                    >
                                        <i
                                            className={"fas fa-comments mr-2 text-sm opacity-75"}
                                        ></i>{" "}
                                        Inbox
                                    </Link>
                                </li>
                                <li className="items-center">
                                    <Link
                                        className={"text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-lightBlue-600"}
                                        to="/logout"
                                    >
                                        <i
                                            className={"fas fa-power-off mr-2 text-sm opacity-75"}
                                        ></i>{" "}
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
    );
}