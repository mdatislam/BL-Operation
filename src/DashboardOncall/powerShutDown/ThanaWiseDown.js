import React from 'react';
import { useGetThanaWiseDownQuery } from '../../app/features/api/powerShutDown/powerShutDownApi';
import Loading from '../../Pages/SharedPage/Loading';
import { Bar, BarChart, Label, ResponsiveContainer, XAxis } from 'recharts';

const ThanaWiseDown = () => {
    const { data: thanaWiseDown = [], isLoading } = useGetThanaWiseDownQuery()
    if (isLoading) {
        return <Loading />
    }
    console.log(thanaWiseDown)
    const totalDown= thanaWiseDown.reduce((pre,item)=>{
        return pre+item.downCount
    },0)

    const CustomBar = (props) => {
        const { x, y, width, height, fill } = props;
        return (
            <rect x={x} y={y} width={width} height={height} fill={fill} rx={10} ry={10} />
        );
    };
    return (
        <div>
            <div className='card bg-base-100 shadow-xl mt-2 mx-2 py-2'>
                <div className='card w-1/2 mt-2 mx-auto py-3 shadow-xl bg-base-200'>
                    <div className='flex justify-center'>
                        <h2 className='text-center text-xl text-pink-400 font-bold font-serif'>
                             &nbsp; Total Down:
                            <span className='font-extrabold font-serif text-blue-700 text-2xl'> {totalDown} &nbsp;</span>
                            & &nbsp;Affected Thana <span className='font-extrabold font-serif text-blue-700 text-2xl'>&nbsp;{thanaWiseDown.length}.  </span>
                        </h2>

                    </div>
                </div>


                <div className='card-body border-2 bg-pink-100 m-4 rounded-md' style={{ width: '98%', height: '500px' }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={thanaWiseDown}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 10,
                                bottom: 120,
                            }}
                        >

                            <XAxis dataKey="thana" angle="-60" textAnchor="end" style={{ fontWeight: 'bold' }} interval={0} />
                            <Label value="X Axis Label" offset={20} position="outsideBottom" />

                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#2884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Bar dataKey="downCount" stackId="a" label={{
                                position: 'center',
                                fill: "red", fontWeight: 'bold', fontSize: "20px"
                            }}
                                shape={<CustomBar />} fill="#00ffbf"

                                barSize={30} />
                            <text x="50%" y={10} fill="blue" textAnchor="middle" dominantBaseline="central"
                                    style={{ fontWeight: 'bold', fontSize: "20px", fill: "#7a4564",  }} >
                                    Thana Wise Site Down
                                </text>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ThanaWiseDown;