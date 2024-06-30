import React from 'react';
import TableCaption from '../../Pages/SharedPage/TableCaption';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useAdmin from '../../Pages/Hook/useAdmin';
import { CSVLink } from 'react-csv';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { Link, NavLink } from 'react-router-dom';

const SpareHome = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
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

            {/* Table part */}
            <div className="overflow-x-auto  mt-4">
                <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
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
                        {/* {searchFuel.length > 1
              ? filter?.map((fuel, index) => (
                <AllFuelListRow
                  key={fuel._id}
                  fuel={fuel}
                  index={index}
                  setDelFuel={setDelFuel}
                  admin={admin}
                ></AllFuelListRow>
              ))
              : receiveFuel.map((fuel, index) => (
                <AllFuelListRow
                  key={fuel._id}
                  fuel={fuel}
                  index={index}
                  setDelFuel={setDelFuel}
                  admin={admin}
                ></AllFuelListRow>
              ))} */}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default SpareHome;