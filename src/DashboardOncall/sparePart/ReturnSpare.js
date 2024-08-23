import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { TrashIcon, PlusCircleIcon, XCircleIcon, EyeIcon } from '@heroicons/react/24/solid';
import { usePostReturnSpareMutation } from '../../app/features/api/sparePart/spareApi';
import userEvent from '@testing-library/user-event';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Swal from 'sweetalert2';
import Loading from '../../Pages/SharedPage/Loading';
import { toast } from 'react-toastify';

const ReturnSpare = ({ setReturnSpareVisible, returnSpare }) => {
    const [user] = useAuthState(auth)
    const { handleSubmit, register, control, reset, errors } = useForm();
    const spareNameList = ["Rectifier", "MRFU-900", "MRFU-1800", "ISV3", "ISM6", "ISM8", "RTN-950-controller"]
    const {
        fields: spareFields,
        append: spareAppend,
        remove: spareRemove,
    } = useFieldArray({ control, name: "bomNo" });

    const [postReturnSpare, { data, error, isError, isLoading }] = usePostReturnSpareMutation()

    useEffect(() => {
        if (data) {
            toast.success("Data save successfully")
            reset()
            setReturnSpareVisible(null)

        }
        else if (isError) {
            toast.error(error)
        }
    }, [data, isError, error, reset])

    /* Today calculate code */
    let date = new Date()
    date.setDate(date.getDate())
    const today = date.toLocaleDateString("en-CA")

    const onSubmit = (data) => {
        //console.log(data);
        const combineArray = data?.bomNo?.map((item, index) => {
            const returnData = {
                bomNo: item,
                spareName: data.spareName[index],
                spareStatus: data.spareStatus[index],
                returnQuantity: data.returnQuantity[index]

            }
            //console.log(returnData);
            postReturnSpare({date:data.date, ...returnData, remark:data.remark, updatedBy: user.displayName})
            
        })
       
    }


    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div className="flex  justify-center justify-items-center mt-8 mb-3">
                <div className="card w-full bg-base-100 shadow-2xl">
                    <div className="card-body">
                        <h2 className="text-center text-Pink-500 mb-3 text-2xl font-bold">
                            Provide Return Spare Info!
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col w-full  gap-3">
                                <div className=" grid grid-cols-1 justify-center items-center gap-10">
                                    <div className='flex flex-row gap-x-4 w-3/4 ml-28 items-center'>
                                        <label className="input input-bordered flex items-center font-semibold gap-2">
                                            Date:
                                            <input
                                                type="date"
                                                defaultValue={today}
                                                className="grow "
                                                {...register("date", {
                                                    required: {
                                                        value: true,
                                                        message: " Date is required",
                                                    },
                                                })}
                                            />
                                        </label>
                                        <div className='mt-2'>
                                            <button
                                                type='button'
                                                onClick={() => spareAppend("")}
                                                className='btn btn-outline '
                                            >
                                                <PlusCircleIcon className="h-8 w-8 text-green-400" />
                                                Add-Row
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex flex-col w-full md:w-5/6 mx-auto'>
                                        <div>
                                            <div className='card shadow-lg bg-red-100 py-2 px-2 gap-y-2'>
                                                {spareFields.map((item, index) => {
                                                    return (
                                                        <div className='flex flex-row gap-2 ' key={item.id}>
                                                            <label className="input input-bordered flex items-center font-semibold gap-2">
                                                                BOM_No:
                                                                <input
                                                                    type="text"
                                                                    className="grow"
                                                                    {...register(`bomNo[${index}]`)}
                                                                />
                                                            </label>
                                                            <label className="input input-bordered flex items-center font-semibold gap-2">
                                                                Name:
                                                                <select
                                                                    type="text"
                                                                    className="grow"
                                                                    {...register(`spareName[${index}]`)}
                                                                >
                                                                    <option value=""> ---Spare Name---</option>
                                                                    {
                                                                        spareNameList?.map((item, index) => (<option value={item} key={item + "aff"}> {item}</option>))
                                                                    }
                                                                </select>
                                                            </label>

                                                            <label className="input input-bordered flex items-center font-semibold gap-2">
                                                                Status:
                                                                <select
                                                                    type="text"
                                                                    className="grow"
                                                                    {...register(`spareStatus[${index}]`)}
                                                                >
                                                                    <option value="Faulty"> Faulty</option>
                                                                    <option value="Good_Return"> Good_Return</option>

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
                                                                className='grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 
                                                                border border-red-500 h-11 w-11'
                                                            >
                                                                <TrashIcon
                                                                    className='text-red-500 h-6' />
                                                            </button>
                                                        </div>


                                                    );
                                                })}
                                            </div>

                                        </div>
                                    </div>


                                    <textarea
                                        type="text"
                                        placeholder="Type issue if have"
                                        className="input input-bordered w-5/6 mx-auto "
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
                                    <button onClick={() => setReturnSpareVisible(false)}
                                        className="btn btn-warning hover:btn-error">Cancel</button>
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