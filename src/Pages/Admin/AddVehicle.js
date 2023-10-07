import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { PlusCircleIcon, TrashIcon, } from '@heroicons/react/24/solid'
import useVehicleList from '../Hook/useVehicleList';

const AddVehicle = () => {
    const [user] = useAuthState(auth)
    const [visible, setVisible] = useState(null)
    const [axiosSecure] = useAxiosSecure()
    const [vehicleList, refetch] = useVehicleList()


    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm();

    let date = new Date();
    date.setDate(date.getDate());
    let today = date.toLocaleDateString("en-CA");

    const onSubmit = (data) => {
        const VehicleData = {
            vehicleNo: data.vehicleNo,
            vehicleVendor: data.vehicleVendor,
            driverName: data.driverName,
            updaterName: user.displayName,
            updaterEmail: user.email,
            date: today,
        }
        axiosSecure.put("/vehicle", VehicleData)
            .then(vehicleRes => {
               // console.log(vehicleRes.data)
                if (vehicleRes.data.acknowledged) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    reset()
                    refetch()
                }
            })
    }

    const handleVehicleDelete = (vehicleNo) => {
        //console.log(vehicleNo)
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
              axiosSecure.delete(`/vehicle/${vehicleNo}`)
              .then(deleteRes=>{
                if(deleteRes.data.deletedCount>0){
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
                refetch()
              })
              
            }
          })
    }

    return (
        <div>
            {/* Add Vehicle No */}
            <div className="my-5">
                <div className="stats bg-slate-300 my-10 shadow-xl w-full stats-vertical">
                    {visible || <div className="stat">
                        <div className=" text-lg text-center">Existing Vehicle List</div>
                    </div>}
                    <div className="stat-actions px-4">
                        <button
                            className="btn btn-sm btn-outline btn-primary"
                            onClick={() => setVisible(true)}
                        >
                            <PlusCircleIcon className="h-6 w-6" />

                            Add Vehicle
                        </button>
                    </div>
                    {visible && (
                        <div className='px-4'>
                            <div className="card w-full bg-base-300 shadow-xl mt-2 px-2">
                                <div className="card-body ">
                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                                        {/* PgNo input field */}

                                        <div className="form-control w-full max-w-xs">
                                            <input
                                                type="text"
                                                placeholder="VEHICLE No"
                                                className="input input-bordered w-full max-w-xs"
                                                {...register("vehicleNo", {
                                                    required: {
                                                        value: true,
                                                        message: " VEHICLE NO  is required",
                                                    },
                                                })}
                                            />
                                            <label className="label">
                                                {errors.vehicleNo?.type === "required" && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.vehicleNo.message}
                                                    </span>
                                                )}
                                            </label>
                                        </div>
                                        {/*  VEHICLE vendor */}
                                        <div className="form-control w-full max-w-xs">
                                            <input
                                                type="text"
                                                placeholder="Vendor Name"
                                                className="input input-bordered w-full max-w-xs"
                                                {...register("vehicleVendor", {
                                                    required: {
                                                        value: true,
                                                        message: " VEHICLE vendor is required",
                                                    },
                                                })}
                                            />
                                            <label className="label">
                                                {errors.vehicleVendor?.type === "required" && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.vehicleVendor.message}
                                                    </span>
                                                )}
                                            </label>
                                        </div>
                                        {/* Detail part */}
                                        <div className="form-control w-full max-w-xs">
                                            <input
                                                type="text"
                                                placeholder="Driver Name"
                                                className="input input-bordered w-full max-w-xs"
                                                {...register("driverName", {
                                                    required: {
                                                        value: true,
                                                        message: " Driver Name is required",
                                                    },

                                                })}
                                            />
                                            <label className="label"></label>
                                            <label className="label">
                                                {errors.driverName?.type === "required" && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.driverName.message}
                                                    </span>
                                                )}
                                            </label>
                                        </div>

                                        <div className="flex gap-x-4 justify-items-center">
                                            <input
                                                type="submit"
                                                className="btn btn-sm btn-outline btn-info w-24 "
                                                value="ADD"
                                            />
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => setVisible(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="stat">
                        {visible && <div className="stat">
                            <div className=" text-lg text-center">Existing Vehicle List</div>
                        </div>}
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <th>Vehicle No</th>
                                        <th>Vendor </th>
                                        <th>Driver</th>
                                        <th>UpdateBy</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        vehicleList?.map((vehicle, index) => (
                                            <tr >
                                                <th className='checkbox'>{index + 1}</th>
                                                <td>{vehicle.vehicleNo}</td>
                                                <td>{vehicle.vehicleVendor}</td>
                                                <td>{vehicle.driverName}</td>
                                                <td>{vehicle.updaterName}</td>
                                                <td>
                                                    <button className='btn btn-sm btn-outline'
                                                        onClick={() => handleVehicleDelete(vehicle.vehicleNo)}
                                                    >
                                                        <TrashIcon className='w-6 h-6 text-red-600 ' /> </button>

                                                </td>
                                            </tr>
                                        )
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default AddVehicle;