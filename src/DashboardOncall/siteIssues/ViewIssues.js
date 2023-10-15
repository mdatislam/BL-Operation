import React, { useState } from 'react';
import useAxiosSecure from '../../Pages/Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import './ViewIssues.css'
import { DocumentCheckIcon, MegaphoneIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import ModifyIssue from './ModifyIssue';
import { Link } from 'react-router-dom';

const ViewIssues = () => {
    const [axiosSecure] = useAxiosSecure()
    const [modifyIssue, setModifyIssue] = useState("")
    const { data: issues, refetch } = useQuery({
        queryKey: ["issues"],
        queryFn: async () => {
            const res = await axiosSecure.get("/siteIssues/pending")
            return res.data
        }
    })
    refetch()

    return (
        <div>
            <div>
                <div className="card w-full bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className='card-actions justify-end'>
                            <Link to="/OnCall/AddIssues" className=" btn btn-outline btn-secondary">
                                <PlusCircleIcon className='w-6 h-6 ' />
                                &nbsp; Add Issue
                            </Link>
                        </div>
                        <div className="divider mt-[-5px]"></div>
                        {
                            issues?.length === 0 ? (<div className=' card bg-indigo-300 shadow-xl rounded-lg'>
                                <h2 className='text-center text-xl text-orange-600 py-2 mb-3 '> Wow ! No Pending Issue Right Now .</h2>
                            </div>)
                                :
                                <div className="overflow-x-auto ">
                                    <table className="table table-xs table-pin-rows table-pin-cols
                                     border border-slate-200 w-full ">
                                        <caption class=" caption-top py-2 ">
                                            <div className=' flex text-xl justify-center text-pink-700'>
                                                <MegaphoneIcon className='w-8 h-8 ' />
                                                <h2>Total Pending Issue = {issues?.length}</h2>
                                            </div>
                                        </caption>

                                        <thead className='border border-slate-300 headers'>
                                            <tr className='text-center divide-x divide-slate-400'>
                                                <th>Action</th>
                                                <th>Site ID</th>
                                                <th>Date</th>
                                                <th>Issue Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                issues?.map((issue, index) => (
                                                    <tr className='border border-slate-300' key={index}>
                                                        <th className='border border-slate-300'>
                                                            <label
                                                                htmlFor="my_modal_6"
                                                                className='btn btn-link'
                                                                onClick={() => { setModifyIssue(issue.siteId) }}
                                                            >
                                                                <DocumentCheckIcon className='w-8 h-8 text-green-600' />

                                                            </label>
                                                        </th>
                                                        <td className='border border-slate-300'>{issue.siteId}</td>
                                                        <td className='border border-slate-300'>{issue.date}</td>
                                                        <td className='whitespace-pre-line border border-slate-300 '>{issue.issueDetail}</td>
                                                        
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                        }
                    </div>
                </div>

            </div>

            ........


            {modifyIssue && <ModifyIssue siteCode={modifyIssue}
                setModifyIssue={setModifyIssue}
                refetch={refetch}
            ></ModifyIssue>}
        </div>
    );
};

export default ViewIssues;