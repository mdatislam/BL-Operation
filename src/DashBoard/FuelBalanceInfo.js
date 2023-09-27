import { useQuery } from '@tanstack/react-query';
import React from 'react';
//import React, { PureComponent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import { signOut } from 'firebase/auth';
import Loading from '../Pages/SharedPage/Loading';
import FuelBalanceRow from './FuelBalanceRow';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';



const FuelBalanceInfo = () => {
  const navigate= useNavigate()
  const { isLoading,data:balanceInfo  } = useQuery(["balanceInfo"], () =>
  fetch("http://localhost:5000/fuelBalance", {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }).then((res) => {
    if (res.status === 401 || res.status === 403) {
      signOut(auth);
      localStorage.removeItem("accessToken");
      navigate("/Login");
    }
    return res.json();
  })
);
if (isLoading ) {
  return <Loading />;
}

const totalFuel= balanceInfo.reduce((pre,item)=>pre+item.fuelQuantity,0)
    //console.log(balanceInfo)
    return (
      <div>
      <Link
        className="btn btn-sm btn-outline btn-secondary mb-3"
        to="/Dashboard/fuelUpdateOnCall"
      >
        Fuel Update_OnCall
      </Link>
      {/* For Bar chart start */}
      <div className='my-4 w-full  border-4 px-2'>
        
      {/* <ResponsiveContainer width="100%" height="100%"> */}
        <BarChart 
          width={500}
          height={300}
          data={balanceInfo}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
         {/*  <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          {/* <Tooltip /> */}
          <Legend />
          <Bar dataKey="fuelConsume" stackId="a" fill="#FF0000">
          
            </Bar> 
          <Bar dataKey="fuelQuantity" stackId="a" fill="#82ca9d">
          <LabelList dataKey="fuelQuantity" position="top" />
          </Bar>
           
           
        </BarChart>
     {/*  </ResponsiveContainer> */}
      </div>

      {/* Bar Chart End */}
     
     
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
                  (Oncall &nbsp;&nbsp;&nbsp; ||&nbsp;&nbsp;&nbsp; Own)
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
            {balanceInfo?.map((u, index) => (
              <FuelBalanceRow key={u._name} index={index} u={u}></FuelBalanceRow>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-collapse border-2 border-[#F0D786] text-center">
              <th></th>
              <th className=" font-bold text-[#008080]">
                Total Fuel Issued ={" "}
              </th>
              <th className=" text-xl font-bold">
                <span className="text-pink-700">0 </span>
                || <span className="text-blue-600">{totalFuel}</span>
                <span className="stat-desc"> &nbsp;liter</span>
              </th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      
    </div>
    );
};

export default FuelBalanceInfo;