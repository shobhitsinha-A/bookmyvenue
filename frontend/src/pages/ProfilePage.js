import React from "react";
import AnimatedContainer from "../helpers/AnimatedContainer";
import Sidebar from "../components/sidebar/Sidebar";

export default () => {
    if (sessionStorage.getItem('user_name')) {
        return (
            <div className="bg-blueGray-600">
                <AnimatedContainer>
                    <Sidebar role={sessionStorage.getItem('role')} />
                    <div style={{paddingLeft: '16rem'}}>
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div
                                    className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                                        <div className="text-center flex justify-between">
                                            <h6 className="text-blueGray-700 text-xl font-bold">Profile</h6>
                                        </div>
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <form>
                                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
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
                                                            defaultValue="team.15"
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
                                                            defaultValue="team15@bookmyvenue.com"
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
                                                            defaultValue="Team"
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
                                                            defaultValue="15"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="mt-6 border-b-1 border-blueGray-300"/>

                                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                                Contact Information
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
                                                            defaultValue="1000 N Main St"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            City
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                            defaultValue="Bloomington"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 px-4">
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
                                                            defaultValue="47408"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 px-4">
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
                                                            defaultValue="(812) 555-1337"
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
