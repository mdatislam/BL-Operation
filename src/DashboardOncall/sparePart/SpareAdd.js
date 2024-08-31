
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUserList from "../../Pages/Hook/useUserList";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useGetReturnSpareQuery, useGetSpareBomListQuery, usePostNewSpareMutation, usePostReturnSpareMutation } from "../../app/features/api/sparePart/spareApi";
import Loading from "../../Pages/SharedPage/Loading";
import { toast } from "react-toastify";


const SpareAdd = ({ spareAddVisible, setSpareAddVisible }) => {
    const [user] = useAuthState(auth)
    const [userList] = useUserList()
    const [selectSpare, setSelectSpare] = useState("")
    const [spareBomNo, setSpareBomNo] = useState("")
    const [spareAdd, { isLoading, data, isError, error }] = usePostNewSpareMutation()
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const { data: spareBomList = [], isLoading: loading } = useGetSpareBomListQuery()
    //console.log(spareBomList);
    const { data: returnSpareList = [], isLoading:returnLoading } = useGetReturnSpareQuery()
    // console.log(returnSpareList);
    const [postReturnSpare] = usePostReturnSpareMutation();
    const handleSpareName = (e) => {
        const name = e.target.value
        setSelectSpare(name)
        const spareInfo = spareBomList?.find(item => item.spareName === name)
        if (spareInfo) {
            setSpareBomNo(spareInfo.bomNo)
        }

    }

    /* const spareTypeList = ["RAN", "BTS", "MW", "Power", "CIVIL"] */

    useEffect(() => {
        if (data) {
            toast.success("Data save successfully")
            reset()
            setSpareAddVisible(false)
        }
        else if (isError) {
            toast.error(error)
        }
    }, [data, isError, error, reset])

    const onSubmit = (data) => {
        //console.log({ ...data, updatedBy: user.displayName });
        spareAdd({
            spareName: selectSpare, bomNo: spareBomNo,
            ...data, updatedBy: user.displayName,
            spmsFaultyQuantity: 0, replacement: []
        })

        const checkReturnSpareList= returnSpareList?.find(returnSpare=>returnSpare.bomNo===spareBomNo )
        console.log(checkReturnSpareList);
        if(!checkReturnSpareList){
            postReturnSpare({date: "", spareName: selectSpare, bomNo: spareBomNo,
                spareStatus:"",returnQuantity:"0", remark: "yet not return", updatedBy: user.displayName})
        }

    }

    if (isLoading || loading || returnLoading) {
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
                                    **Spare_Name:
                                    <select
                                        type="text"
                                        value={selectSpare}
                                        onChange={handleSpareName}
                                        className="w-64 max-w-sm"
                                    >
                                        <option value=""> -------Select Spare Name-----</option>
                                        {
                                            spareBomList.map(item =>
                                                (<option value={item.spareName} key={item._id}> {item.spareName}</option>))
                                        }

                                    </select>
                                </label>

                                <label className="input input-bordered font-semibold flex items-center gap-2">
                                    ** BOM_No:
                                    <input
                                        type="text"
                                        value={spareBomNo}
                                        readOnly
                                        className="grow"
                                    />
                                </label>
                                <label className="input input-bordered font-semibold flex items-center gap-2">
                                    ** Challan_No:
                                    <input
                                        type="text"
                                        placeholder="Provided by SPMS"
                                        className="grow"
                                        {...register("challanNo", {
                                            required: {
                                                value: true,
                                                message: " Challan no is required",
                                            },
                                        })}
                                    />
                                    <label className="label">
                                        {errors.challanNo?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.challanNo.message}
                                            </span>
                                        )}
                                    </label>
                                </label>

                                {/*  <label className="input input-bordered flex items-center font-semibold gap-2">
                                    Status:
                                    <select
                                        type="text"
                                        className="grow"
                                        {...register("source", {
                                            required: {
                                                value: true,
                                                message: " Collecting Source is required",
                                            },
                                        })}
                                    >
                                        <option value=""> -------Select Source-----</option>
                                        <option value="SPMS-Huawei"> SPMS-Huawei</option>
                                        <option value="SPMS-ZTE">SPMS-ZTE</option>
                                        <option value="BL"> BL</option>
                                    </select>
                                    <label className="label">
                                        {errors.status?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.status.message}
                                            </span>
                                        )}
                                    </label>
                                </label> */}

                                <label className="input input-bordered font-semibold flex items-center gap-2">
                                    ** Quantity:
                                    <input
                                        type="number"
                                        className="grow"
                                        {...register("spmsGoodQuantity", {
                                            required: {
                                                value: true,
                                                message: " Quantity is required",
                                            },
                                        })}
                                    />
                                    <label className="label">
                                        {errors.spmsGoodQuantity?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.spmsGoodQuantity.message}
                                            </span>
                                        )}
                                    </label>
                                </label>
                                {/*  <div className="text-blue-400">
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
                                </div> */}
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

                                <label className="input input-bordered font-semibold flex items-center gap-2">
                                    Serial_No:
                                    <input
                                        type="text"
                                        className="grow"
                                        {...register("serialNo")}
                                    />
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
                                        <option value=""> ---Requester Name---</option>
                                        {
                                            userList?.map(user => (<option value={user.name}> {user.name}</option>))
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


                                <textarea
                                    type="text"
                                    placeholder="Type issue if have"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("remark")}
                                />


                            </div>
                            <div className="flex items-center justify-center gap-x-4 ">
                                <input
                                    type="submit"
                                    className="btn btn-success max-w-xs m-2 hover:btn-info"
                                    /*  disabled={isLoading ? true:false} */
                                    value="Save_Spare"

                                />
                                <button onClick={() => setSpareAddVisible(false)}
                                    className="btn btn-warning hover:btn-error">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SpareAdd;
