import React from 'react';

const SpareHomeBalanceRow = ({ spareBalanceStock, index }) => {
    const { BOM_No, newGoodQuantity, newFaultyQuantity, ownGoodQuantity, ownFaultyQuantity } = spareBalanceStock
    return (

        <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
            <td className='border-2 border-gray-300 '>{index + 1}</td>
            <td>"XX"</td>
            <td>{BOM_No}</td>
            <td className='text-green-500 font-bold'>{parseInt(newGoodQuantity) + (+ownGoodQuantity)}</td>
            <td>{ownGoodQuantity}</td>
            <td className='text-red-500 font-bold'>{ownFaultyQuantity}</td>
            <td>{newGoodQuantity}</td>
            <td className='text-red-500 font-bold'>{newFaultyQuantity}</td>

        </tr>


    );
};

export default SpareHomeBalanceRow;