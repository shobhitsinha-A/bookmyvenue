import React from "react";
import AnimatedContainer from "../helpers/AnimatedContainer";
import Sidebar from "../components/sidebar/Sidebar";

export default () => {
    return (
        <div className="bg-blueGray-600">
            <AnimatedContainer>
                <Sidebar role="HOST"/>
                <div style={{paddingLeft: '16rem'}}>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <div
                                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                                <div className="rounded-t bg-white mb-0 px-6 py-6">
                                    <div className="text-center flex justify-between">
                                        <h6 className="text-blueGray-700 text-xl font-bold">Add/Edit Venue</h6>
                                        <button
                                            className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <form>
                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
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
                                                        defaultValue="Indiana Memorial Union - Biddle Hotel & Conference Center"
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
                                                        type="email"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue="Contact for pricing"
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
                                                        type="text"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue="10 - 1,000"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="mt-6 border-b-1 border-blueGray-300"/>

                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
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
                                                        defaultValue="900 E 7th St"
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
                                                        defaultValue="Bloomington"
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
                                                        defaultValue="Indiana"
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
                                                        defaultValue="47404"
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
                                                        defaultValue="(812) 555-1337"
                                                    />
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
                                                        type="text"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        defaultValue="The Indiana Memorial Union is a student union building at Indiana University in Bloomington, Indiana, United States. It is located at 900 E 7th Street, facing the Campus River and the Dunn Meadow."
                                                        rows="4"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="mt-6 border-b-1 border-blueGray-300"/>

                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                            Upload Image
                                        </h6>
                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-12/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <input
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        type="file" />
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
}