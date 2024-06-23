import React, { useEffect, useState } from 'react';
import { useGetThanaWiseAlarmQuery } from '../../app/features/api/powerShutDown/powerShutDownApi';
import { Bar, BarChart, Label, XAxis, ResponsiveContainer } from 'recharts';
import Loading from '../../Pages/SharedPage/Loading';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';

const ThanaWisePowerAlarm = () => {
    const [delay, setDelay] = useState("1")
    const [dist, setDist] = useState("")
    const [office, setOffice] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const { data: thanaWiseAlarm = [], isLoading } = useGetThanaWiseAlarmQuery(delay)
    console.log(thanaWiseAlarm)
    //console.log(dist)

    // Extract unique district names
    const uniqueOffice = [...new Set(thanaWiseAlarm.map(item => item.Office))];
    const uniqueDistricts = [...new Set(filteredData.map(item => item.District))];
    //console.log(uniqueDistricts)
    const handleDelayTime = (event) => {
        event.preventDefault()
        setDelay(event.target.delayTime.value)
        setDist(event.target.district.value)
    }
    const handleDist = (event) => {
        setDist(event.target.value)
    }

    const handleOffice = (event) => {
        setOffice(event.target.value)
    }

    useEffect(() => {
        let selectData = thanaWiseAlarm
        if (dist !== "" && office !== "") {
            selectData = selectData?.filter((item) => item.District === dist && item.Office === office)
        }
        if (dist !== "") {
            selectData = selectData?.filter((item) => item.District === dist)

        }
        if (office !== "") {
            selectData = selectData?.filter((item) => item.Office === office)

        }
        setFilteredData(selectData)
    }, [thanaWiseAlarm, dist, office])



    const totalPowerAlarm = filteredData?.reduce((pre, item) => {
        return pre + item.thanaCount
    }, 0)

    const CustomBar = (props) => {
        const { x, y, width, height, fill } = props;
        return (
            <rect x={x} y={y} width={width} height={height} fill={fill} rx={10} ry={10} />
        );
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='bg-base-300 py-3'>
            <div>
                <div className='card  w-3/4 py-5 px-5 mx-auto shadow-xl bg-base-100 '>
                    <div className="flex flex-col w-full lg:flex-row">
                        <div className="grid flex-grow w-1/2 py-4 card bg-gray-700 rounded-box place-items-center px-2">
                            <form className='' autoComplete='off' onSubmit={handleDelayTime}>
                                <div>
                                    <h2 className="lebel-text text-white font-bold">
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
                                        <div className='text-white'>
                                            <button className=" btn btn-outline btn-warning max-w-xs mt-2"
                                                type="submit"
                                            >View Thana Wise Dashboard</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div className="grid flex-grow w-1/2 py-4 card bg-gray-700 rounded-box place-items-center px-2">
                            <div className='flex flex-row gap-2'>
                                <div className=''>
                                    <label className="label">
                                        <span className="label-text font-serif font-bold text-xl text-white">District :</span>
                                    </label>
                                    <select
                                        value={dist}
                                        onChange={handleDist}
                                        className="input input-bordered w-full  max-w-xs"
                                    >
                                        <option value=""> .......Select District........</option>
                                        {
                                            uniqueDistricts?.map((district, index) =>
                                                <option value={district} key={index + "a"}>{district}</option>)
                                        }


                                    </select>
                                </div>
                                <div className=''>
                                    <label className="label">
                                        <span className="label-text font-serif font-bold text-xl text-white">  Office :</span>
                                    </label>
                                    <select
                                        value={office}
                                        onChange={handleOffice}
                                        className="input input-bordered w-full  max-w-xs"
                                    >
                                        <option value=""> .......Select office........</option>
                                        {
                                            uniqueOffice?.map((office, index) =>
                                                <option value={office} key={index + "o"}>{office}</option>)
                                        }


                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                {/* chart part */}
                <div className='card bg-base-100 shadow-xl mt-2 mx-2 py-2'>
                    <div className='card w-3/4 mt-2 mx-auto py-3 shadow-xl bg-base-200'>
                        <div className='flex'>
                        <Link to="/dashboardPowerShutDown" className='px-5 text-bold text-2xl'>
                        <ChevronDoubleLeftIcon className="h-6 w-6 text-pink-500" />
                        </Link>
                            <div className='text-center w-99% mx-auto'>
                            {dist === "" ?
                                <h2 className='text-center text-xl text-pink-400 font-bold font-serif'>
                                    Thana Wise Power alarm More than
                                    <span className='font-extrabold font-serif text-blue-700 text-2xl'>  {delay}  </span> hrs,
                                    Affected Thana <span className='font-extrabold font-serif text-blue-700 text-2xl'>  {filteredData.length}  </span> &
                                    Power Alarm <span className='font-extrabold font-serif text-blue-700 text-2xl'>{totalPowerAlarm}</span>.
                                </h2>
                                :
                                <h2 className='text-center text-xl text-pink-400 font-bold font-serif'>
                                    Power alarm More than
                                    <span className='font-extrabold font-serif text-blue-700 text-2xl'>  {delay}  </span> Hrs
                                    of &nbsp;
                                    <span className='font-extrabold font-serif text-blue-700 text-2xl'>{dist} &nbsp;</span>
                                    District is &nbsp;<span className='font-extrabold font-serif text-blue-700 text-2xl'>{totalPowerAlarm} </span>
                                    & &nbsp;Affected Thana <span className='font-extrabold font-serif text-blue-700 text-2xl'>&nbsp;{filteredData.length}.  </span>
                                </h2>
                            }
                            </div>
                        </div>
                    </div>


                    <div className='card-body' style={{ width: '100%', height: '500px' }}>
                        <ResponsiveContainer>
                            <BarChart
                                data={filteredData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 10,
                                    bottom: 100,
                                }}
                            >

                                <XAxis dataKey="Thana" angle="-60" textAnchor="end" style={{ fontWeight: 'bold' }} interval={0} />
                                <Label value="X Axis Label" offset={20} position="outsideBottom" />

                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Bar dataKey="thanaCount" stackId="a" label={{
                                    position: 'center',
                                    fill: "red", fontWeight: 'bold', fontSize: "20px"
                                }}
                                    shape={<CustomBar />} fill="url(#colorUv)"

                                    barSize={30} />
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