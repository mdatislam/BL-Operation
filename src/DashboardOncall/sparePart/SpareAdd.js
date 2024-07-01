
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSiteList from "./../../Pages/Hook/useSiteList";
import useUserList from "../../Pages/Hook/useUserList";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { usePostNewSpareMutation } from "../../app/features/api/sparePart/spareApi";
import Loading from "../../Pages/SharedPage/Loading";

const SpareAdd = () => {
    const [user]= useAuthState(auth)
    const [siteList] = useSiteList()
    const [userList] = useUserList()
    const [search, setSearch] = useState("");
    const [spareAdd,{isLoading,data}]= usePostNewSpareMutation()
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const spareNameList = ["MRFU-900", "MRFU-1800", "ISV3", "ISM6", "ISM8", "RTN-950-controller"]
    const spareTypeList = ["RAN", "BTS", "MW", "Power", "CIVIL"]

    /* Today calculate code */
    let date = new Date()
    date.setDate(date.getDate())
    const today = date.toLocaleDateString("en-CA")

    /*  For site list auto suggestion */
    const handleSiteSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchItem = (searchItem) => {
        setSearch(searchItem);
    };
    const onSubmit = (data) => {    
        console.log({...data,updatedBy:user.displayName});
        spareAdd({...data,updatedBy:user.displayName})
    }

    if(isLoading){
        return <Loading />
    }

    return (
        <div className="flex  justify-center justify-items-center mt-8 mb-3">
            <div className="card w-96 md:w-3/4 bg-base-100 shadow-2xl">
                <div className="card-body">
                    <h2 className="text-center text-secondary-focus mb-3 text-2xl font-bold">
                        Provide New Spare Info!
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col  gap-3">
                            <div className=" grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4">
                                <label className="input input-bordered flex items-center font-semibold gap-2">
                                    Date:
                                    <input
                                        type="date"
                                        defaultValue={today}
                                        className="grow"
                                        {...register("date", {
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
                                </label>

                                <label className="input input-bordered font-semibold flex items-center gap-2">
                                    BOM_No:
                                    <input
                                        type="text"
                                        className="grow"
                                        {...register("bomNo", {
                                            required: {
                                                value: true,
                                                message: " BomNo is required",
                                            },
                                        })}
                                    />
                                    <label className="label">
                                        {errors.bomNo?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.bomNo.message}
                                            </span>
                                        )}
                                    </label>
                                </label>

                                <label className="input input-bordered flex items-center font-semibold gap-2">
                                    Spare_Type:
                                    <select
                                        type="text"
                                        className="grow"
                                        {...register("spareType", {
                                            required: {
                                                value: true,
                                                message: " Spare Type is required",
                                            },
                                        })}
                                    >
                                        <option value=""> -------Select Spare Type-----</option>
                                        {
                                            spareTypeList.map(item => (<option value={item}> {item}</option>))
                                        }

                                    </select>
                                    <label className="label">
                                        {errors.spareType?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.spareType.message}
                                            </span>
                                        )}
                                    </label>
                                </label>
                                <label className="input input-bordered flex items-center font-semibold gap-2">
                                    Spare_Name:
                                    <select
                                        type="text"
                                        className="grow"
                                        {...register("spareName", {
                                            required: {
                                                value: true,
                                                message: " Spare Name is required",
                                            },
                                        })}
                                    >
                                        <option value=""> -------Select Spare Name-----</option>
                                        {
                                            spareNameList.map(item => (<option value={item}> {item}</option>))
                                        }

                                    </select>
                                    <label className="label">
                                        {errors.spareName?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.spareName.message}
                                            </span>
                                        )}
                                    </label>
                                </label>
                                <label className="input input-bordered flex items-center font-semibold gap-2">
                                    Status:
                                    <select
                                        type="text"
                                        className="grow"
                                        {...register("status", {
                                            required: {
                                                value: true,
                                                message: " Status is required",
                                            },
                                        })}
                                    >
                                        <option value=""> -------Select Status-----</option>
                                        <option value="good"> Good</option>
                                        <option value="faulty"> Faulty</option>
                                    </select>
                                    <label className="label">
                                        {errors.status?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.status.message}
                                            </span>
                                        )}
                                    </label>
                                </label>

                                <label className="input input-bordered font-semibold flex items-center gap-2">
                                    Quantity:
                                    <input
                                        type="number"
                                        className="grow"
                                        {...register("quantity", {
                                            required: {
                                                value: true,
                                                message: " Quantity is required",
                                            },
                                        })}
                                    />
                                    <label className="label">
                                        {errors.quantity?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.quantity.message}
                                            </span>
                                        )}
                                    </label>
                                </label>
                                <div className="text-blue-400">
                                    <label className="input input-bordered font-semibold flex items-center gap-2">
                                        Site_ID:
                                        <input
                                            type="text"
                                            placeholder="Type only site number"
                                            className="grow"
                                            onChange={handleSiteSearch}
                                            value={search}
                                            required

                                        />

                                    </label>
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
                                            .slice(0, 5)
                                            .map((item, index) => (
                                                <ul
                                                    className="menu  p-2 w-24"
                                                    onClick={() => handleSearchItem(item.siteId)}
                                                    key={index}
                                                >
                                                    <li className="text-blue-500 hover"> {item.siteId}</li>
                                                </ul>
                                            ))}
                                    </div>
                                </div>
                                <label className="input input-bordered flex items-center font-semibold gap-2">
                                    Requisition_Date:
                                    <input
                                        type="date"
                                        placeholder="Requisition date"
                                        className="grow"
                                        {...register("requisitionDate", {
                                            required: {
                                                value: true,
                                                message: " RequisitionDate is required",
                                            },
                                        })}
                                    />
                                    <label className="label">
                                        {errors.requisitionDate?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.requisitionDate.message}
                                            </span>
                                        )}
                                    </label>
                                </label>

                                <label className="input input-bordered flex items-center font-semibold gap-2">
                                    Requisition_By:
                                    <select
                                        type="text"
                                        className="grow"
                                        {...register("requisitionBy", {
                                            required: {
                                                value: true,
                                                message: " Requester Name required",
                                            },
                                        })}
                                    >
                                        <option value=""> -------Select Requester Name-----</option>
                                        {
                                            userList.map(user => (<option value={user.name}> {user.name}</option>))
                                        }

                                    </select>
                                    <label className="label">
                                        {errors.requisitionBy?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.requisitionBy.message}
                                            </span>
                                        )}
                                    </label>
                                </label>
                                <label className="input input-bordered font-semibold flex items-center gap-2">
                                    Requision_ID:
                                    <input
                                        type="text"
                                        placeholder=" Type ID provided by SPMS"
                                        className="grow"
                                        {...register("requisitionId", {
                                            required: {
                                                value: true,
                                                message: " RequisitionId is required",
                                            },
                                        })}
                                    />
                                    <label className="label">
                                        {errors.requisitionId?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.requisitionId.message}
                                            </span>
                                        )}
                                    </label>
                                </label>

                                <textarea
                                    type="text"
                                    placeholder="Type issue if have"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("remark")}
                                />


                            </div>
                            <input
                                type="submit"
                                className="btn btn-success btn-wide max-w-xs m-2"
                                /*  disabled={isLoading ? true:false} */
                                value="Save_Spare"

                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SpareAdd;
