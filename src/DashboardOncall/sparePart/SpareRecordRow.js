import React from 'react';
import { PencilSquareIcon, XCircleIcon, EyeIcon} from '@heroicons/react/24/solid';

const SpareRecordRow = ({ spare, index, admin, setSpareEdit, setReplacementView }) => {
    const { _id, bomNo, serialNo, date, spareName, source, goodQuantity, siteId,
        challanNo,ownGoodStock, requisitionDate, requisitionBy, updatedBy, remark } = spare
         //const totalQuantity =  parseInt(goodQuantity)+ parseInt(ownGoodStock)
    return (

        <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
            <td className='border-2 border-gray-300 '>{index + 1}</td>
            <td >
                <div className='flex gap-2'>
                    {goodQuantity>0 ?
                        <label htmlFor="spareEdit" className='btn btn-xs'
                        onClick={() => setSpareEdit(spare)}>
                        <PencilSquareIcon className="h-6 w-6 text-green-300" />
                    </label>
                    :
                    <p className='btn btn-xs text-red-500'>No Stock</p>
                    }

                    {
                        admin && <XCircleIcon className="h-6 w-6 text-red-500" />
                    }
                </div>
            </td>
            <td >{requisitionDate}</td>
            <td >{spareName}</td>
            <td >{bomNo}</td>
            <td >{serialNo}</td>
            <td >{goodQuantity}</td>
            <td >{ownGoodStock}</td>
             <td >
               {parseInt(goodQuantity)+parseInt(ownGoodStock)}
                </td>
            <td >{source}</td>
            <td >{challanNo}</td>
            <td >{siteId}</td>
            <td >{requisitionBy}</td>
            <td className=' flex justify-center'>
                <label htmlFor='replacementView' className='btn btn-xs' onClick={() => setReplacementView(_id)}>
                    <EyeIcon className="h-6 w-6 text-blue-400" />
                </label>
            </td>
            <td >{date}</td>
            <td >{updatedBy}</td>
            <td className=" whitespace-pre-line " >{remark}</td>

        </tr>


    );
};

export default SpareRecordRow;