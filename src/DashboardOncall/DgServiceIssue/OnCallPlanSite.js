import React, { useState } from 'react';
import useAxiosSecure from '../../Pages/Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { addDays, format } from 'date-fns';
import Loading from '../../Pages/SharedPage/Loading';
import DgServicePlanSitesRow from './DgServicePlanSitesRow';

const OnCallPlanSite = () => {
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
    const formattedTargetDate = format(targetDate, "yyyy-MM-dd")
    //console.log(formattedTargetDate)

    const { isLoading, data: planDgServiceSite = [] } = useQuery({
        queryKey: ["planDgServiceSite", formattedTargetDate],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dgServiceInfo/planSite/${formattedTargetDate}`)
            return res.data
        }
    })
    //console.log(planDgServiceSite)
    if (isLoading) {
        return <Loading />;
    }
  // Function to get the abbreviation of the month
  function getMonthAbbreviation(monthIndex) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[monthIndex];
  }

  function addDaysToDate(dateString, days) {
    let date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date;
  } 
   
  
    return (
        <div className="card w-full px-2 md:w-3/4 md:px-6 mx-auto bg-base-100 shadow-xl mt-4 py-2">
            <div className='py-4 mb-2'>
                <h2 className='text-xl font-semibold py-2 text-purple-500'>
                    ** Till How long day you have seen DG Service Plan?**
                </h2>
                <form onSubmit={handleTillDate}>
                    <div className='flex items-center justify-center'>
                        <div className="form-control w-full max-w-xs">
                            <input type="text" placeholder="Mention only number (Default have 7 days)"
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
                    <caption class=" caption-top py-2 bg-pink-300">
                        <div className='text center font-bold text-violet-700'>
                            <h2 className='text-xl'>DG Servicing Required Sites </h2>
                        </div>
                    </caption>
                    <thead className='bg-blue-500 text-2xl'>
                        <tr className=' text-center text-3xl font-bold border-b-2 border-orange-300 text-green-700'>
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
                            planDgServiceSite?.map((dgService, index) =>
                                <DgServicePlanSitesRow 
                                key={dgService._id}
                                dgService={dgService}
                                index={index}
                                />
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OnCallPlanSite;