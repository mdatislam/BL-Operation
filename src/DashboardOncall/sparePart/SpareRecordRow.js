import React, { useEffect } from 'react';
import { PencilSquareIcon, XCircleIcon, EyeIcon } from '@heroicons/react/24/solid';
import Loading from '../../Pages/SharedPage/Loading';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useDeleteNewSpareMutation } from '../../app/features/api/sparePart/spareApi';

const SpareRecordRow = ({ spare, index, admin, setSpareEdit, setReplacementView, setOwnSpareEdit }) => {
    const { _id, bomNo, serialNo, date, spareName, source, spmsGoodQuantity, siteId,
        challanNo, ownGoodStock, requisitionDate, requisitionBy, updatedBy, remark } = spare
    //const totalQuantity =  parseInt(goodQuantity)+ parseInt(ownGoodStock)
   
    const [deleteNewSpare, { data: delRes, isError, error, isLoading: delLoading }] = useDeleteNewSpareMutation()

        useEffect(() => {
            if (delRes) {
                toast.success("Data Delete successfully")
    
    
            }
            else if (isError) {
                toast.error(error)
            }
        }, [delRes, isError, error])
    
    
        const handleDelete = id => {
            //console.log(id)
            if (id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteNewSpare(id)
    
                    }
                })
            }
        }

        if ( delLoading) {
            return <Loading />
        }
    return (

        <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center text-start">
            <td className='border-2 border-gray-300 '>{index + 1}</td>
            <td >
                <div className='flex gap-2'>
                    {spmsGoodQuantity > 0 &&
                        <label htmlFor="spareEdit" className='btn btn-xs'
                            onClick={() => setSpareEdit(spare)}>
                            <PencilSquareIcon className="h-6 w-6 text-green-300" />
                        </label>
                    }
                    {ownGoodStock > 0 && spmsGoodQuantity === 0 && <label htmlFor="ownSpareEditt" className='btn btn-xs'
                        onClick={() => setOwnSpareEdit(spare)}>
                        <PencilSquareIcon className="h-6 w-6 text-pink-500" />
                    </label>
                    }
                    {
                        ownGoodStock === 0 && spmsGoodQuantity === 0 &&
                        <p className='btn btn-xs text-red-500'>No_Stock</p>
                    }
||
                    {
                        admin &&  <XCircleIcon 
                        onClick={()=>handleDelete(_id)}
                        className="h-6 w-6 text-red-500" />
                    }
                </div>
            </td>
            <td >{spareName}</td>
            <td >{bomNo}</td>
            <td >{spmsGoodQuantity}</td>
            <td >{ownGoodStock}</td>
            <td >{challanNo}</td>
            <td >{serialNo}</td>
            <td >{requisitionBy}</td>
            <td className=' flex justify-center'>
                <label htmlFor='replacementView' className='btn btn-xs' onClick={() => setReplacementView(_id)}>
                    <EyeIcon className="h-6 w-6 text-blue-400" />
                </label>
            </td>
            <td >{requisitionDate}</td>
            <td >{updatedBy}</td>
            <td className=" whitespace-pre-line " >{remark}</td>

        </tr>


    );
};

export default SpareRecordRow;