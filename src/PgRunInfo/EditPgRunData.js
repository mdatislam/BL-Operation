
import React from 'react';
import { useForm } from 'react-hook-form';

const EditPgRunData = ({ editPgRun, setEditPgRun,refetch }) => {
    const { register, handleSubmit, reset } = useForm();
    //console.log(editPgRun)
    
    const {
        date,
        site,
        pgStartTime,
        pgStoptTime,
        pgRunDuration,
        fuelConsume,
        pgRunnerName,

    } = editPgRun;
   
    const onSubmit = (data) => {
        const updatePgRunData = {

        };
        reset()
    }
  
    return (
        <div className='mt-2'>
            <input type="checkbox" id="editPgRun_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <label htmlFor="editPgRun_modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h3 className=" text-center font-bold text-pink-600 text-xl mb-4">
                        Check & Update bellow query!
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" form-control w-full max-w-xs  mb-2">
                            <label className="input-group">
                                <span className="label-text font-bold">Date:</span>
                                <input
                                    type="text"
                                    defaultValue={date}
                                    className="input input-bordered w-full max-w--xs"
                                    {...register("date")}
                                />
                            </label>
                        </div>

                        <div className=" form-control w-full max-w-xs mb-2">
                            <label className="input-group">
                                <span className="label-text font-bold">Site:</span>
                                <input
                                    type="text"
                                    defaultValue={site}
                                    className="input input-bordered w-full max-w--xs"
                                    {...register("site")}
                                />
                            </label>
                        </div>

                        <div className=" form-control w-full max-w-xs mb-2">
                            <label className="input-group">
                                <span className="label-text font-bold">Start Time:</span>
                                <input
                                    type="text"
                                    defaultValue={pgStartTime}
                                    className="input input-bordered w-full max-w--xs"
                                    {...register("pgStartTime")}
                                />
                            </label>
                        </div>

                        <div className=" form-control w-full max-w-xs mb-2">
                            <label className="input-group">
                                <span className="label-text font-bold">Stop Time:</span>
                                <input
                                    type="text"
                                    defaultValue={pgStoptTime}
                                    className="input input-bordered w-full max-w--xs"
                                    {...register("pgStoptTime")}
                                />
                            </label>
                        </div>

                        <div className=" form-control w-full max-w-xs mb-2">
                            <label className="input-group">
                                <span className="label-text font-bold">Duration:</span>
                                <input
                                    type="text"
                                    defaultValue={pgRunDuration}
                                    className="input input-bordered w-full max-w--xs"
                                    {...register("pgRunDuration")}
                                />
                            </label>
                        </div>

                        <div className=" form-control w-full max-w-xs mb-2">
                            <label className="input-group">
                                <span className="label-text font-bold">Consume:</span>
                                <input
                                    type="text"
                                    defaultValue={fuelConsume}
                                    className="input input-bordered w-full max-w--xs"
                                    {...register("fuelConsume")}
                                />
                            </label>
                        </div>

                        <div className=" form-control w-full max-w-xs mb-2">
                            <label className="input-group">
                                <span className="label-text font-bold">PgRunner:</span>
                                <input
                                    type="text"
                                    defaultValue={pgRunnerName}
                                    className="input input-bordered w-full max-w--xs"
                                    {...register("pgRunnerName")}
                                />
                            </label>
                        </div>

                        <input
                            type="submit"
                            className="btn btn-accent w-full max-w-xs m-2"
                            /* onClick={() => handlePgEdit(pgEdit)} */
                            value="Update-Status"
                        />

                    </form>

                </div>
            </div>

        </div>
    );
};

export default EditPgRunData;