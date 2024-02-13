import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../Hook/useAxiosSecure';
import Loading from '../SharedPage/Loading';

const LubOilBalance = () => {
    const [axiosSecure] = useAxiosSecure()
    const { isLoading, data: receiveLubOil = [], refetch } = useQuery({
        queryKey: ["receiveLubOil"],
        queryFn: async () => {
          const res = await axiosSecure.get("/lubOil")
          return res.data
        }
      })
    
      const { isLoading2, data: doneDgServicing } = useQuery({
        queryKey: ["doneDgServicing"],
        queryFn: async () => {
          const res = await axiosSecure.get("/countAllDgServiceInfo")
          return res.data.countOfDgService
        }
      })
    
      //Lub-Oil Balance Calculation part
    
      const LubOil = receiveLubOil?.map((quantity) => quantity.receivingQuantity);
    
      const totalLubOil = LubOil?.reduce(
        (previous, current) => previous + parseFloat(current),
        0
      );
      // console.log(LubOil);
      // console.log(doneDgServicing)
      // const totalServicing = doneDgServicing?.length;
      // console.log(totalServicing);
      const totalConsumeLubOil = parseInt(doneDgServicing * 10);
      const Balance = (totalLubOil - totalConsumeLubOil) / 5;

      if (isLoading || isLoading2) {
        return <Loading />;
      }

    return (
        <div>
            
            <div className="text-center">
            <div className=" mt-3 bg-slate-500 text-primary-content stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Total Lub-Oil</div>
                <div className="stat-value">{totalLubOil}</div>
                <div className="stat-desc">Liter</div>
              </div>

              <div className="stat">
                <div className="stat-title">Total Service</div>
                <div className="stat-value">{doneDgServicing}</div>
                <div className="stat-desc">sites</div>
              </div>

              <div className="stat">
                <div className="stat-title">Balance</div>
                <div className="stat-value">{Balance}</div>
                <div className="stat-desc">Can</div>
              </div>
            </div>
          </div>
            
        </div>
    );
};

export default LubOilBalance;