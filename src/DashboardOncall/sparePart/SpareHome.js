import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListBulletIcon } from '@heroicons/react/24/solid';

const SpareHome = () => {
    return (
        <div className='bg-emerald-200  py-5 '>
            <div className='grid grid-cols-1 md:grid-cols-4 max-h-screen gap-x-2 mx-2'>
                <div className='col-span-3 card shadow-lg bg-base-200 '>
                    This is Home
                </div>
                <div className='col-span-1 card shadow-lg bg-fuchsia-300 '>
                    <div className='flex flex-col justify-start items-start ml-3 text-yellow-500 '>
                        <NavLink to="/NewSpareCollectRecord" className=" btn btn-link"> 
                        < ListBulletIcon className="h-6 w-6 text-amber-600" />
                        &nbsp;  Spare_Collecting_Record</NavLink>
                        <NavLink to="/OwnSpareRecord" className=" btn btn-link">
                        < ListBulletIcon className="h-6 w-6 text-amber-600" />
                        &nbsp;  Own Spare_Record</NavLink>
                        <NavLink to="/ReturnSpareRecord" className=" btn btn-link">
                        < ListBulletIcon className="h-6 w-6 text-amber-600" />
                        &nbsp;  Return Spare_Record</NavLink>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SpareHome;