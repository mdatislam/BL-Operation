import React from 'react';
import { useGetSpareBomListQuery } from '../../app/features/api/sparePart/spareApi';
import Loading from '../../Pages/SharedPage/Loading';

const SpareHomeBalanceRow = ({ spareBalanceStock, index }) => {
    const { bomNo, totalSpmsGood, totalSpmsFaulty, ownGoodQuantity, ownFaultyQuantity, totalReturn,
        totalGoodReturn, totalFaultyReturn
    } = spareBalanceStock

    const { data: spareBomList = [], isLoading } = useGetSpareBomListQuery()
    //console.log(spareBomList);
    if (isLoading) {
        return <Loading />
    }
    const spareList = spareBomList?.find(item => item.bomNo === bomNo)

    return (

        <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
            <td className='border-2 border-gray-300 '>{index + 1}</td>
            <td>{bomNo}</td>
            <td>{spareList.spareName}</td>
            <td className='text-green-500 font-bold text-xl'>{(+ownGoodQuantity) + totalSpmsGood - totalGoodReturn}</td>
            <td>{+ownGoodQuantity}</td>
            <td className='text-red-500 font-bold'>{+ownFaultyQuantity}</td>
            <td>{totalSpmsGood - totalGoodReturn}</td>
            <td className='text-red-500 font-bold'>{totalSpmsFaulty - totalFaultyReturn}</td>

        </tr>


    );
};

export default SpareHomeBalanceRow;