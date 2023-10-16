
import React from 'react';
import FuelBalanceInfo from '../DashBoard/FuelBalanceInfo';



const OnCallHomePage = () => {

    return (
        <div className="card mt-2 w-full  mx-4  bg-base-100 shadow-xl">
            <div className='card-body' >
                <FuelBalanceInfo/>
            </div>
        </div>
    );
};

export default OnCallHomePage;