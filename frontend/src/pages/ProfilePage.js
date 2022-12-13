import React, { useState, useEffect } from "react";
import AnimatedContainer from "../helpers/AnimatedContainer";
import Sidebar from "../components/sidebar/Sidebar";

export default () => {
    const [profile, setProfile] = useState({});
    async function getProfile() {
        let response = await fetch('https://bookmyvenue.live:5000/user/profile/details/' + sessionStorage.getItem('user_name'), {
            method: 'GET'
        });
        let jsonResponse = await response.json();
        if (jsonResponse.status) {
            setProfile(jsonResponse.data.user[0]);
        }
    }
    useEffect(() => {
        getProfile().catch(console.error);
    }, []);
    let validateAndUpdateProfile = async () => {
        let first_name = document.getElementById('first_name');
        let last_name = document.getElementById('last_name');
        let email = document.getElementById('email');
        let phone_no = document.getElementById('phone_no');
        let response = await fetch('https://bookmyvenue.live:6969/venues', {
            method: 'PUT',
            body: JSON.stringify({
                "user_name": sessionStorage.getItem('user_name'),
                "first_name" : first_name,
                "last_name" : last_name,
                "email" : email,
                "phone_no" : phone_no
            })
        });
        let jsonResponse = await response.json();
        if (jsonResponse.data === 1) {
            alert("Profile updated successfully");
            getProfile().catch(console.error);
        } else {
            alert("There was an error when updating your venue");
        }
    }
    if (sessionStorage.getItem('user_name')) {
        return (
            <div className="bg-blueGray-600">
                <AnimatedContainer>
                    <Sidebar role={sessionStorage.getItem('role')} />
                    <div style={{paddingLeft: '16rem'}}>
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div
                                    className="relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                                        <div className="text-center flex justify-between">
                                            <h6 className="text-blueGray-700 text-xl font-bold">Profile</h6>
                                            <button
                                                className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={validateAndUpdateProfile}
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <form>
                                            <h6 className="text-blueGray-400 text-sm my-3 font-bold uppercase">
                                                User Details
                                            </h6>
                                            <div className="flex flex-wrap">
                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Username
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue={profile.user_name}
                                                            id={"user_name"}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Email address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue={profile.email}
                                                            id={"email"}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            First Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue={profile.first_name}
                                                            id={"first_name"}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Last Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue={profile.last_name}
                                                            id={"last_name"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="mt-6 border-b-1 border-blueGray-300"/>

                                            <h6 className="text-blueGray-400 text-sm my-3 font-bold uppercase">
                                                Contact Information
                                            </h6>
                                            <div className="flex flex-wrap">
                                                <div className="w-full px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Mobile Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue={profile.phone_no}
                                                            id={"phone_no"}
                                                        />
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
