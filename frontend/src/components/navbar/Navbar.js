import React from 'react';

export default () => {
    return (
        <div>
            <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
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