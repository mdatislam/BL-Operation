import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { ArrowDownTrayIcon, HomeIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import ReturnSpare from './ReturnSpare';
import TableCaption from '../../Pages/SharedPage/TableCaption';
import { useGetReturnSpareQuery } from '../../app/features/api/sparePart/spareApi';
import Loading from '../../Pages/SharedPage/Loading';
import { NavLink } from 'react-router-dom';

const ReturnSpareRecord = () => {
    const [user] = useAuthState(auth)
    const [returnSpare, setReturnSpareVisible] = useState(false)
    const { data: returnSpareList = [], isLoading } = useGetReturnSpareQuery()
    //console.log(returnSpareList);
    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="px-2 lg:px-16 py-4 bg-cyan-100">
            <div className='card bg-base-100 shadow-lg p-4 w-full md:w-3/4 mx-auto'>
                <div className="flex justify-between  rounded-lg">
                    <NavLink to="/OnCall/SpareHome">
                        < HomeIcon className="h-8 w-8 text-red-500 font-bold" />
                    </NavLink>
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

            {returnSpareList?.length > 0 && (
                <div className='card bg-base-100 w-3/4 mx-auto shadow-lg py-2 mt-4'>
                    <div className="overflow-x-auto">
                        <table className="table table-xs table-pin-rows table-pin-cols mt-5 mx-auto">
                            <TableCaption tableHeading="Return Spare Record " />
                            <thead>
                                <tr className="border-2 border-blue-500 divide-x-2 px-4 divide-blue-400 text-start">
                                    <th >SN</th>
                                    {Object.keys(returnSpareList[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {returnSpareList?.map((row, index) => (
                                    <tr className="border-2 border-blue-500  hover divide-y-2 divide-x-2 divide-gray-500 text-center"
                                        key={index}>
                                        <td className="border-2 border-gray-500" >{index + 1}</td>
                                        {Object.values(row).map((value, index) => (

                                            <td className="border-2 border-gray-500" key={index+"jh"}>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ReturnSpareRecord;