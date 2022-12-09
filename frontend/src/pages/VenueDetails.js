import React, {useEffect, useState} from "react";
import Footer from "../components/footers/Footer";
import Map from "../components/map/Map";

let getImageFromResults = (id, images) => {
    if (images) {
        if (images.length > 0) {
            return 'http://bookmyvenue.live:6969/images/' + id + '/' + images[0]['image_name'];
        }
        else return '';
    }
    else return '';
}

export default () => {
    const [venue, setVenue] = useState({});
    useEffect(() => {
        async function getVenueDetails() {
            let response = await fetch('http://bookmyvenue.live:6969/venues/'.concat(sessionStorage.getItem('venueId')), {
                method: 'GET'
            });
            let jsonResponse = await response.json();
            if (jsonResponse.status) {
                setVenue(jsonResponse.data.details[0]);
            }
        }
        getVenueDetails().catch(console.error);
    }, []);
    return (
        <div>
            <main className="profile-page">
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
                        style={{ transform: "translateZ(0)" }}
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
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
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
                                                onClick={() => {window.location.href = "/reserve"}}
                                            >
                                                Reserve
                                            </button>
                                            <button
                                                className="bg-purple-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => {window.location.href = "/chat"}}
                                            >
                                                Contact
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
                                            <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          <i
                              className={"fas fa-bookmark mr-2 text-sm opacity-75"}
                          ></i>
                        </span>
                                                <span className="text-sm text-blueGray-400">
                          Favorite
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        {venue.name}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
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
                                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                {venue.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <Map />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
