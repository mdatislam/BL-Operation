import React, { useEffect, useState } from 'react';
import TableCaption from '../../Pages/SharedPage/TableCaption';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useAdmin from '../../Pages/Hook/useAdmin';
import { CSVLink } from 'react-csv';
import { ArrowDownTrayIcon, PlusCircleIcon, HomeIcon } from '@heroicons/react/24/solid';
import { useGetOwnSpareStockQuery, useGetSpareListQuery } from '../../app/features/api/sparePart/spareApi';
import Loading from '../../Pages/SharedPage/Loading';
import SpareAdd from './SpareAdd'
import SpareRecordRow from './SpareRecordRow';
import EditSpare from './EditSpare';
import ViewReplacement from './ViewReplacement';
import EditOwnSpare from './EditOwnSpare';
import { NavLink } from 'react-router-dom';

const NewSpareRecord = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const [spareAddVisible, setSpareAddVisible] = useState(false)
    const [spareEdit, setSpareEdit] = useState("")
    const [ownSpareEdit, setOwnSpareEdit] = useState("")
    const [replacementRecord, setReplacementView] = useState("")

    const { data: spareList, isLoading, isSuccess, } = useGetSpareListQuery()
    //console.log(spareList)
    const { data: ownSpareStock, isLoading: loading2 } = useGetOwnSpareStockQuery()
    //console.log(ownSpareStock);

    useEffect(() => {
        if (isSuccess) {

        }
    }, [isSuccess, isLoading])
    if (isLoading || loading2) {
        return <Loading />
    }

    const combineSpare = spareList.map((item) => {
        const matchSpare = ownSpareStock.find((matchBom) => matchBom.BOM_No === item.bomNo)
        return {
            ...item,
            ownGoodStock: matchSpare ? matchSpare.ownGoodQuantity : 0,
            ownFaultyStock: matchSpare ? matchSpare.ownFaultyQuantity : 0,
        }
    })
    // console.log(combineSpare)
    //console.log(ownSpareEdit);

    return (
        <div className="px-2 lg:px-16 py-4 bg-cyan-100">
            <div className='card bg-base-100 shadow-lg p-3'>
                <div className="flex justify-between  rounded-lg" >
                    <NavLink to="/OnCall/SpareHome">
                        < HomeIcon className="h-8 w-8 text-red-500 font-bold" />
                    </NavLink>
                    <div className='flex gap-1 btn btn-sm btn-outline btn-secondary'
                        onClick={() => setSpareAddVisible(!spareAddVisible)}>
                        < PlusCircleIcon className="h-6 w-6 text-slate-500" />
                        <button
                        > Add_New_Spare</button>
                    </div>

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
            </div>
            {
                spareAddVisible && (
                    <div className='card bg-base-200 shadow-lg mt-2 py-2'>
                        <SpareAdd spareAddVisible={spareAddVisible} setSpareAddVisible={setSpareAddVisible} />
                    </div>
                )
            }


            {/* {spareList.length > 0 && (
                <div className='card bg-base-100 shadow-lg py-2 mt-4'>
                    <div className="overflow-x-auto">
                        <table className="table table-xs table-pin-rows table-pin-cols mx-4  mt-5">
                            <TableCaption tableHeading=" Spare Update Record " />
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
                </div>
            )} */}

            {/* Table part */}
            <div className="overflow-x-auto  mt-4">
                <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
                    <TableCaption tableHeading="Added New Spare Update Record" bgColor={"bg-blue-500"} />
                    <thead className="border-2 border-[#FFCB24]">
                        <tr className="divide-x divide-blue-400 text-center">
                            <th>SN</th>
                            <th>Action</th>
                            <th>Spare_Name</th>
                            <th>BOM No</th>

                            <th>
                                <div>SPMS_Good</div>
                                <div>Quantity</div>
                            </th>
                            <th>
                                <div>Own_Good</div>
                                <div>Quantity</div>
                            </th>
                            <th>Challan No</th>
                            <th>Serial No</th>
                            <th>
                                <div>Requisition</div>
                                <div>By</div>
                            </th>
                            <th className='text-pink-400'>
                                <div>Record_Faulty</div>
                                <div>Replacement</div>
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
                            combineSpare.map((spare, index) => (
                                <SpareRecordRow spare={spare} setSpareEdit={setSpareEdit}
                                    setReplacementView={setReplacementView}
                                    setOwnSpareEdit={setOwnSpareEdit}
                                    admin={admin} index={index} key={spare._id} />

                            ))
                        }
                    </tbody>
                </table>
            </div>
            {
                spareEdit && <EditSpare setSpareEdit={setSpareEdit} spareEdit={spareEdit} />
            }
            {
                ownSpareEdit && <EditOwnSpare setOwnSpareEdit={setOwnSpareEdit} ownSpareEdit={ownSpareEdit} />
            }
            {
                replacementRecord && <ViewReplacement replacementRecord={replacementRecord}
                    setReplacementView={setReplacementView} />
            }
        </div>
    );
};

export default NewSpareRecord;