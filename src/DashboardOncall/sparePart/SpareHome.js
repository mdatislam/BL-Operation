import React from 'react';
import TableCaption from '../../Pages/SharedPage/TableCaption';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useAdmin from '../../Pages/Hook/useAdmin';
import { CSVLink } from 'react-csv';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { Link, NavLink } from 'react-router-dom';
import { useGetSpareListQuery } from '../../app/features/api/sparePart/spareApi';
import Loading from '../../Pages/SharedPage/Loading';

const SpareHome = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);

    const {data:spareList,isLoading}= useGetSpareListQuery()
    console.log(spareList)
    if(isLoading){
        return <Loading />
    }
    return (
        <div className="px-2 lg:px-16 mt-5 mb-8">
            <div className="flex justify-between border border-slate-400 p-4 rounded-lg">

                <NavLink to="/OnCall/NewSpareAdd" className='btn btn-sm btn-outline '>SpareAdd</NavLink>

                <div>
                    <CSVLink
                        data=""
                        filename="receiveFuel"
                        className="btn btn-outline btn-accent mb-2"
                    >
                        <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />

                        &nbsp;
                    </CSVLink>
                </div>
            </div>

            {spareList.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table table-xs table-pin-rows table-pin-cols mx-4 py-5">
                            <TableCaption tableHeading=" Spare List" />
                            <thead>
                                <tr className="border-2 border-blue-500 divide-x-2 px-4 divide-blue-400 text-start">
                                    <th >SN</th>
                                    {Object.keys(spareList[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {spareList.map((row, index) => (
                                    <tr className="border-2 border-blue-500  hover divide-y-2 divide-x-2 divide-gray-500 text-center"
                                        key={index}>
                                        <td className="border-2 border-gray-500" >{index + 1}</td>
                                        {Object.values(row).map((value, index) => (

                                            <td className="border-2 border-gray-500" key={index}>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            {/* Table part */}
            <div className="overflow-x-auto  mt-4">
                {/* <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
                    <TableCaption tableHeading={`Spare Stock Info : `} bgColor={"bg-blue-500"} />
                    <thead className="border-2 border-[#FFCB24]">
                        <tr className="divide-x divide-blue-400 text-center">
                            <th>SN</th>
                            {admin && <th>Action</th>}
                            <th>Input Date</th>
                            <th>BOM No</th>
                            <th>Spare Name</th>
                            <th>Status</th>
                            <th>Quantity</th>
                            <th>
                                <div>Requisition</div>
                                <div>Date</div>
                            </th>
                            <th>
                                <div>Requisition</div>
                                <div>By</div>
                            </th>
                            <th>
                                <div>Updated</div>
                                <div>By</div>
                            </th>
                            <th>Remarks</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            spareList.map((spare,index)=>(
                                <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center"
                                key={spare._id}
                                >
                                    <td> {index+1}</td>
                                    <td> {index+1}</td>
                                    <td> {index+1}</td>
                                    <td> {index+1}</td>
                                    <td> {index+1}</td>
                                </tr>
                                
                            ))
                        }
                    </tbody>
                </table> */}
            </div>

        </div>
    );
};

export default SpareHome;