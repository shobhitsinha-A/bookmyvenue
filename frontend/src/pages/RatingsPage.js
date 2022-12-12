import React from 'react';
import AnimatedContainer from "../helpers/AnimatedContainer";
import Ratings from "../components/ratings/Ratings";
import Sidebar from "../components/sidebar/Sidebar";

export default () => {
    if (sessionStorage.getItem('user_name')) {
        return (
            <div className="bg-blueGray-600">
                <AnimatedContainer>
                    <Sidebar role={sessionStorage.getItem('role')}/>
                    <div style={{paddingLeft: '16rem'}}>
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div
                                    className="relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                                        <div className="text-center flex justify-between">
                                            <h6 className="text-blueGray-700 text-xl font-bold">Ratings</h6>
                                        </div>
                                    </div>
                                    <Ratings />
                                </div>
                            </div>
                        </div>
                    </div>

                </AnimatedContainer>
            </div>
        );
    }
}