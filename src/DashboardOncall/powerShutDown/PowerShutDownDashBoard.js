import React from 'react';
import { useGetShutDownDataQuery } from '../../app/features/api/powerShutDown/powerShutDownApi';
import Loading from '../../Pages/SharedPage/Loading';
import {
  Bar, BarChart, Cell, ComposedChart, Label, LabelList, Legend, Pie, PieChart,
  XAxis, YAxis
} from 'recharts';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { PaperAirplaneIcon, RocketLaunchIcon } from '@heroicons/react/24/solid'

const PowerShutDownDashBoard = () => {
  const navigate = useNavigate()
  const { data: powerShutDownData = [], isLoading } = useGetShutDownDataQuery()
  if (isLoading) {
    return <Loading />
  }
  console.log(powerShutDownData)
  /* console.log(powerShutDownData.pgUtilization[0]?.blActivePg,
   powerShutDownData.pgUtilization[0]?.supActivePg,
  
 )  */

  const TotalDown = powerShutDownData?.siteDownCount?.reduce((pre, item) => {
    return pre = pre + item.count
  }, 0)

  const DcShared = powerShutDownData?.siteDownCount?.reduce((pre, item) => {
    if (item.Power_Status === "3 KW (DC)") {
      return pre = item.count
    }
    return pre
  }, 0)


  const DgSite = powerShutDownData?.siteDownCount?.reduce((pre, item) => {
    if (item.Power_Status === "CP+DG") {
      return pre = item.count
    }
    return pre
  }, 0)

  const downData = [
    { down: "Total", count: TotalDown },
    { down: "DC_Shared", count: DcShared },
    { down: "DG_Site", count: DgSite }
  ]


  const TotalPowerAlarm = powerShutDownData?.powerAlarmCount?.reduce((pre, item) => {
    if (item.powerAlarm === "MAINS FAIL" || item.powerAlarm === "MAINS FAIL DELAY CKT ON") {
      return pre = pre + item.count
    }
    return pre
  }, 0)
  const lowVoltage = powerShutDownData?.powerAlarmCount?.reduce((pre, item) => {
    if (item.powerAlarm === "LOW VOLTAGE") {
      return pre = item.count
    }
    return pre
  }, 0)

  const genset = powerShutDownData?.powerAlarmCount?.reduce((pre, item) => {
    if (item.powerAlarm === "Genset On") {
      return pre = item.count
    }
    return pre
  }, 0)

  const alarmData = [
    { alarm: "Power Alarm", count: TotalPowerAlarm },
    { alarm: "Low Voltage", count: lowVoltage },
    { alarm: "DG Run", count: genset }
  ]
  /*  today find code */

  const formattToday = format(new Date(), "dd-MMM-yyyy");

  // Format the time as a string
  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;
  /* PG utilization part */
  const blPg = [
    {
      pgType: "BL_PG",
      active: powerShutDownData.pgUtilization?.blActivePg || 0,
      run: powerShutDownData.pgUtilization?.blPgRun || 0,
      move: powerShutDownData.pgUtilization?.blPgMove || 0,
    },
    {
      pgType: "Sup_PG",
      active: powerShutDownData.pgUtilization?.supActivePg || 0,
      run: powerShutDownData.pgUtilization?.supPgRun || 0,
      move: powerShutDownData?.pgUtilization?.supPgMove || 0,
    }
  ]
  const pgRunPercentage = (((parseInt(powerShutDownData.pgUtilization?.blPgRun) + parseInt(powerShutDownData.pgUtilization?.supPgRun)) /
    (parseInt(powerShutDownData.pgUtilization?.blActivePg)
    )) * 100)
  const remainPgRun = (100 - pgRunPercentage)
  const progressData = [
    { name: '% Run', value: pgRunPercentage },
    { name: 'Pending', value: remainPgRun },
  ];

  const COLORS = ['#00C49F', '#D8D8D8']; // Colors for the pie segments
  const officeList = ["Bogura", "Thakurgaon", "Rajshahi", "Pabna"]

  //console.log(pgRunPercentage,remainPgRun);
  return (
    <div className='bg-slate-300 py-2 '>
      <div className='mx-5'>
        {/*  power shutdown title */}
        <div className='card my-2 bg-base-100 shadow-xl  '>
          <div className='ml-16 px-4 mt-2'>
            <div className='flex  gap-x-5 justify-start'>
              <div className='flex items-center space-x-2'>
                <button className="relative group "
                  onClick={() => navigate("/thanaWisePowerAlarm")}>
                  <RocketLaunchIcon className="h-6 w-6 text-pink-500" />
                  <div className="absolute bottom-0 left-1/2 
                transform -translate-x-1/2 translate-y-full
                 bg-base-300 text-blue-700 text-sm px-2 py-1 rounded hidden 
                 group-hover:block">
                    Thana_Wise_Power_Alarm
                  </div>
                </button>
              </div>
              <div className='flex items-center space-x-2'>
                <button className="relative group "
                  onClick={() => navigate("/thanaWiseDown")}>
                  <PaperAirplaneIcon className="h-6 w-6 text-blue-500" />
                  <div className="absolute bottom-0 left-1/2 
                transform -translate-x-1/2 translate-y-full
                 bg-base-300 text-pink-700 text-sm px-2 py-1 rounded hidden 
                 group-hover:block">
                    Thana_Wise_Down
                  </div>
                </button>
              </div>
            </div>
            <h1 className='flex flex-row mt-[-20px] justify-center item-center text-xl font-bold
             text-pink-900'>
              <span className='mt-1'>"Resource & Power Shutdown Update,</span>
              <select
                className="input text-xl mt-[-5px] text-start block appearance-none"
              >
                <option value="">Rangpur</option>
                {
                  officeList.map((office, index) =>
                    <option value={office} key={index + "aa"}>{office}</option>)
                }
              </select>
            </h1>

          </div>

          <div className='flex flex-row gap-2 '>
            <label className="input text-md font-bold w-1/4 flex items-center gap-2">
              Affected Start :
              <input type="text" className="grow" placeholder=" shutdown start time" />
            </label>
            <label className="input w-1/4 text-md font-bold flex items-center gap-2">
              Date :
              <input type="text" className="grow  " defaultValue={formattToday} placeholder=" shutdown Date" />
            </label>
            <label className="input  w-1/4 text- font-bold flex items-center gap-2">
              Time:
              <input type="text" className="grow px-5 text-md font-bold" defaultValue={currentTime} placeholder=" shutdown Time" />
            </label>
            <label className="input text-md font-bold text-md   w-1/4 flex items-center gap-2">
              Restore:
              <input type="text" className="grow" placeholder=" Tentative Restore Time" />
            </label>

          </div>
          {/*  <label className="input text-md font-bold mt-1  text-lg flex items-center">
          Cause :
          <input type="text" className="grow text-center text-sm" placeholder="Write down shut down cause" />
        </label> */}
          {/* Chart part */}
        </div>
        <div className='flex flex-row gap-0 card mb-2  bg-base-100 shadow-xl mx-2'>
          <div>
            <div className='border-r-2 border-emerald-400 ml-3 my-1'>
              <BarChart
                width={300}
                height={235}
                data={downData}
                margin={{
                  top: 40,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >

                <XAxis dataKey="down" style={{ fontWeight: 'bold', fill: "blue" }} />
                <Bar dataKey="count" stackId="a" fill="#00ffbf" label={{
                  position: 'center',
                  fill: "red", fontWeight: 'bold', fontSize: "20px"
                }} barSize={50} />
                <text x="50%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
                  style={{ fontWeight: 'bold', fontSize: "17px", fill: "#ff00bf" }} >
                  Down_Info
                </text>
              </BarChart>
            </div>
          </div>
          <div className='border-r-2 border-emerald-400 my-1 '>
            {/* down priority */}
            <BarChart
              width={300}
              height={235}
              data={powerShutDownData.priorityCount}
              margin={{
                top: 40,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >

              <XAxis dataKey="Priority" style={{ fontWeight: 'bold', fill: "blue" }} />
              <Bar dataKey="count" stackId="a" fill="#ffbf28" label={{
                position: 'center',
                fill: "red", fontWeight: 'bold', fontSize: "20px"
              }} barSize={50} />
              <text x="50%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
                style={{ fontWeight: 'bold', fontSize: "17px", fill: "#ff00bf" }} >
                Down_Priority
              </text>
            </BarChart>
          </div>
          <div className='border-r-2 border-emerald-400  my-1'>
            {/* Down duration  */}
            <BarChart
              width={430}
              height={235}
              data={powerShutDownData.downDurationCount}
              margin={{
                top: 40,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >

              <XAxis dataKey="bucketName" style={{ fontWeight: 'bold', fill: "blue" }} />
              <Bar dataKey="count" stackId="a" fill="#00ffbf" label={{
                position: 'center',
                fill: "red", fontWeight: 'bold', fontSize: "20px"
              }} barSize={50} />
              <text x="50%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
                style={{ fontWeight: 'bold', fontSize: "17px", fill: "#ff00bf" }} >
                Down_Duration(Hr)
              </text>
            </BarChart>
          </div>
          <div className='my-1 '>
            <BarChart
              width={430}
              height={235}
              data={powerShutDownData.powerDurationCount}
              margin={{
                top: 40,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >

              <XAxis dataKey="bucketName" style={{ fontWeight: 'bold', fill: "blue" }} />
              <Bar dataKey="count" stackId="a" fill="#ffbf28" label={{
                position: 'center',
                fill: "red", fontWeight: 'bold', fontSize: "20px"
              }} barSize={50} />
              <text x="50%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
                style={{ fontWeight: 'bold', fontSize: "17px", fill: "#ff00bf" }} >
                Power_Duration(Hr)
              </text>
            </BarChart>
          </div>

        </div>
        {/* power alarm Chart */}
        <div className='flex flex-row gap-x-2 my-2'>
          <div className='card 3/4 bg-base-100 shadow-xl"  ml-3 my-1'>
            <BarChart
              layout='vertical'
              width={450}
              height={200}
              data={alarmData}
              margin={{
                top: 40,
                right: 10,
                left: 35,
                bottom: 5,
              }}
            >

              {/* <Legend layout='horizontal' verticalAlign='top' align='center' /> */}
              <XAxis type="number" hide={true} />
              <YAxis dataKey="alarm" textAnchor="end" type="category"

                label={{
                  value: '',
                  angle: 0,
                  position: 'insideLeft',
                  textAnchor: 'middle',
                  offset: 0,
                }}
                style={{ fontWeight: 'bold', fill: "blue" }}
                tick={{ fill: 'blue' }}
              />
              <Bar dataKey="count" stackId="a" fill="#ffbf28" label={{
                position: 'center',
                fill: "red", fontWeight: 'bold', fontSize: "20px"
              }}

                barSize={45} />

              {/*  <Tooltip /> */}
              <LabelList dataKey="balance" position="top" />
              <text x="50%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
                style={{ fontWeight: 'bold', fontSize: "17px", fill: "#ff00bf" }} >
                Power Alarm
              </text>
            </BarChart>
          </div>
          {/* PG utilization chart */}
          <div className="card mb-2 mx-auto bg-base-100 shadow-xl my-1 pr-5">
            <div className="flex flex-row gap-2  my-1">
              <div className="">
                <ComposedChart
                  width={430}
                  height={200}
                  data={blPg}
                  margin={{
                    top: 40,
                    right: 20,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <Legend layout='vertical' verticalAlign="middle" align='left' />

                  <XAxis dataKey="pgType" style={{ fontWeight: 'bold', fill: "blue" }} />
                  <Bar type="monotone" dataKey="active"
                    fill="#7ca6d2" label={{
                      position: 'center', fill: "red",
                      fontWeight: 'bold', fontSize: "20px"
                    }} barSize={40} />
                  <Bar type="monotone" dataKey="run" fill="#C2F23D
                " label={{
                      position: 'center', fill: "red", fontWeight: 'bold',
                      fontSize: "20px"
                    }} barSize={40} />
                  <Bar dataKey="move" stackId="a" fill="#FF9999
                " label={{ position: 'center', fill: "red", fontWeight: 'bold', fontSize: "20px" }} barSize={40} />
                  <text x="50%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
                    style={{ fontWeight: 'bold', fontSize: "17px", fill: "#ff00bf" }} >
                    Resource Update
                  </text>
                </ComposedChart>
              </div>
              <PieChart width={200} height={170}
                margin={{ top: 50, right: 5 }}
              >
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  fill="#88ff4d8"
                  dataKey="value"
                  labelLine={false}
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  <Label
                    value={`${pgRunPercentage.toFixed(2)}%`}
                    position="center"
                    fill="red"
                    style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      textAnchor: 'middle',
                      dominantBaseline: 'central',
                      fontFamily: "inherit"
                    }}
                  />
                </Pie>
                {/* <Legend   verticalAlign="top" align='top' height={30} /> */}
                <text x="40%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
                  style={{ fontWeight: 'bold', fontSize: "17px", fill: "#ff00bf" }} >
                  % Of PG Utilization
                </text>
              </PieChart>
              <div>
              </div>
            </div>
          </div>
          <div className='w-96 card bg-base-100 shadow-xl my-1 mr-2'>
            <h2 className='text-pink-400 underline text-center text-xl font-bold'> Remarks</h2>
            <p className='text-left font-semibold px-2 text-lg text-red-700'>
              {powerShutDownData.pgUtilization?.remarks}
            </p>

          </div>
        </div>
      </div>

    </div >
  );
};

export default PowerShutDownDashBoard;