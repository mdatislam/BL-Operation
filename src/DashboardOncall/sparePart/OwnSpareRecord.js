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
import OwnSpareRecordRow from './OwnSpareRecordRow';

const OwnSpareRecord = () => {
    const [user] = useAuthState(auth);
    //const [admin] = useAdmin(user);
    const [OwnSpareAddVisible, setOwnSpareAddVisible] = useState(false)
    const admin=true
    const { data: ownSpareList, isLoading, isSuccess, } = useGetOwnSpareListQuery()
    //console.log(ownSpareList);
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

            <div className="overflow-x-auto mt-4">
                <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600 ">
                    <TableCaption tableHeading=" Own Spare  Records" bgColor="bg-[#fret347]" />
                    <thead className="border-2 border-[#FFCB24]">
                        <tr className="divide-x divide-blue-400 text-center">
                            <th>SN</th>
                            {admin && <th className='w-24'>Action</th>}
                            <th>Date</th>
                            <th>Spare_Name</th>
                            <th>BOM No</th>
                            <th>
                                <div>Own Good</div>
                                <div>Quantity</div>
                            </th>
                            <th>
                                <div>Own Faulty</div>
                                <div>Quantity</div>
                            </th>
                            <th>
                                <div>Updated</div>
                                <div>BY</div>
                            </th>
                            <th>
                                Remarks
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            ownSpareList &&
                            ownSpareList?.map((spare, index) =>
                            (
                                <OwnSpareRecordRow
                                    spareOwnList={spare}
                                    index={index}
                                    key={spare._id}
                                    admin={admin}
                                />
                            )

                            )
                        }

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default OwnSpareRecord;