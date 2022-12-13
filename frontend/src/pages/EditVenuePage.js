import React, {useEffect, useState} from "react";
import AnimatedContainer from "../helpers/AnimatedContainer";
import Sidebar from "../components/sidebar/Sidebar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default () => {
    const [venue, setVenue] = useState({});
    const [category, setCategory] = useState('');
    const [avail, setAvail] = useState('');
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleAvailChange = (event) => {
        setAvail(event.target.value);
    };
    useEffect(() => {
        async function getVenueDetails() {
            let response = await fetch('https://bookmyvenue.live:6969/venues/' + sessionStorage.getItem('editVenueId'), {
                method: 'GET'
            });
            let jsonResponse = await response.json();
            if (jsonResponse.status) {
                setVenue(jsonResponse.data.details[0]);
                setCategory(jsonResponse.data.details[0].category);
                setAvail(jsonResponse.data.details[0].is_available);
            }
        }
        getVenueDetails().catch(console.error);
    }, []);
    let deleteVenue = async () => {
        let response = await fetch('https://bookmyvenue.live:6969/venues/' + sessionStorage.getItem('editVenueId'), {
            method: 'DELETE'
        });
        let jsonResponse = await response.json();
        if (jsonResponse.status) {
            alert('Venue deleted successfully');
            window.location.href = "/myvenues";
        }
    }
    let validateAndUpdateVenue = async () => {
        const title = document.getElementById("title").value;
        const price = document.getElementById("price").value;
        const capacity = document.getElementById("capacity").value;
        const address = document.getElementById("address").value;
        const created_by = sessionStorage.getItem("user_name");
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const zipcode = document.getElementById("zipcode").value;
        const phone_number = document.getElementById("phone_number").value;
        const description = document.getElementById("description").value;
        const venue_category = category;
        const rating = '0';
        const availability = avail;
        let response = await fetch('https://bookmyvenue.live:6969/venues', {
            method: 'PUT',
            body: JSON.stringify({
                "id": sessionStorage.getItem('editVenueId'),
                "name" : title,
                "price" : price,
                "capacity" : capacity,
                "address" : address,
                "created_by" : created_by,
                "city" : city,
                "state" : state,
                "zipcode": zipcode,
                "phone_number": phone_number,
                "description": description,
                "category": venue_category,
                "rating": rating,
                "is_available": availability
            })
        });
        let jsonResponse = await response.json();
        console.log(jsonResponse.data.details);
        if (jsonResponse.status) {
            alert("Venue updated successfully");
            window.location.href = "/myvenues";
        } else {
            alert("There was an error when updating your venue");
        }
    }
    if (sessionStorage.getItem('user_name')) {
        return (
            <div className="bg-blueGray-600">
                <AnimatedContainer>
                    <Sidebar role={sessionStorage.getItem('role')}/>
                    <div style={{paddingLeft: '16rem'}}>
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <div
                                    className="relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                                        <div className="text-center flex justify-between">
                                            <h6 className="text-blueGray-700 text-xl font-bold">Edit Venue</h6>
                                            <button
                                                className="ml-auto bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={deleteVenue}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={validateAndUpdateVenue}
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <form>
                                            <h6 className="text-blueGray-400 text-sm my-3 font-bold uppercase">
                                                Basic Details
                                            </h6>
                                            <div className="flex flex-wrap">
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            id="title"
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue={venue.name}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        >
                                                            Price
                                                        </label>
                                                        <input
                                                            id="price"
                                                            type="number"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue={venue.price}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Capacity
                                                        </label>
                                                        <input
                                                            id="capacity"
                                                            type="number"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue={venue.capacity}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Category
                                                        </label>
                                                        <Select
                                                            id="category-select"
                                                            value={category}
                                                            label="Category"
                                                            onChange={handleCategoryChange}
                                                        >
                                                            <MenuItem value={'weddings'}>Weddings</MenuItem>
                                                            <MenuItem value={'meetings'}>Meetings</MenuItem>
                                                            <MenuItem value={'celebrations'}>Celebrations</MenuItem>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Availability
                                                        </label>
                                                        <Select
                                                            id="avail-select"
                                                            value={avail}
                                                            label="Category"
                                                            onChange={handleAvailChange}
                                                        >
                                                            <MenuItem value={'1'}>Available</MenuItem>
                                                            <MenuItem value={'0'}>Not Available</MenuItem>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="mt-6 border-b-1 border-blueGray-300"/>

                                            <h6 className="text-blueGray-400 text-sm my-3 font-bold uppercase">
                                                Location & Contact Information
                                            </h6>
                                            <div className="flex flex-wrap">
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Address
                                                        </label>
                                                        <input
                                                            id="address"
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue={venue.address}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            City
                                                        </label>
                                                        <input
                                                            id="city"
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue={venue.city}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            State
                                                        </label>
                                                        <input
                                                            id="state"
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue={venue.state}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Zip Code
                                                        </label>
                                                        <input
                                                            id="zipcode"
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue={venue.zipcode}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            id="phone_number"
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue={venue.phone_number}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="mt-6 border-b-1 border-blueGray-300"/>

                                            <h6 className="text-blueGray-400 text-sm my-3 font-bold uppercase">
                                                Description
                                            </h6>
                                            <div className="flex flex-wrap">
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                    <textarea
                                                        id="description"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue={venue.description}
                                                        rows="4"
                                                    ></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="mt-6 border-b-1 border-blueGray-300"/>

                                            <h6 className="text-blueGray-400 text-sm my-3 font-bold uppercase">
                                                Upload Image
                                            </h6>
                                            <div className="flex flex-wrap">
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <input
                                                            name=""
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            type="file"/>
                                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                                           id="file_input_help">PNG or JPG (Max 2 MB).</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedContainer>
            </div>
        );
    } else {
        window.location.href = '/login';
    }
}