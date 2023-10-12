import React, { useState } from 'react';
import useUserList from '../../Pages/Hook/useUserList';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useSiteList from '../../Pages/Hook/useSiteList';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Pages/Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddIssues = () => {
    const [user] = useAuthState(auth)
    const [userList] = useUserList()
    const [siteList] = useSiteList()
    const [axiosSecure] = useAxiosSecure()
    const [search, setSearch] = useState("");
    const navigate = useNavigate()

    const { register, reset, handleSubmit } = useForm()


    /*  For site list auto suggestion */
    const handleSiteSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchItem = (searchItem) => {
        setSearch(searchItem);
    };

    const onSubmit = (data) => {
        console.log(data)
        const issueInfo = {
            siteId: search,
            category: data.category,
            date: data.date,
            issueDetail: data.detail,
            status:"pending",
            onCallerName: data.onCallerName,
            updateBy: user.displayName

        }

        axiosSecure.post("/siteIssues", issueInfo)
            .then(postRes => {
                if (postRes.data.insertedId) {
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
        setSearch("")
        navigate("/onCall")
    }
    return (
        <div className='py-4'>
            <div className="card w-1/2 mx-auto bg-base-100 shadow-xl">
                <div className='card-body'>
                    <h2 className='card-title text-fuchsia-400'>Issue Input Form</h2>
                    <div className="divider"></div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col md:flex-row justify-between gap-x-2'>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Site Code* </span>
                                </label>
                                <input type="text"
                                    onChange={handleSiteSearch}
                                    value={search}
                                    required
                                    placeholder="Type only site number" className="input input-bordered w-full max-w-xs"

                                />
                                {/*  For site list auto suggestion */}

                                <div className=" border-0 rounded-lg w-3/4 max-w-xs mt-2">
                                    {siteList
                                        .filter((item) => {
                                            const searchItem = search.toLowerCase();
                                            const name1 = item.siteId.toLowerCase();
                                            return (
                                                searchItem &&
                                                name1.includes(searchItem) &&
                                                searchItem !== name1
                                            );
                                        })
                                        .slice(0, 10)
                                        .map((item, index) => (
                                            <ul
                                                className="menu p-2 w-52"
                                                onClick={() => handleSearchItem(item.siteId)}
                                                key={index}
                                            >
                                                <li className="text-blue-500 hover"> {item.siteId}</li>
                                            </ul>
                                        ))}
                                </div>
                                <label className="label"></label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Category*</span>
                                </label>
                                <select type="text" placeholder="Type here"
                                required
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("category")}

                                >
                                    <option value="">----  Select Category  ----</option>
                                    <option value="BTS"> BTS</option>
                                    <option value="DG"> DG</option>
                                    <option value="MW"> MW</option>
                                    <option value="PG"> PG</option>
                                    <option value="FCU"> FCU</option>
                                    <option value="Power"> Power</option>
                                </select>
                                <label className="label"></label>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row  justify-between gap-x-2'>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Occurred Date*</span>
                                </label>
                                <input type="date" placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("date")}
                                />
                                <label className="label"></label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">On-Caller*</span>
                                </label>
                                <select type="text"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("onCallerName")}
                                >
                                    <option>---- Select ---- </option>
                                    {
                                        userList?.map(user =>
                                            <option value={user.name}>{user.name}</option>)
                                    }
                                </select>
                                <label className="label"></label>
                            </div>
                        </div>

                        <div className="form-control w-full mx-w-xs ">
                            <label className="label">
                                <span className="label-text">Issue Details*</span>
                            </label>
                            <textarea type="text" required placeholder="Type here problem detail"
                                className="input input-bordered "
                                {...register("detail")}
                            />
                            <label className="label"></label>
                        </div>

                        <div className="form-control w-3/4 md:w-1/4 mx-auto max-w-xs">
                            <input type="submit" value="ADD Issue" className='btn btn-secondary btn-md' />

                        </div>


                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddIssues;