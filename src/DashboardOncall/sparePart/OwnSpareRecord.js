import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import useAdmin from '../../Pages/Hook/useAdmin';
import Loading from '../../Pages/SharedPage/Loading';
import auth from '../../firebase.init';
import { CSVLink } from 'react-csv';
import { ArrowDownTrayIcon, HomeIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import TableCaption from '../../Pages/SharedPage/TableCaption';
import AddOwnSpare from './AddOwnSpare';
import { useGetOwnSpareListQuery } from '../../app/features/api/sparePart/spareApi';
import { NavLink } from 'react-router-dom';

const OwnSpareRecord = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const [OwnSpareAddVisible, setOwnSpareAddVisible] = useState(false)


    const { data: ownSpareList, isLoading, isSuccess, } = useGetOwnSpareListQuery()
    const filteredOwnSpareList = ownSpareList?.map(({ replacement, ...rest }) => rest)
    //console.log(filteredOwnSpareList)

    useEffect(() => {
        if (isSuccess) {

        }
    }, [isSuccess, isLoading])
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="px-2 lg:px-16 py-4 bg-cyan-100">
            <div className='card bg-base-100 shadow-lg p-5'>
                <div className="flex justify-between  rounded-lg">
                    <NavLink to="/OnCall/SpareHome">
                        < HomeIcon className="h-8 w-8 text-red-500 font-bold" />
                    </NavLink>
                    <div className='flex gap-1 btn btn-sm btn-outline btn-secondary'
                        onClick={() => setOwnSpareAddVisible(!OwnSpareAddVisible)}>
                        < PlusCircleIcon className="h-6 w-6 text-slate-500" />
                        <button
                        >Add_Own_Spare</button>
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
                OwnSpareAddVisible && (
                    <div className='card bg-base-200 shadow-lg mt-2 py-2'>
                        <AddOwnSpare OwnSpareAddVisible={OwnSpareAddVisible} setOwnSpareAddVisible={setOwnSpareAddVisible} />
                    </div>
                )
            }


            {filteredOwnSpareList.length > 0 && (
                <div className='card bg-base-100 shadow-lg py-2 mt-4'>
                    <div className="overflow-x-auto">
                        <table className="table table-xs table-pin-rows table-pin-cols mt-5 mx-auto">
                            <TableCaption tableHeading="Own Spare Record " />
                            <thead>
                                <tr className="border-2 border-blue-500 divide-x-2 px-4 divide-blue-400 text-start">
                                    <th >SN</th>
                                    {Object.keys(filteredOwnSpareList[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOwnSpareList?.map((row, index) => (
                                    <tr className="border-2 border-blue-500  hover divide-y-2 divide-x-2 divide-gray-500 text-center"
                                        key={index}>
                                        <td className="border-2 border-gray-500" >{index + 1}</td>
                                        {Object.values(row).map((value, index) => (

                                            <td className="border-2 border-gray-500" key={index}>{value}</td>
                                        ))}
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OwnSpareRecord;