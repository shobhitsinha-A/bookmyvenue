import React from 'react';
import tw from "twin.macro";

const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-white text-white
`;

export default () => {
    return (
        <div>
            <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    <div className="ml-auto">
                        <NavLink href="/search">Search</NavLink>
                    </div>
                    <div className="ml-auto">
                        <NavLink href="/profile">Profile</NavLink>
                    </div>
                    <div className="ml-auto">
                        <button
                            className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {window.location.href = '/logout'}}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}