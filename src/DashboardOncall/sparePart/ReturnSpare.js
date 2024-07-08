import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { TrashIcon, PencilSquareIcon, XCircleIcon, EyeIcon } from '@heroicons/react/24/solid';

const ReturnSpare = ({ setReturnSpareVisible, returnSpare }) => {
    const { handleSubmit, register, control, reset, errors } = useForm();
    const spareNameList = ["Rectifier", "MRFU-900", "MRFU-1800", "ISV3", "ISM6", "ISM8", "RTN-950-controller"]
    const {
        fields: spareFields,
        append: spareAppend,
        remove: spareRemove,
    } = useFieldArray({ control, name: "bomNo" });


    const onSubmit = (data) => {
        console.log(data);
        /* postJob({...data,applicant:[],askQuestion:[]}) */
        /* if (res?.postRes?.acknowledged) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            reset()
        } */
    }

    /* Today calculate code */
    let date = new Date()
    date.setDate(date.getDate())
    const today = date.toLocaleDateString("en-CA")

    return (
        <div>
            <div className="flex  justify-center justify-items-center mt-8 mb-3">
                <div className="card w-full bg-base-100 shadow-2xl">
                    <div className="card-body">
                        <h2 className="text-center text-Pink-700 mb-3 text-2xl font-bold">
                            Provide Return Spare Info!
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col w-full  gap-3">
                                <div className=" grid grid-cols-1 justify-center items-center gap-4">
                                    <label className="input input-bordered w-1/4 justify-start flex items-center font-semibold gap-2">
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

                                    {/* <div className='card shadow-lg bg-red-100 py-3 px-2 pr-2'>
                                        <div className='flex flex-row gap-2 '>
                                            <label className="input input-bordered flex items-center font-semibold gap-2">
                                                BOM_No:
                                                <input
                                                    type="text"
                                                    defaultValue={today}
                                                    className="grow"
                                                    {...register("bomNo")}
                                                />
                                            </label>
                                            <label className="input input-bordered flex items-center font-semibold gap-2">
                                                Name:
                                                <select
                                                    type="text"
                                                    className="grow"
                                                    {...register("spareName")}
                                                >
                                                    <option value=""> ---Spare Name---</option>
                                                    {
                                                        spareNameList.sort((a, b) => a.localeCompare(b))
                                                            .map((item, index) => (<option value={item} key={item + "aff"}> {item}</option>))
                                                    }
                                                </select>
                                            </label>

                                            <label className="input input-bordered flex items-center font-semibold gap-2">
                                                Status:
                                                <select
                                                    type="text"
                                                    className="grow"
                                                    {...register("spareStatus")}
                                                >
                                                    <option value="Faulty"> Faulty</option>
                                                    <option value="Good_Return"> Good_Return</option>

                                                </select>
                                            </label>

                                            <label className="input input-bordered flex items-center font-semibold gap-2">
                                                Quantity:
                                                <input
                                                    type="number"
                                                    defaultValue={today}
                                                    className="grow"
                                                    {...register("returnQuantity")}
                                                />
                                            </label>
                                            <div>
                                                <button
                                                    type='button'
                                                    onClick={() => spareAppend("")}
                                                    className='btn btn-outline btn-info'
                                                >
                                                    More_Return
                                                </button>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className='flex flex-col w-full'>
                                        <div>
                                            <div className='card shadow-lg bg-red-100 py-2 px-2 gap-y-2'>
                                                {spareFields.map((item, index) => {
                                                    return (
                                                        <div className='flex flex-row gap-2 ' key={item.key}>
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
                                                                        spareNameList.sort((a, b) => a.localeCompare(b))
                                                                            .map((item, index) => (<option value={item} key={item + "aff"}> {item}</option>))
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
                                            <div className='mt-2'>
                                                <button
                                                    type='button'
                                                    onClick={() => spareAppend("")}
                                                    className='btn btn-outline btn-info'
                                                >
                                                    More_Return
                                                </button>
                                            </div>
                                        </div>
                                    </div>


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