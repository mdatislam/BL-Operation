import React from 'react';
import useAxiosSecure from '../../Pages/Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { TrashIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import useAdmin from '../../Pages/Hook/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const ViewAllIssue = () => {
    const [user]=useAuthState(auth)
    const [admin,adminLoading]=useAdmin(user)
    const [axiosSecure] = useAxiosSecure()
    const { data: allIssues, refetch } = useQuery({
        queryKey: ["allIssues"],
        enabled:!adminLoading,
        queryFn: async () => {
            const res = await axiosSecure.get("/siteIssues")
            return res.data
        }
    })

    //console.log(admin)

    /*  To delete the issue */
    const handleDelete=id=>{
        //console.log(id)
        if(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/siteIssues/${id}`)
                    .then(deleteRes=>{
                        if(deleteRes.data.deletedCount >0){
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              )
                              
                        }
                    })
                 
                }
              })
        }
    }
    return (
        <div className=' px-3 bg-slate-300 py-2 w-full'>
            <div className="card bg-base-100 shadow-xl overflow-x-auto ">
                <table className="table table-xs table-pin-rows table-pin-cols
                border-2 border-slate-200 px-2 ">
                    <caption class=" caption-top py-5 bg-pink-300">
                        <div className='text center font-bold text-pink-700'>
                            <h2 className='text-2xl'>All Site's Issue List </h2>
                        </div>
                    </caption>

                    <thead className='border font-bold border-slate-300 headers rounded-lg'>
                        <tr className='text-center divide-x-2 divide-yellow-400 divide-y-2 '>
                           
                            <th>S.No</th>
                            <th>Site ID</th>
                            <th>Issue Date</th>
                            <th>Status</th>
                            <th>Issue Detail</th>
                            <th>Issue Finder</th>
                            <th>Solved Feedback</th>
                            <th>Solved By</th>
                            <th>On caller</th>
                           {admin && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allIssues?.map((issue, index) => (
                                <tr className='border border-slate-300 divide-x-2 divide-y-2 hover'>
                                <td className='border border-slate-300'> {index+1}</td>
                                    <td className='border border-slate-300'>{issue.siteId}</td>
                                    <td className='border border-slate-300'>{issue.date}</td>
                                    <td className='border border-slate-300'>{issue.status}</td>
                                    <td className='whitespace-pre-line border border-slate-300 '>{issue.issueDetail}</td>
                                    <td className='border border-slate-300'>{issue.updateBy}</td>
                                    <td className='border border-slate-300'>{issue.finalFeedback}</td>
                                    <td className='border border-slate-300'>{issue.solvedBy}</td>
                                    <td className='border border-slate-300'v>{issue.onCallerName}</td>
                                    {
                                        admin && <td className='border border-slate-300'>
                                        <button className='btn btn-link' onClick={()=>handleDelete(issue._id)}>
                                        <TrashIcon className='w-6 h-6 text-red-400'/>
                                        </button>
                                      </td>
                                    }

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ViewAllIssue;