import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { toast } from 'react-toastify';

const LubOilEdit = ({lubOilEdit,setLubOilEdit,refetch}) => {
    const [axiosSecure] = useAxiosSecure()
    const {_id,receivingDate,receivingQuantity}= lubOilEdit
//console.log(_id,receivingDate)

    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        const EditLubOilData = {
            receivingDate:data.receiveDate,
            receivingQuantity:data.receiveQuantity,
            remark:data.remarks

        };
        //console.log(EditLubOilData);

        const updateLubOil = async () => {
            const { data } = await axiosSecure.put(`/lubOil/${_id}`, EditLubOilData)
            //console.log(data)
            if (data.acknowledged) {
              toast.success("Successfully Lub-oil update ")
              reset()
              refetch()
              setLubOilEdit(null)
            }
            else {
              toast.error(`Warning: ${data.msg}`);
            }
      
          }
          updateLubOil()

    }

    return (
        <div>
            <input type="checkbox" id="lubOilEdit" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box relative">
                    <label
                        htmlFor="lubOilEdit"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className=" text-center font-bold text-pink-500 text-xl mb-2">
                        Update Bellow Items!
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-row gap-2'>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Date:</span>
                                </label>
                                <input type='date'
                                    placeholder='Mention date'
                                    defaultValue={receivingDate}
                                    className='input input-bordered w-full max-w-xs mx-2'

                                    {...register("receiveDate", {
                                        required: {
                                            value: true,
                                            message: "Receive date Required"
                                        }
                                    })}
                                />

                                <label className="label">
                                    {errors.receiveDate?.type === "required" && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.receiveDate.message}
                                        </span>
                                    )}
                                </label>
                            </div>


                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Receive Quantity:</span>
                                </label>
                                <input type='number'
                                    placeholder='Received Quantity'
                                    className='input input-bordered w-full max-w-xs mx-2'
                                        defaultValue={receivingQuantity}
                                    {...register("receiveQuantity", {
                                        required: {
                                            value: true,
                                            message: "Receive Quantity Required"
                                        }
                                    })}
                                />

                                <label className="label">
                                    {errors.receiveQuantity?.type === "required" && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.receiveQuantity.message}
                                        </span>
                                    )}
                                </label>
                            </div>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <textarea
                                placeholder="Please mention Remarks! "
                                className="input input-bordered w-full max-w-xs mx-2 "
                                {...register("remarks")}
                            />
                            
                        </div>
                        <input
                            type="submit"
                            className="btn btn-accent w-full max-w-xs m-2"
                            /* onClick={() => handleLubOilEdit(pgEdit)} */
                            value="Update-Status"
                        />
                    </form>
                </div>
            </div>
        </div>

    );
};

export default LubOilEdit;