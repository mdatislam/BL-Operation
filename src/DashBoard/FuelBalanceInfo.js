import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Pages/SharedPage/Loading';
import FuelBalanceRow from './FuelBalanceRow';
import {
  PieChart, Pie, Cell, Legend, CartesianGrid,
  XAxis, YAxis, Tooltip, Bar, BarChart, Label, LabelList,
  ComposedChart,
  ResponsiveContainer
} from 'recharts';
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
  //console.log(receiveFuelOnCall)
  const totalFuelOnCall = receiveFuelOnCall?.reduce((pre, item) => pre + item.receiveOnCall, 0)
  const { isLoading, data: balanceInfo } = useQuery({
    queryKey: ['balanceInfo'],
    queryFn: async () => {
      const res = await axiosSecure.get("/fuelBalance")
      return res.data
    }
  })

  /*  const balanceData= balanceInfo?.map(item=> {
     return {...item,
     balance:item.fuelQuantity-item.fuelConsume.toFixed(1)}
   })
   console.log(balanceData) */


  if (isLoading2 || isLoading) {
    return <Loading />;
  }

  const totalFuel = balanceInfo?.reduce((pre, item) => pre + item.fuelQuantity, 0)
  //console.log(balanceInfo)

  // Combine the two arrays using the spread operator and map

  const combinedArray = balanceInfo?.map((item) => {
    const matchingBalance = receiveFuelOnCall.find((balanceItem) => balanceItem.name === item.name);
    return {
      ...item,
      receiveOnCall: matchingBalance ? matchingBalance.receiveOnCall : 0, // Set a default value if no match found
    };
  });

  //console.log(combinedArray);
  // balance calculation consider both receive fuel of self & own update
  const combineBalanceInfo = combinedArray?.map((item) => {
    if (item.fuelQuantity > item.receiveOnCall) {
      return {
        ...item,
        balance: (item.fuelQuantity - item.fuelConsume).toFixed(2)
      }
    }
    else {
      return {
        ...item,
        balance: (item.receiveOnCall - item.fuelConsume).toFixed(2)
      }
    }
  })

  //console.log(combineBalanceInfo)
  /* pie chart */


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const angle = -midAngle;
    return (

      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central" transform={`rotate(${angle}, ${x}, ${y})`}>
        {`${payload.name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }

  return (
    <div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-2'>
        {/* Left side start */}
        <div className="overflow-x-auto">
          <table className="table table-compact  border-3 border-[#ffcb24]">
            <caption class=" caption-top py-2 bg-slate-600 rounded-t-lg ">
              <div className=' '>
                <h2 className='text-center text-xl font-bold  text-white'> Fuel Balance Summary</h2>

              </div>
            </caption>
            <thead className="border-2 border-[#ffcb24]">
              <tr className="divide-x divide-blue-400 text-center">

                <th>Name</th>
                <th>
                  Received Fuel
                  <p className="text-pink-400">
                    (Oncall &nbsp; ||&nbsp; Self)
                  </p>{" "}
                </th>

                <th>
                  Fuel <p>Consume</p>
                </th>
                <th> Balance</th>
              </tr>
            </thead>
            <tbody>
              {
                combineBalanceInfo?.sort((a, b) => b.balance.localeCompare(a.balance))
                  .map((u, index) => (
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
        {/* Left side  End  */}

        {/* Right side / Pie Chart start */}
        <div className='border-2 hidden lg:block border-slate-300 rounded-lg w-full'>
          <div>
            <div className='text-2xl font-semibold py-2 bg-slate-500 text-center rounded-t-lg'>
              <h2 className='text-white' >Graphical Presentation </h2>
            </div>

            {/* <PieChart width={600} height={600}>
              <Pie
                data={balanceInfo}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={250}
                fill="#8884d8"
                dataKey="fuelQuantity"
              >
                {balanceInfo?.map((entry, index) => (
                  <Cell key={`cell-${index} `} fill={COLORS[index % COLORS.length]} />

                ))}

              </Pie>
            </PieChart> */}

            {/* Bar chart */}
            <BarChart
              width={600}
              height={550}
              data={combineBalanceInfo}
              margin={{
                top: 50,
                right: 5,
                left: 5,
                bottom: 120,
              }}
            >
              {/* <CartesianGrid strokeDasharray="1 1" /> */}
              <Legend layout='horizontal' verticalAlign='top' align='center' />
              <XAxis dataKey="name" angle="-90" textAnchor="end" style={{ fontWeight: 'bold' }} interval={0} />
              <Label value="X Axis Label" offset={20} position="outsideBottom" />

              <Bar dataKey="fuelQuantity" stackId="a" fill="#8884d8" barSize={30} />
              <Bar dataKey="fuelConsume" stackId="a" fill="red" barSize={30} />
              <Bar dataKey="balance" stackId="a" fill="#82ca9d" barSize={30} />
              {/*  <Tooltip /> */}
              <LabelList dataKey="balance" position="top" />
              <text x="50%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
                style={{ fontWeight: 'bold', fontSize: "20", color: "#8884d8" }} >
                Fuel Balance Info
              </text>
            </BarChart>

            {/* Horizontal bar Chart */}
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            {/* <ComposedChart
              layout="vertical"
              width={500}
              height={750}
              data={combineBalanceInfo}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 60,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" offset={20} scale="band" 
              textAnchor="end" style={{ fontWeight: 'bold' }} interval={0} />
              <Legend layout='horizontal' verticalAlign='bottom' align='center' />

              <Bar dataKey="fuelQuantity" stackId="a" fill="#8884d8" barSize={30} />
              <Bar dataKey="fuelConsume" stackId="a" fill="red" barSize={30} />
              <Bar dataKey="balance" stackId="a" fill="#82ca9d" barSize={30} />
              <LabelList dataKey="balance" position="top" />

            </ComposedChart> */}
            {/* </ResponsiveContainer> */}

          </div>
        </div>

        {/* Right side end */}
      </div>

    </div>

  );
};

export default FuelBalanceInfo;