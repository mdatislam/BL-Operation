import { TrashIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react';
import { useDeleteOwnSpareMutation } from '../../app/features/api/sparePart/spareApi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Loading from '../../Pages/SharedPage/Loading';

const OwnSpareRecordRow = ({spareOwnList,index,admin}) => {
    const {_id,date,bomNo,spareName,ownGoodStock,ownFaultyStock,remark,updatedBy}
    =spareOwnList

    const [deleteOwnSpare, { data: delRes, isError, error, isLoading: delLoading }] = useDeleteOwnSpareMutation()

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
                    deleteOwnSpare(id)

                }
            })
        }
    }

    if (delLoading) {
        return <Loading />
    }
    return (
        <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
            <td className='border-2 border-gray-300 '>{index + 1}</td>
            {
                admin && <td>
                    <button className='btn btn-link' 
                    onClick={()=>handleDelete(_id)}
                    >
                        <TrashIcon className='w-6 h-6 text-red-400' />
                    </button>
                </td>
            }
            <td>{date}</td>
            <td>{spareName}</td>
            <td>{bomNo}</td>
            <td>{ownGoodStock}</td>
            <td>{ownFaultyStock}</td>
            <td>{updatedBy}</td>
            <td>{remark}</td>

        </tr>
    );
};

export default OwnSpareRecordRow;