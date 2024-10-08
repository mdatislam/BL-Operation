import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useSiteList from '../../Pages/Hook/useSiteList';
import useUserList from '../../Pages/Hook/useUserList';
import { useGetReturnSpareQuery, useGetSpareBomListQuery, usePostOwnSpareMutation, usePostReturnSpareMutation } from '../../app/features/api/sparePart/spareApi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loading from '../../Pages/SharedPage/Loading';

const AddOwnSpare = ({ OwnSpareAddVisible, setOwnSpareAddVisible }) => {
    const [user] = useAuthState(auth)
    const [selectSpare, setSelectSpare] = useState("")
    const [spareBomNo, setSpareBomNo] = useState("")
    const { data: returnSpareList = [], isLoading:returnLoading } = useGetReturnSpareQuery()
    // console.log(returnSpareList);
    const [ownSpareAdd, { isLoading, data, isError, error }] = usePostOwnSpareMutation()
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const { data: spareBomList = [], isLoading: loading } = useGetSpareBomListQuery()
    //console.log(spareBomList);

    const [postReturnSpare] = usePostReturnSpareMutation();
    /* const spareTypeList = ["RAN", "BTS", "MW", "Power", "CIVIL"] */

    const handleSpareName = (e) => {
        const name = e.target.value
        setSelectSpare(name)
        const spareInfo = spareBomList?.find(item => item.spareName === name)
        if (spareInfo) {
            setSpareBomNo(spareInfo.bomNo)
        }

    }

    useEffect(() => {
        if (data) {
            toast.success("Data save successfully")
            reset()
            setOwnSpareAddVisible(false)
        }
        else if (isError) {
            toast.error(error)
        }
    }, [data, isError, error, reset, selectSpare])
    /* Today calculate code */
    let date = new Date()
    date.setDate(date.getDate())
    const today = date.toLocaleDateString("en-CA")


    const onSubmit = (data) => {
        //console.log({ ...data, spareName: selectSpare, bomNo: spareBomNo, updatedBy: user.displayName });
        ownSpareAdd({
            spareName: selectSpare, bomNo: spareBomNo,
            ...data, updatedBy: user.displayName, replacement: []

        })
const checkReturnSpareList= returnSpareList?.find(returnSpare=>returnSpare.bomNo=== spareBomNo)
if(!checkReturnSpareList){
    postReturnSpare({date: data.date, spareName: selectSpare, bomNo: spareBomNo,
        spareStatus:"",returnQuantity:"0", remark: "yet not return", updatedBy: user.displayName})
}

    }
    // console.log(spareBomNo);
    // console.log(selectSpare);

    if (isLoading || loading || returnLoading) {
        return <Loading />
    }

    return (
        <div className="flex  justify-center justify-items-center mt-8 mb-3">
            <div className="card w-96 md:w-3/4 bg-base-100 shadow-2xl">
                <div className="card-body">
                    <h2 className="text-center text-Pink-700 mb-3 text-2xl font-bold">
                        Provide Own Spare Info!
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col  gap-3">
                            <div className=" grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4">

                                <label className="input input-bordered flex items-center font-semibold gap-2">
                                    Spare_Name:
                                    <select
                                        type="text"
                                        value={selectSpare}
                                        onChange={handleSpareName}
                                        className="w-64 max-w-sm"

                                    >
                                        <option value=""> ---Spare Name---</option>
                                        {
                                            spareBomList?.map((item, index) =>
                                                (<option value={item.spareName} key={item._id}> {item.spareName}</option>))
                                        }

                                    </select>
                                </label>

                                <label className="input input-bordered font-semibold flex items-center gap-2">
                                    BOM_No:
                                    <input
                                        type="text"
                                        value={spareBomNo}
                                        readOnly
                                        className="grow"

                                    />

                                </label>

                                {/* <label className="input input-bordered flex items-center font-semibold gap-2">
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
                                            spareTypeList.map((item, index) => (<option value={item} key={index + "as"} > {item}</option>))
                                        }

                                    </select>
                                    <label className="label">
                                        {errors.spareType?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.spareType.message}
                                            </span>
                                        )}
                                    </label>
                                </label> */}

                                <label className="input input-bordered font-semibold flex items-center gap-2">
                                    Good_Quantity:
                                    <input
                                        type="number"
                                        className="grow"
                                        {...register("ownGoodStock", {
                                            required: {
                                                value: true,
                                                message: " Own Good Stock is required",
                                            },
                                        })}
                                    />
                                    <label className="label">
                                        {errors.ownGoodStock?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.ownGoodStock.message}
                                            </span>
                                        )}
                                    </label>
                                </label>
                                <label className="input input-bordered font-semibold flex items-center gap-2">
                                    Faulty_Quantity:
                                    <input
                                        type="number"
                                        className="grow"
                                        {...register("ownFaultyStock", {
                                            required: {
                                                value: true,
                                                message: "Faulty Quantity is required",
                                            },
                                        })}
                                    />
                                    <label className="label">
                                        {errors.ownFaultyStock?.type === "required" && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.ownFaultyStock.message}
                                            </span>
                                        )}
                                    </label>
                                </label>
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
                                <button onClick={() => setOwnSpareAddVisible(false)}
                                    className="btn btn-warning hover:btn-error">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddOwnSpare;