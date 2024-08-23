import React from 'react';

const SpareHomeReturnRow = ({ spareReturn, index }) => {
    const { bomNo, totalSpmsGood,totalSpmsFaulty,totalReturn } = spareReturn
    return (

        <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
            <td className='border-2 border-gray-300 '>{index + 1}</td>
            <td>"YY"</td>
            <td>{bomNo}</td>
            <td>{totalSpmsGood+totalSpmsFaulty-totalReturn}</td>


        </tr>


    );
};

export default SpareHomeReturnRow;