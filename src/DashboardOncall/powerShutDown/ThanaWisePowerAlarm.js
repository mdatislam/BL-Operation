import React, { useState } from 'react';
import { useGetThanaWiseAlarmQuery } from '../../app/features/api/powerShutDown/powerShutDownApi';
import { Bar, BarChart, Label, XAxis, ResponsiveContainer } from 'recharts';
import Loading from '../../Pages/SharedPage/Loading';

const ThanaWisePowerAlarm = () => {
    const [delay, setDelay] = useState("1")
    const { data: thanaWiseAlarm = [], isLoading } = useGetThanaWiseAlarmQuery(delay)
    console.log(thanaWiseAlarm)
    const handleDelayTime = (event) => {
        event.preventDefault()
        setDelay(event.target.delayTime.value)
    }
    const totalPowerAlarm= thanaWiseAlarm.reduce((pre,item)=>{
        return pre+item.count
    },0)
if(isLoading){
    return <Loading />
}

    return (
        <div className='bg-base-300 py-3'>
            <div>
                <div className='card mx-auto w-1/2  shadow-xl bg-base-100 '>
                    <div className='card-body'>
                        <form className='' autoComplete='off' onSubmit={handleDelayTime}>
                            <div>
                                <h2 className="lebel-text text-blue-400 font-bold">
                                    আপনি যত ঘন্টা ধরে পাওয়ার এলার্মের সংখ্যা থানা অনুসারে দেখতে চান সেটি নিচের ঘরে লিখে পাশের বাটন এ ক্লিক করেন !!
                                </h2>
                                <div className='flex flex-row w-full gap-x-2 justify-start items-center'>
                                    <div className='mt-2'>
                                        <input type="number"
                                            required
                                            name='delayTime'
                                            placeholder='Default have 1 hr'
                                            className="input input-bordered w-full  max-w-xs" />
                                    </div>
                                    <div className=''>
                                        <button className=" btn btn-outline btn-info max-w-xs mt-2"
                                            type="submit"
                                        >View Thana Wise Dashboard</button>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
                {/* chart part */}
                <div className='card bg-base-100 shadow-xl mt-2 mx-2 py-2'>
                    <div className='card w-3/4 mt-2 mx-auto py-3 shadow-xl bg-base-200'>
                        <div className=''>
                            <h2 className='text-center text-xl text-pink-400 font-bold font-serif'> Thana Wise Power alarm for 
                            <span className='font-extrabold font-sans'> {delay} Hrs, </span> Total thana {thanaWiseAlarm.length} &
                            Total power Alarm= {totalPowerAlarm}.
                            </h2>
                        </div>
                    </div>

                    <div className='card-body' style={{ width: '100%', height: '500px' }}>
                        <ResponsiveContainer>
                            <BarChart
                                data={thanaWiseAlarm}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 10,
                                    bottom: 100,
                                }}
                            >

                                <XAxis dataKey="Thana" angle="-60" textAnchor="end" style={{ fontWeight: 'bold' }} interval={0} />
                                <Label value="X Axis Label" offset={20} position="outsideBottom" />
                                <Bar dataKey="count" stackId="a" fill="#ffbf28" label={{
                                    position: 'center',
                                    fill: "red", fontWeight: 'bold', fontSize: "20px"
                                }} barSize={30} />
                                {/* <text x="50%" y={10} fill="blue" textAnchor="middle" dominantBaseline="central"
                                    style={{ fontWeight: 'bold', fontSize: "25px", fill: "#7ca6d2",  }} >
                                    Thana Wise Power Alarm for {delay} Hrs
                                </text> */}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThanaWisePowerAlarm;