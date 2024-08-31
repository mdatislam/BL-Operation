import { TrashIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Loading from '../../Pages/SharedPage/Loading';
import { useDeleteSingleReturnSpareMutation } from '../../app/features/api/sparePart/spareApi';

const ReturnSpareRecordRows = ({ index, spareReturnList, admin }) => {
    const { _id, date, spareName, bomNo, spareStatus, returnQuantity, updatedBy, remark }
        = spareReturnList
    const [deleteReturnSpare, { data: delRes, isError, error, isLoading: delLoading }] = useDeleteSingleReturnSpareMutation()

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
                    deleteReturnSpare(id)

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
                admin && <td className=" ">
                    <button className='btn btn-link' onClick={() => handleDelete(_id)}>
                        <TrashIcon className='w-6 h-6 text-red-400' />
                    </button>
                </td>
            }
            <td>{date}</td>
            <td>{spareName}</td>
            <td>{bomNo}</td>
            <td>{spareStatus}</td>
            <td>{returnQuantity}</td>
            <td>{updatedBy}</td>
            <td>{remark}</td>

        </tr>
    );
};

export default ReturnSpareRecordRows;