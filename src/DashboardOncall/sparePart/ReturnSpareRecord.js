import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { ArrowDownTrayIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import ReturnSpare from './ReturnSpare';

const ReturnSpareRecord = () => {
    const [user]=useAuthState(auth)
    const [returnSpare,setReturnSpareVisible]=useState(false)
    
    return (
        <div className="px-2 lg:px-16 py-4 bg-cyan-100">
            <div className='card bg-base-100 shadow-lg p-5'>
                <div className="flex justify-between  rounded-lg">
                    <div className='flex gap-1 btn btn-sm btn-outline btn-secondary'
                        onClick={() => setReturnSpareVisible(!returnSpare)}>
                        < PlusCircleIcon className="h-6 w-6 text-slate-500" />
                        <button
                        >Return_Spare</button>
                    </div>


                    <div>
                        <CSVLink
                            data="ownSpareList"
                            filename="receiveFuel"
                            className="btn btn-outline btn-accent mb-2"
                        >
                            <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />

                            &nbsp;
                        </CSVLink>
                    </div>
                </div>
            </div>
            {
                returnSpare && (
                    <div className=''>
                        <ReturnSpare returnSpare={returnSpare} setReturnSpareVisible={setReturnSpareVisible} />
                    </div>
                )
            }
            

        </div>
    );
};

export default ReturnSpareRecord;