import { BackwardIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../firebase.init';
import useSiteList from '../Pages/Hook/useSiteList';
import { Link, useNavigate } from 'react-router-dom';
import useUserList from '../Pages/Hook/useUserList';
import { addDays, format } from 'date-fns';
import useAxiosSecure from '../Pages/Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const FcuUpdate = () => {
    const [user, loading] = useAuthState(auth);
    const [UserList] = useUserList()
    const [siteList] = useSiteList();
    const [axiosSecure] = useAxiosSecure()
    const [search, setSearch] = useState("");
    const navigate = useNavigate()
    const { register, reset, handleSubmit, formState: { errors }, } = useForm()

    const { data: FcuRecord, refetch } = useQuery({
        queryKey: ["FcuRecord"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get("/fcuFilterChangeLatestRecord")
            return res.data
        }
    })

    /*  today find code */
    let date = new Date();
    date.setDate(date.getDate());
    let today = date.toLocaleDateString("en-CA");

    const onSubmit = (data) => {
        const serviceDate = new Date(data.date2)
        const formattedServiceDate = format(serviceDate, "dd-MM-yyyy")
        const nextServiceDate = addDays(serviceDate, 120)
        const formattedNextServiceDate = format(nextServiceDate, 'dd-MM-yyyy');
        const formattedNextServiceViewDate = format(nextServiceDate, 'dd-MMM-yyyy');

        const presentServiceDate = FcuRecord?.find(fcu => fcu.siteId === search)
        //console.log(presentServiceDate)

        const serviceInfo = {
            siteId: search,
            fcuBrand: data.fcuBrand,
            serviceType: data.serviceType,
            fcuStatus: data.fcuCtrl,
            preServiceDate: presentServiceDate?.latestServiceDate || null,
            latestServiceDate: formattedServiceDate,
            nextPlanDate: formattedNextServiceDate,
            nextPlanViewDate: formattedNextServiceViewDate,
            updaterName: user.displayName,
            onCallerName: data.onCallerName,
            remark: data.remark,
        }
        // console.log(serviceInfo)

        axiosSecure.post("/fcuFilterChangeAllRecord", serviceInfo)
            .then(postRes => {
                if (postRes.data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Fcu data has been saved',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            })

        axiosSecure.put(`/fcuFilterChangeLatestRecord/${search}`, serviceInfo)
            .then(putRes => {
                if (putRes.data.upsertedCount || putRes.data.modifiedCount) {
                    Swal.fire({
                        position: 'bottom-end',
                        icon: 'success',
                        title: 'FCU data has been changed',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    reset()
                    navigate("/FcuMaintenance")
                }

            })

    }




    /*  For site list auto suggestion */
    const handleSiteSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchItem = (searchItem) => {
        setSearch(searchItem);
    };

    const availableUser = UserList?.filter(u => u.email !== user.email)

    return (
        <div className='w-3/4 mx-auto py-2'>
            <div className="card w-full lg:w-96 bg-base-100 shadow-2xl ">
                <div className="card-body">
                    <div className='flex justify-center bg-slate-300 rounded-lg'>
                        <Link
                            to="/FcuMaintenance"
                            className="btn  btn-link  mb-2"
                        >
                            <BackwardIcon className='w-6 h-6 text-blue-400' />
                            &nbsp;
                        </Link>
                        <h2 className=" text-xl font-bold p-2 rounded-lg text-pink-400 ">
                            Update FCU Status !!
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Date input field */}

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Date:</span>
                            </label>
                            <input
                                type="date"
                                defaultValue={today}
                                className="input input-bordered w-full max-w-xs"
                                {...register("date2", {
                                    required: {
                                        value: true,
                                        message: " Date is required",
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.date?.type === "required" && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.date.message}
                                    </span>
                                )}
                            </label>
                        </div>

                        {/*  Site ID */}
                        <div className="form-control w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="Site ID ( type only number )"
                                onChange={handleSiteSearch}
                                value={search}
                                required
                                className="input input-bordered w-full max-w-xs"
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

                        {/*  FCU Brand */}
                        <div className="form-control w-full max-w-xs">
                            <input
                                type="text"
                                placeholder=" Fcu Brand"
                                className="input input-bordered w-full max-w-xs"
                                {...register("fcuBrand", {
                                    required: {
                                        value: true,
                                        message: " Fcu Brand required",
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.fcuBrand?.type === "required" && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.fcuBrand.message}
                                    </span>
                                )}
                            </label>
                        </div>

                        {/* Filter status */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Service Type:</span>
                            </label>
                            <select
                                type="text"
                                className="input input-bordered w-full max-w-xs"
                                {...register("serviceType", {
                                    required: {
                                        value: true,
                                        message: "Fcu filter  Status required",
                                    },
                                })}
                            >
                                <option value="">-------- Select Status -------</option>
                                <option value=" Filter Clean"> Filter Clean</option>
                                <option value=" Filter Replace"> Filter Replace</option>
                            </select>
                            <label className="label">
                                {errors.fcuFilter?.type === "required" && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.fcuFilter.message}
                                    </span>
                                )}
                            </label>
                        </div>

                        {/* ctrl Setting check */}

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Controller & Fan Status:</span>
                            </label>
                            <select
                                type="text"
                                className="input input-bordered w-full max-w-xs"
                                {...register("fcuCtrl", {
                                    required: {
                                        value: true,
                                        message: "Fcu controller setting",
                                    },
                                })}
                            >
                                <option value="">------ Checking FCU Status ----</option>
                                <option value="OK">OK</option>
                                <option value="Faulty">Faulty</option>
                            </select>
                            <label className="label">
                                {errors.fcuCtrl?.type === "required" && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.fcuCtrl.message}
                                    </span>
                                )}
                            </label>
                            <small className=" text-blue-400 font-bold">
                                ** Please Check Ctrl setting **
                            </small>
                        </div>
                        {/* On caller Name */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text"> OnCaller Name:</span>
                            </label>
                            <select
                                type="text"
                                className="input input-bordered w-full max-w-xs"
                                {...register("onCallerName", {
                                    required: {
                                        value: true,
                                        message: "Select Responsible on call Name",
                                    },
                                })}
                            >
                                <option value="">------ select OnCaller Name ----</option>
                                {
                                    availableUser.map(av =>
                                        <option value={av.name}>{av.name}</option>
                                    )
                                }
                            </select>
                            <label className="label">
                                {errors.onCallerName?.type === "required" && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.onCallerName.message}
                                    </span>
                                )}
                            </label>
                        </div>

                        {/* Remarks */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Remark:</span>
                            </label>
                            <textarea
                                type="text"
                                placeholder="Write  findings, if found "
                                className="input input-bordered w-full max-w-xs"
                                {...register("remark")}
                            />
                        </div>

                        <input
                            type="submit"
                            className="btn btn-accent w-full max-w-xs m-2"
                            /*  disabled={!imgUrl ? true : false} */
                            value="Submit-Data"
                        />
                    </form>
                </div>
            </div>

        </div>
    );
};

export default FcuUpdate;
