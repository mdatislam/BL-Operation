import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import useAxiosSecure from '../../Pages/Hook/useAxiosSecure';
import useUserList from '../../Pages/Hook/useUserList';
import Swal from 'sweetalert2';

const ModifyIssue = ({ siteCode, refetch, setModifyIssue }) => {
    const [user] = useAuthState(auth)
    const [userList] = useUserList()
    const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm()

    //console.log(siteCode)

    const onSubmit = (data) => {
        //console.log(data)

        const updateInfo = {
            status: data.issueStatus,
            finalFeedback: data.feedback,
            solvedBy: data.solverName,
            DataUpdate: user?.displayName
        }
        if (siteCode) {
            const url = `/siteIssues/${siteCode}`
            console.log(url)
            axiosSecure.put(url, updateInfo)
                .then(putRes => {
                    //console.log(putRes.data)
                    if (putRes.data.modifiedCount > 0) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                })
                reset()
                setModifyIssue(null)
                refetch()

        }

    }

    return (
        <div className='py-10'>

            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box relative">
                    <label
                        htmlFor="my_modal_6"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className=" text-center font-bold text-pink-600 text-xl ">
                        Final Feedback!
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">PG Status:</span>
                            </label>
                            <select
                                type="text"
                                required
                                className="input input-bordered w-full max-w-xs my-2"
                                {...register("issueStatus")}
                            >
                                <option value="">......   Select Status   .....</option>
                                <option value="solved">Solved</option>
                                <option value="nok">Not Ok</option>
                                <option value="wip">Work in progress</option>
                            </select>
                            <label></label>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Solved By:</span>
                            </label>
                            <select
                                type="text"
                                required
                                className="input input-bordered w-full max-w-xs my-2"
                                {...register("solverName")}
                            >
                                <option value="">......   Select  Name   .....</option>
                                {
                                    userList?.map(u => (
                                        <option value={u.name}>{u.name}</option>
                                    ))
                                }


                            </select>
                            <label></label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <textarea
                                placeholder="Type here solving feedback! "
                                required
                                className="input input-bordered w-full max-w-xs my-2 "
                                {...register("feedback")}
                            />
                            <label></label>
                        </div>
                        <input
                            type="submit"
                            className="btn btn-accent  md:w-3/4 max-w-xs my-4 "
                            /* onClick={() => handlePgEdit(pgEdit)} */
                            value="Update"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModifyIssue;