import React, { useState } from 'react';
import useAxiosSecure from '../../Pages/Hook/useAxiosSecure';
import { addDays, format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

const FcuServicePlanSites = () => {

    const [axiosSecure] = useAxiosSecure()
    const [futureDay, setFutureDay] = useState("7")


    const handleTillDate = (event) => {
        event.preventDefault()
        const targetDate = event.target.tillDate.value
        setFutureDay(targetDate)
        //console.log(targetDate)
    }

    //console.log(futureDay)

    
    let date = new Date()
    const targetDate = addDays(date, futureDay)
    const formattedTargetDate = format(targetDate, "dd-MMM-yy")
 console.log(formattedTargetDate)
    
    const { data: planFcuServiceSite=[] } = useQuery({
        queryKey: ["planFcuServiceSite",formattedTargetDate],
        queryFn: async () => {
            const res = await axiosSecure.get(`/fcuFilterChangeLatestRecord/plan/${formattedTargetDate}`)
            return res.data
        }
    })
   // console.log(planFcuServiceSite)

    return (
        <div className="card w-full px-2 md:w-3/4 md:px-6 mx-auto bg-base-100 shadow-xl mt-4 py-2">
            <div className='py-2 mb-2 px-4'>
                <h2 className='text-md md:text-xl font-semibold py-2 text-purple-500'>
                   ** Till How long future day you have seen FCU Service Plan?**
                </h2>
                <form onSubmit={handleTillDate}>
                    <div className='flex items-center justify-center'>
                        <div className="form-control w-full max-w-xs">
                            <input type="text" placeholder="Mention only number (default have 7 days)"
                                className="input input-bordered w-full max-w-xs"
                                name='tillDate'
                            />

                        </div>
                        <div className="form-control w-3/4 md:w-1/4 mx-auto max-w-xs">
                            <input type="submit" value="Submit" className='btn btn-primary ' />

                        </div>
                    </div>
                </form>
                <div className='divider'></div>
            </div>
            <div className="overflow-x-auto  border-y-2 border-x-2 border-orange-300 rounded-lg">
                <table className="table  border-pink-400 w-full ">
                    <caption class=" caption-top py-2 bg-violet-300">
                        <div className='text center font-bold text-violet-700'>
                            <h2 className='text-xl'>FCU Servicing Required Sites </h2>
                        </div>
                    </caption>
                    <thead>
                        <tr className=' text-center text-xl font-bold border-2 border-green-500 divide-x-2 divide-green-700'>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Site Code</th>
                            <th>Last service Date</th>
                            <th>Plan Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            planFcuServiceSite?.map((fcuService, index) =>
                                <tr className='divide-y-2 divide-orange-300 text-center' key={index}>
                                    <th className='border-b-2 border-orange-300 '>{index + 1}</th>
                                    <td>{fcuService.siteId}</td>
                                    <td>{fcuService.latestServiceDate}</td>
                                    <td>{fcuService.nextPlanDate}</td>

                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FcuServicePlanSites;