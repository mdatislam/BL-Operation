
import React from 'react';
import FuelBalanceInfo from '../DashBoard/FuelBalanceInfo';
import { Link } from 'react-router-dom';
import ViewIssues from './siteIssues/ViewIssues';



const OnCallHomePage = () => {

    return (
        <div>
            <div className="card mt-2 w-full  mx-4  bg-base-100 shadow-xl">
                <div className='card-body' >
                    <div className='py-4'>
                        <FuelBalanceInfo />
                        {/* <ViewIssues/> */}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default OnCallHomePage;