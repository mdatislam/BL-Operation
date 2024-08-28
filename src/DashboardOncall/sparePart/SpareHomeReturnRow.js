import React from 'react';
import { useGetSpareBomListQuery } from '../../app/features/api/sparePart/spareApi';
import Loading from '../../Pages/SharedPage/Loading';

const SpareHomeReturnRow = ({ spareReturn, index }) => {
    const { bomNo, totalSpmsGood,totalSpmsFaulty,totalReturn } = spareReturn

    const { data: spareBomList = [],isLoading } = useGetSpareBomListQuery()
    //console.log(spareBomList);
if(isLoading){
    return <Loading/>
}
    const spareList = spareBomList?.find(item => item.bomNo === bomNo)
    return (

        <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
            <td className='border-2 border-gray-300 '>{index + 1}</td>
            <td>{bomNo}</td>
            <td>{spareList.spareName}</td>
            <td>{totalSpmsGood+totalSpmsFaulty-totalReturn}</td>


        </tr>


    );
};

export default SpareHomeReturnRow;