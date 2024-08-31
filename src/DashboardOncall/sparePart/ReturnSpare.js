import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { TrashIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { useGetSpareBomListQuery, usePostReturnSpareMutation } from '../../app/features/api/sparePart/spareApi';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../../Pages/SharedPage/Loading';
import { toast } from 'react-toastify';

const ReturnSpare = ({ setReturnSpareVisible, returnSpare }) => {
    const [user] = useAuthState(auth);
    //const [selectedSpare, setSelectedSpare] = useState([])
    const [selectedBom, setSelectedBom] = useState(0)
    const { handleSubmit, register, control, reset } = useForm();
    const { data: spareBomList = [], isLoading: loading } = useGetSpareBomListQuery();

    const {
        fields: spareFields,
        append: spareAppend,
        remove: spareRemove,
    } = useFieldArray({ control, name: "spareName" });

    const [postReturnSpare, { data: res, error, isError, isLoading: isPosting }] = usePostReturnSpareMutation();

    useEffect(() => {
        if (res?.acknowledged) {
            toast.success("Data saved successfully");
            reset();
            setReturnSpareVisible(null);
        } else if (isError) {
            toast.error(error.message || "An error occurred");
        }
    }, [res, isError, reset, setReturnSpareVisible]);

    /* Today calculate code */
    let date = new Date();
    date.setDate(date.getDate());
    const today = date.toLocaleDateString("en-CA");

    const onSubmit = (data) => {
        //console.log(data)
        data?.spareName.map((item, index) => {
            const selectSpareInfo = spareBomList.find(rowData => rowData.spareName === item);
            const returnData = {
                spareName: item,
                bomNo: selectSpareInfo.bomNo,
                spareStatus: data.spareStatus[index],
                returnQuantity: data.returnQuantity[index],
            };
            postReturnSpare({ date: data.date, ...returnData, remark: data.remark, updatedBy: user.displayName });
            return item
        });
    };

    if (isPosting || loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="flex justify-center mt-8 mb-3">
                <div className="card w-full bg-base-100 shadow-2xl">
                    <div className="card-body">
                        <h2 className="text-center text-pink-500 mb-3 text-2xl font-bold">
                            Provide Return Spare Info!
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col w-full gap-3">
                                <div className="grid grid-cols-1 justify-center items-center gap-10">
                                    <div className='flex flex-row gap-x-4 w-3/4 ml-28 items-center'>
                                        <label className="input input-bordered flex items-center font-semibold gap-2">
                                            Date:
                                            <input
                                                type="date"
                                                defaultValue={today}
                                                className="grow"
                                                {...register("date", {
                                                    required: {
                                                        value: true,
                                                        message: "Date is required",
                                                    },
                                                })}
                                            />
                                        </label>
                                        <div className='mt-2'>
                                            <button
                                                type='button'
                                                onClick={() => spareAppend({ spareName: "", bomNo: "", spareStatus: "", returnQuantity: 0 })}
                                                className='btn btn-outline'
                                            >
                                                <PlusCircleIcon className="h-8 w-8 text-green-400" />
                                                Add-Item
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex flex-col w-full mx-16'>
                                        <div className='flex w-full'>
                                            <div className='card shadow-lg bg-red-100 py-6 px-6 gap-y-2'>
                                                {spareFields.map((item, index) => {
                                                    return (
                                                        <div className='flex flex-row gap-2' key={item.id}>
                                                            <label className="input input-bordered flex items-center font-semibold gap-2">
                                                                Name:
                                                                <select
                                                                    type="text"
                                                                    className="w-52 max-w-sm"
                                                                    {...register(`spareName[${index}]`)}
                                                                >
                                                                    <option value="">---Spare Name---</option>
                                                                    {spareBomList?.map((spareItem, idx) => (
                                                                        <option value={spareItem.spareName} key={idx}>
                                                                            {spareItem.spareName}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </label>
                                                            {/* <label className="input input-bordered flex items-center font-semibold gap-2">
                                                                BOM_No:
                                                                <input
                                                                    type="text"
                                                                    value={selectedBom}
                                                                    onChange={handleBom}
                                                                    
                                                                    className="w-52 max-w-sm"
                                                                  {...register(`spareBom[${index}]`)}
                                                                />
                                                            </label>  */}
                                                            <label className="input input-bordered flex items-center font-semibold gap-2">
                                                                Status:
                                                                <select
                                                                    type="text"
                                                                    className="grow"
                                                                    {...register(`spareStatus[${index}]`)}
                                                                >
                                                                    <option value="Faulty">Faulty</option>
                                                                    <option value="Good_Return">Good_Return</option>
                                                                </select>
                                                            </label>
                                                            <label className="input input-bordered flex items-center font-semibold gap-2">
                                                                Quantity:
                                                                <input
                                                                    type="number"
                                                                    className="grow"
                                                                    {...register(`returnQuantity[${index}]`)}
                                                                />
                                                            </label>

                                                            <button
                                                                type='button'
                                                                onClick={() => spareRemove(index)}
                                                                className='grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11'
                                                            >
                                                                <TrashIcon className='text-red-500 h-6' />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                                {/* <button
                                                    type='button'
                                                    onClick={() => spareAppend({ spareName: "", bomNo: "", spareStatus: "", returnQuantity: 0 })}
                                                    className='btn btn-md w-48 btn-primary btn-outline'
                                                >
                                                    <PlusCircleIcon className="h-8 w-8 text-green-400" />
                                                    Add-Item
                                                </button> */}
                                            </div>
                                        </div>
                                    </div>
                                    <textarea
                                        type="text"
                                        placeholder="Type issue if have"
                                        className="input input-bordered w-full md:w-3/5 mx-24"
                                        {...register("remark")}
                                    />
                                </div>
                                <div className="flex items-center justify-center gap-x-4">
                                    <input
                                        type="submit"
                                        className="btn btn-success max-w-xs m-2 hover:btn-info"
                                        value="Save_Spare"
                                    />
                                    <button onClick={() => setReturnSpareVisible(false)} className="btn btn-warning hover:btn-error">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnSpare;
