import React from 'react';
import { useGetShutDownDataQuery } from '../../app/features/api/powerShutDown/powerShutDownApi';
import Loading from '../../Pages/SharedPage/Loading';
import { Bar, BarChart, CartesianGrid, Label, LabelList, Legend, XAxis, YAxis } from 'recharts';

const PowerShutDownDashBoard = () => {

  const { data: powerShutDownData = [], isLoading } = useGetShutDownDataQuery()
  if (isLoading) {
    return <Loading />
  }
  console.log(powerShutDownData)


  /* const totalDown = powerShutDownData?.reduce((pre, item) => {
    if (item.Alarm_Slogan ==="CSL Fault") {
      return pre + 1;
    }
    return pre;
  }, 0);
  
   */
  /*  const TotalDown = powerShutDownData?.siteDownCount?.length
   const DgSite = powerShutDownData?.siteDownCount?.find(dg => dg.Power_Status = "CP+DG")
   const shareSite = powerShutDownData?.siteDownCount?.find(dg => dg.Power_Status = "3 KW (DC)")
 
   const DownData = [
     { Total: TotalDown }, { DcShared: shareSite?.count }, { DgDown: DgSite?.count }
   ]
   console.log(DgSite); */
  return (
    <div className='bg-pink-100'>
      <div className='flex flex-row gap-0'>
        <div>
          <div className='border-2 border-emerald-400 ml-3 my-3'>
            <BarChart
              width={300}
              height={250}
              data={powerShutDownData.siteDownCount}
              margin={{
                top:40,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              
              <XAxis dataKey="Power_Status" style={{ fontWeight: 'bold', fill: "blue" }} />
              <Bar dataKey="count" stackId="a" fill="#00ffbf" label={{ position: 'center', fill: "red", fontWeight: 'bold',fontSize:"20px" }} barSize={50} />
              <text x="50%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
                style={{ fontWeight: 'bold', fontSize: "17px",  fill: "#ff00bf"  }} >
                Down_Info
              </text>
            </BarChart>
          </div>
        </div>
        <div className='border-2 border-emerald-400 my-3 '>
          {/* down priority */}
          <BarChart
            width={250}
            height={250}
            data={powerShutDownData.priorityCount}
            margin={{
              top: 40,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            
            <XAxis dataKey="Priority" style={{ fontWeight: 'bold', fill: "blue" }} />
            <Bar dataKey="count" stackId="a" fill="#ffbf28" label={{ position: 'center', fill: "red", fontWeight: 'bold',fontSize:"20px" }} barSize={40} />
            <text x="50%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
              style={{ fontWeight: 'bold', fontSize: "17px",  fill: "#ff00bf"  }} >
              Down_Priority
            </text>
          </BarChart>
        </div>
        <div className='border-2 border-emerald-400  my-3'>
          {/* Down duration  */}
          <BarChart
            width={350}
            height={250}
            data={powerShutDownData.downDurationCount}
            margin={{
              top:40,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            
            <XAxis dataKey="bucketName" style={{ fontWeight: 'bold', fill: "blue" }} />
            <Bar dataKey="count" stackId="a" fill="#00ffbf" label={{ position: 'center', fill: "red", fontWeight: 'bold',fontSize:"20px" }} barSize={40} />
            <text x="50%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
              style={{ fontWeight: 'bold', fontSize: "17px",  fill: "#ff00bf"  }} >
              Down_Duration(Hr)
            </text>
          </BarChart>
        </div>
        <div className='border-2 border-emerald-400 my-3 '>
          <BarChart
            width={350}
            height={250}
            data={powerShutDownData.powerDurationCount}
            margin={{
              top:40,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            
            <XAxis dataKey="bucketName" style={{ fontWeight: 'bold', fill: "blue" }} />
            <Bar dataKey="count" stackId="a" fill="#ffbf28" label={{ position: 'center', fill: "red", fontWeight: 'bold',fontSize:"20px" }} barSize={40} />
            <text x="50%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
              style={{ fontWeight: 'bold', fontSize: "17px",  fill: "#ff00bf"  }} >
              Power_Duration(Hr)
            </text>
          </BarChart>
        </div>

      </div>
      {/* power alarm Chart */}
      <div className='flex flex-row gap-0 my-2'>
        <div className='border-2 border-emerald-400 ml-3 my-1'>
          <BarChart
            layout='vertical'
            width={450}
            height={270}
            data={powerShutDownData.powerAlarmCount}
            margin={{
              top:40,
              right: 5,
              left: 35,
              bottom: 5,
            }}
          >

            {/* <Legend layout='horizontal' verticalAlign='top' align='center' /> */}
            <XAxis type="number" hide={true} />
            <YAxis dataKey="powerAlarm" textAnchor="end" type="category"

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
            <Bar dataKey="count" stackId="a" fill="#ffbf28" label={{ position: 'center', fill: "red", fontWeight: 'bold',fontSize:"20px" }}

              barSize={35} />

            {/*  <Tooltip /> */}
            <LabelList dataKey="balance" position="top" />
            <text x="50%" y={20} fill="blue" textAnchor="middle" dominantBaseline="central"
              style={{ fontWeight: 'bold', fontSize: "17px",  fill: "#ff00bf" }} >
              Power Alarm
            </text>
          </BarChart>
        </div>
        {/* Power duration chart */}
        <div>

        </div>
      </div>


    </div>
  );
};

export default PowerShutDownDashBoard;