import React, { useState } from 'react';
import useAxiosSecure from '../../Pages/Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import './ViewIssues.css'
import { DocumentCheckIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import ModifyIssue from './ModifyIssue';
import { Link } from 'react-router-dom';
import Loading from '../../Pages/SharedPage/Loading';

const ViewIssues = () => {
    const [axiosSecure] = useAxiosSecure()
    const [modifyIssue, setModifyIssue] = useState("")
    const { isLoading, data: issues = [], refetch, } = useQuery({
        queryKey: ["issues"],
        queryFn: async () => {
            const res = await axiosSecure.get("/siteIssues/pending")
            return res.data
        }
    })
    refetch()

    if (isLoading) {
        return <Loading />;
    }

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
                                     border border-slate-500 w-full ">
                                        <caption class=" caption-top py-2 bg-zinc-600 rounded-t-lg ">
                                            <div className=' '>
                                                <h2 className='text-center text-xl font-bold  text-white'> Pending Issue List</h2>

                                            </div>
                                        </caption>

                                        <thead className='border border-slate-400  '>
                                            <tr className='text-center text-pink-500 '>
                                                <th>Action</th>
                                                <th>Site ID</th>
                                                <th>Date</th>
                                                <th>Issue Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                issues?.map((issue, index) => (
                                                    <tr className='divide-y-2 divide-x divide-slate-500 text-left' key={index}>
                                                        <th className='border-b-2 border-slate-500'>
                                                            <label
                                                                htmlFor="my_modal_6"
                                                                className='btn btn-link'
                                                                onClick={() => { setModifyIssue(issue.siteId) }}
                                                            >
                                                                <DocumentCheckIcon className='w-8 h-8 text-green-600' />

                                                            </label>
                                                        </th>
                                                        <td>{issue.siteId}</td>
                                                        <td >{issue.date}</td>
                                                        <td className='whitespace-pre-line '>{issue.issueDetail}</td>

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