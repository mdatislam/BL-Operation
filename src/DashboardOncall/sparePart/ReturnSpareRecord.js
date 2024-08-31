import React, {  useState } from 'react';
import { CSVLink } from 'react-csv';
import { ArrowDownTrayIcon, HomeIcon, PlusCircleIcon,} from '@heroicons/react/24/solid';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import ReturnSpare from './ReturnSpare';
import TableCaption from '../../Pages/SharedPage/TableCaption';
import Loading from '../../Pages/SharedPage/Loading';
import { NavLink } from 'react-router-dom';
import useAdmin from '../../Pages/Hook/useAdmin';
import ReturnSpareRecordRows from './ReturnSpareRecordRows';
import { useGetReturnSpareQuery } from '../../app/features/api/sparePart/spareApi';

const ReturnSpareRecord = () => {
    const [user] = useAuthState(auth);
   // const [admin] = useAdmin(user);
    const [returnSpare, setReturnSpareVisible] = useState(false)
    const { data: returnSpareList = [], isLoading } = useGetReturnSpareQuery()
    // console.log(returnSpareList);
const admin=true
    const filterReturnSpareList = returnSpareList?.filter(reSpare => reSpare.returnQuantity >0)
    //console.log(filterReturnSpareList);
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

            {/* Return spare Record Table */}

            <div className="overflow-x-auto mt-4">
                <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600 ">
                    <TableCaption tableHeading=" Spare Return Records" bgColor="bg-[#fret347]" />
                    <thead className="border-2 border-[#FFCB24]">
                        <tr className="divide-x divide-blue-400 text-center">
                            <th>SN</th>
                          {admin &&  <th className='w-24'>Action</th>}
                            <th>Date</th>
                            <th>Spare_Name</th>
                            <th>BOM No</th>
                            <th>
                                <div>Spare</div>
                                <div>Status</div>
                            </th>
                            <th>
                                <div>Return</div>
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
                            filterReturnSpareList &&
                            filterReturnSpareList?.map((spare, index) =>
                            (
                                <ReturnSpareRecordRows
                                    spareReturnList={spare}
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

            {/* {returnSpareList?.length > 0 && (
                <div className='card bg-base-100 w-3/4 mx-auto shadow-lg py-2 mt-4'>
                    <div className="overflow-x-auto">
                        <table className="table table-xs table-pin-rows table-pin-cols mt-5 mx-auto">
                            <TableCaption tableHeading="Return Spare Record " />
                            <thead>
                                <tr className="border-2 border-blue-500 divide-x-2 px-4 divide-blue-400 text-start">
                                    <th >SN</th>
                                    <th >Action</th>
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

                                        {
                                            admin && <td className=" ">
                                                <button className='btn btn-link' onClick={() => handleDelete(row._id)}>
                                                    <TrashIcon className='w-6 h-6 text-red-400' />
                                                </button>
                                            </td>
                                        }

                                        {Object.values(row).map((value, index) => (

                                            <td className="border-2 border-gray-500" key={index + "jh"}>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )} */}

        </div>
    );
};

export default ReturnSpareRecord;