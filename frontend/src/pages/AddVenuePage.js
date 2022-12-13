import React, {useState} from "react";
import AnimatedContainer from "../helpers/AnimatedContainer";
import Sidebar from "../components/sidebar/Sidebar";
import {Select, MenuItem, FormControl}from "@mui/material";


export default () => {
    const [category, setCategory] = useState('weddings');
    const [avail, setAvail] = useState('1');
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleAvailChange = (event) => {
        setAvail(event.target.value);
    };

    let validateAndAddVenue = async () => {
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
            method: 'POST',
            body: JSON.stringify({
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
        if (jsonResponse.status) {
            let body = new FormData();
            let venue_image = document.forms['image-form']['venue-image'].files[0];
            body.append('image', venue_image)
            let imageResponse = await fetch('https://bookmyvenue.live:6969/venues/' + jsonResponse.data.details.venue_id + '/images', {
                method: 'POST',
                body: body
            })
            let jsonImageResponse = await imageResponse.json();
            if (jsonImageResponse.status) {
                alert("Venue added successfully");
                window.location.href = "/myvenues";
            }
        } else {
            alert("There was an error when creating your venue");
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
                                            <h6 className="text-blueGray-700 text-xl font-bold">Add Venue</h6>
                                            <button
                                                className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={validateAndAddVenue}
                                            >
                                                Submit
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
                                                            htmlFor="grid-password"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           id="title"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Price
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           id="price"
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
                                                            type="number"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           id="capacity"
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
                                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 128 }}>
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
                                                        </FormControl>
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
                                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 128 }}>
                                                            <Select
                                                                id="avail-select"
                                                                value={avail}
                                                                label="Category"
                                                                onChange={handleAvailChange}
                                                            >
                                                                <MenuItem value={'1'}>Available</MenuItem>
                                                                <MenuItem value={'0'}>Not Available</MenuItem>
                                                            </Select>
                                                        </FormControl>
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
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           id="address"
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
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           id="city"
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
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           id="state"
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
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           id="zipcode"
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
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           id="phone_number"
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
                                                        type="text"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                       id="description"
                                                        rows="4"
                                                    ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <form encType="multipart/form-data" name="image-form">
                                            <hr className="mt-6 border-b-1 border-blueGray-300"/>

                                            <h6 className="text-blueGray-400 text-sm my-3 font-bold uppercase">
                                                Upload Image
                                            </h6>
                                            <div className="flex flex-wrap">
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <input
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            type="file"
                                                            name="venue-image"
                                                        />
                                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">PNG or JPG (Max 2 MB).</p>
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