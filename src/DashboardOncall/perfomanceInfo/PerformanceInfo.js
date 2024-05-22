
import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetUserListQuery } from '../../app/features/api/user/userApi';
import Loading from '../../Pages/SharedPage/Loading';


const colors = ['#0088FE', 'pink', 'red', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink',
    '#0088FE', 'pink', 'red', '#00C49F', '#FFBB28', '#FF8042', 'red',
    '#0088FE', 'pink', 'red', '#00C49F', '#FFBB28', '#FF8042', 'red',
];

const PerformanceInfo = () => {

    const { data = [], isLoading } = useGetUserListQuery()
    const performanceData = data.filter(x => {
        return (x.FCU || x.DgService || x.EmUpdate) > 0
    })
    console.log(performanceData)

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    }

    if (isLoading) {
        return <Loading />;
    }
    return (
        <div>
            {/* <BarChart
                width={800}
                height={300}
                data={performanceData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="DgService" fill="#8484d8" shape={<TriangleBar />} label={{ position: 'top' }} barSize={40}>
                    {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                    ))}
                </Bar>
            </BarChart> */}

            {/* stack BarChart */}


            <BarChart
                width={800}
                height={300}
                data={performanceData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="" stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <Legend />
                <Bar dataKey="FCU" stackId="a" fill="#8884d8" label={{ position: 'center' }} barSize={30} />
                <Bar dataKey="EmUpdate" stackId="a" fill="#82ca9d" label={{ position: 'center' }} barSize={30} />
                <Bar dataKey="DgService" stackId="a" fill="#E151AF" label={{ position: 'center' }} barSize={30} />
            </BarChart>

        </div>
    );
};

export default PerformanceInfo;