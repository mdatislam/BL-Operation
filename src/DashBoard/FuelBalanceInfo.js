import { useQuery } from '@tanstack/react-query';
import React from 'react';
//import React, { PureComponent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Pages/SharedPage/Loading';
import FuelBalanceRow from './FuelBalanceRow';

import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ComposedChart,} from 'recharts';
import useAxiosSecure from '../Pages/Hook/useAxiosSecure';



const FuelBalanceInfo = () => {
  const [axiosSecure] = useAxiosSecure()
  
  const { isLoading2, data: receiveFuelOnCall = [] } = useQuery({
    queryKey: ['receiveFuelOnCall'],
    queryFn: async () => {
      const res = await axiosSecure.get("/receiveFuelOncall")
      return res.data
    }
  })
 // console.log(receiveFuelOnCall)
  const totalFuelOnCall = receiveFuelOnCall?.reduce((pre, item) => pre + item.receiveOnCall, 0)
   const { isLoading, data: balanceInfo } = useQuery({
    queryKey: ['balanceInfo'],
    queryFn: async () => {
      const res = await axiosSecure.get("/fuelBalance")
      return res.data
    }
  })

  if (isLoading2 || isLoading) {
    return <Loading />;
  }

  const totalFuel = balanceInfo?.reduce((pre, item) => pre + item.fuelQuantity, 0)
  //console.log(balanceInfo)
  
// Combine the two arrays using the spread operator and map

const combinedArray = balanceInfo?.map((item) => {
  const matchingBalance =  receiveFuelOnCall.find((balanceItem) => balanceItem.name === item.name);
  return {
    ...item,
    receiveOnCall: matchingBalance ? matchingBalance.receiveOnCall : 0, // Set a default value if no match found
  };
});

//console.log(combinedArray);

  return (
    <div>
      {/* <Link
        className="btn btn-sm btn-outline btn-secondary mb-3"
        to="/Dashboard/fuelUpdateOnCall"
      >
        Fuel Update_OnCall
      </Link> */}


      <div className="grid h-12 card bg-[#6495ED] rounded-box place-items-center mb-4">
        <h2 className=" card-title font-bold text-white">
          Fuel Balance Summary
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-compact w-full border-3 border-[#ffcb24]">
          <thead className="border-2 border-[#ffcb24] bg-[#ffcb24] !important">
            <tr className="divide-x divide-blue-400 text-center">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>
                Received Fuel
                <p className="text-pink-400">
                  (Oncall &nbsp;&nbsp;&nbsp; ||&nbsp;&nbsp;&nbsp; Self)
                </p>{" "}
              </th>
              {/*  <th>
                Fuel<p>Receive</p>{" "}
              </th> */}
              <th>
                Fuel <p>Consume</p>
              </th>
              <th> Balance</th>
            </tr>
          </thead>
          <tbody>
            {combinedArray?.map((u, index) => (
              <FuelBalanceRow key={u._id} index={index} u={u}></FuelBalanceRow>
            ))}

            
          </tbody>
          <tfoot>
            <tr className="border-collapse border-2 border-[#F0D786] text-center">
              <th></th>
              <th className=" font-bold text-[#008080]">
                Total Fuel Issued ={" "}
              </th>
              <th className=" text-xl font-bold">
                <span className="text-pink-700">{totalFuelOnCall} </span>
                || <span className="text-blue-600">{totalFuel}</span>
                <span className="stat-desc"> &nbsp;liter</span>
              </th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* vertical bar chart */}
      <div className='border-4 w-full my-12 py-2 '>
        <ComposedChart
          layout="vertical"
          width={650}
          height={550}
          data={balanceInfo}
          margin={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 60
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis padding={{ top: 10, right: 20 }} dataKey="name" type="category" scale="band" />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="fuelConsume" barSize={30} stackId="a" fill="#FF0000">
            {/*  <LabelList dataKey="fuelConsume" position="insideTopRight"  /> */}
          </Bar>
          <Bar dataKey="fuelQuantity" barSize={30} stackId="a" fill="#056608">
            <LabelList dataKey="fuelQuantity" position="insideTopRight" />
          </Bar>


        </ComposedChart>
      </div>

    </div>
  );
};

export default FuelBalanceInfo;