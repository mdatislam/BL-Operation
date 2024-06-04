import React, { useState } from 'react';
import { useGetThanaWiseAlarmQuery } from '../../app/features/api/powerShutDown/powerShutDownApi';
import { Bar, BarChart, XAxis } from 'recharts';

const ThanaWisePowerAlarm = () => {
    const [delay, setDelay] = useState("1")
    const { data: thanaWiseAlarm = [], isLoading } = useGetThanaWiseAlarmQuery(delay)
    console.log(thanaWiseAlarm)
    const handleDelayTime = (event) => {
        event.preventDefault()
        setDelay(event.target.delayTime.value)
    }

    const data=[]
    return (
        <div className='bg-slate-300 py-3'>
            <div>
                <div className='card mx-auto w-3/4  shadow-xl bg-slate-100 py-4 my-3'>
                    <form className='px-2' autoComplete='off' onSubmit={handleDelayTime}>
                        <div className="flex flex-row gap-x-4 justify-start items-center">
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text text-pink-400 font-bold">আপনি কত মিনিট পাওয়ার অ্যালার্ম এর পর থেকে সাইট গুলো লক করতে চাচ্ছেন ? </span>
                                </div>
                                <input type="number"
                                    required
                                    name='delayTime'
                                    placeholder='Enter delay Minutes, default have 60 mints'
                                    className="input input-bordered w-full max-w-xs" />
                            </label>
                            <div className='mt-8'>
                                <button className=" btn btn-outline btn-secondary max-w-xs mt-6"
                                    type="submit"
                                >View Thana Wise Dashboard</button>
                            </div>
                        </div>

                    </form>
                </div>
                {/* chart part */}
                <div>
                    <div className='border-r-2 border-emerald-400 my-1 '>
                        <BarChart
                            width={1500}
                            height={300}
                            data={thanaWiseAlarm}
                            margin={{
                                top: 40,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >

                            <XAxis dataKey="Thana" style={{ fontWeight: 'bold', fill: "blue" }} />
                            <Bar dataKey="count" stackId="a" fill="#ffbf28" label={{
                                position: 'center',
                                fill: "red", fontWeight: 'bold', fontSize: "20px"
                            }} barSize={20} />
                            <text x="50%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
                                style={{ fontWeight: 'bold', fontSize: "17px", fill: "#ff00bf" }} >
                                Down_Priority
                            </text>
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThanaWisePowerAlarm;