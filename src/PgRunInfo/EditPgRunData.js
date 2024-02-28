
import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../Pages/Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Pages/SharedPage/Loading';
import { toast } from 'react-toastify';

const EditPgRunData = ({ editPgRun, setEditPgRun, refetch }) => {
    const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm();

    const { isLoading, data: rectifiers = [] } = useQuery(["rectifiers"], () =>
        axiosSecure("/rectifier")
            .then((res) => {
                return res.data
            })
    );

    // console.log(services)
    if (isLoading) {
        return <Loading />;
    }

    const {
        _id,
        date,
        site,
        pgStartTime,
        pgStoptTime,
        capacity,
        pgRunnerName,

    } = editPgRun;
    // console.log(editPgRun)


    const onSubmit = (data) => {

        const siteNo = data.site || site;
        let mod = data.capacity !== "" ? data.capacity :capacity;
        let consumeFuel = rectifiers?.filter((rec) => rec.capacity === mod);
        const consumePerModule = consumeFuel.map((ff) => ff.consumeFuel);
        // console.log(consumePerModule)

        const pgStart = data.pgStartTime !=="" ? data.pgStartTime : pgStartTime;
        const pgStop = data.pgStoptTime !=="" ? data.pgStoptTime: pgStoptTime;
        let start = pgStart.split(":");
        let stop = pgStop.split(":");
        let startTime = new Date(0, 0, 0, start[0], start[1], 0);
        let stopTime = new Date(0, 0, 0, stop[0], stop[1], 0);
        let diff = stopTime.getTime() - startTime.getTime();
        // console.log(diff)
        const hours = Math.floor(diff / 3600000);
        //console.log(hours);
        diff = diff - hours * 1000 * 3600;
        const minutes = Math.floor(diff / 60000);
        //console.log(minutes);
        const duration = `${hours}:${minutes}`;

        const time = duration.split(":");
        const timeValue = parseInt(time[0], 10) + parseInt(time[1], 10) / 60;

        const consume = parseFloat(timeValue * consumePerModule[0]).toFixed(2);

        const updatePgRunData = {
            site: siteNo,
            date: data.date || date,
            pgStartTime: pgStart,
            pgStoptTime: pgStop,
            moduleCapacity:mod,
            pgRunDuration: duration,
            fuelConsume: consume,

        };
        const updateInfo = async () => {
            const { data } = await axiosSecure.put(`/pgRunData/${_id}`, updatePgRunData)
            // console.log(data)
            if (data.modifiedCount > 0) {
                toast.success("Data update success")
                reset()
                refetch()
                setEditPgRun(null)
            }
        }
        updateInfo()


    }

    // for form reset purpose when click cancel button
    const handleClose = () => {
        reset()
    }

    return (
        <div className=''>
            <div className='mt-2'>
                <input type="checkbox" id="editPgRun_modal" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box">
                        <div className='modal-action'>
                            <label htmlFor="editPgRun_modal" onClick={handleClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-4">✕</label>

                        </div>
                        <h3 className=" text-center font-bold text-pink-600 text-xl mb-2">
                            Check & Update bellow query!
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=" form-control w-full max-w-xs  mb-2">
                                <label className="input-group">
                                    <span className="label-text font-bold">Date:</span>
                                    <input
                                        type="date"
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
                                    <span className="label-text font-bold">Module capacity:</span>
                                    <select
                                        type="text"
                                        defaultValue={capacity}
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("capacity")}
                                    >

                                        {rectifiers?.map((recti) => (
                                            <option value={recti.capacity}>{recti.capacity} </option>
                                        ))}
                                    </select>
                                </label>


                            </div>

                            <div className=" form-control w-full max-w-xs mb-2">
                                <label className="input-group">
                                    <span className="label-text font-bold">Start Time:</span>
                                    <input
                                        type="time"
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
                                        type="time"
                                        defaultValue={pgStoptTime}
                                        className="input input-bordered w-full max-w--xs"
                                        {...register("pgStoptTime")}
                                    />
                                </label>
                            </div>

                            <div className=" form-control w-full max-w-xs mb-2">
                                <label className="input-group">
                                    <span className="label-text font-bold">PgRunner:</span>
                                    <input
                                        type="text"
                                        defaultValue={pgRunnerName}
                                        readOnly
                                        className="input input-bordered w-full max-w--xs"
                                        {...register("pgRunnerName")}
                                    />
                                </label>
                            </div>

                            <input
                                type="submit"
                                className="btn btn-accent w-full max-w-xs m-2"
                                /* onClick={() => handlePgEdit(pgEdit)} */
                                value="Update"
                            />

                        </form>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default EditPgRunData;