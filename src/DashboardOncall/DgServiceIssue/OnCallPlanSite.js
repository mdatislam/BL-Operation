import React from 'react';
import useAxiosSecure from '../../Pages/Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const OnCallPlanSite = () => {
    const [axiosSecure] = useAxiosSecure()

    let date = new Date()
    date.setDate(date.getDate() - 222)
    let targetDay = date.getDate()
    let targetMonth = date.getMonth() + 1
    let targetYear = date.getFullYear()
    if (targetDay < 10) {
        targetDay = "0" + targetDay
    }
    if (targetMonth < 10) {
        targetMonth = "0" + targetMonth
    }

    const targetDate = targetYear + "-" + targetMonth + "-" + targetDay
    console.log(targetDate)

    const { data: planDgServiceSite, refetch } = useQuery({
        queryKey: ["planDgServiceSite"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dgServiceInfo/planSite/${targetDate}`)
            return res.data
        }
    })
    console.log(planDgServiceSite)

    return (
        <div className=''>
            <div className="overflow-x-auto  border-y-2 border-x-2 border-orange-300 rounded-lg">
                <table className="table  border-pink-400 w-full ">
                <caption class=" caption-top py-4 bg-pink-300">
                        <div className='text center font-bold text-violet-700'>
                            <h2 className='text-xl'>DG Servicing Required Sites </h2>
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
                            planDgServiceSite?.map((dgService,index)=>
                            <tr className='divide-y-2 divide-orange-300 text-center'>
                            <th className='border-b-2 border-orange-300 '>{index+1}</th>
                            <td>{dgService.siteId}</td>
                            <td>{dgService.date}</td>
                            <td>{dgService.nextPlanDate}</td>
                            
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OnCallPlanSite;