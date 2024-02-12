import React from 'react';
import { PencilSquareIcon,XCircleIcon} from '@heroicons/react/24/solid'
import Swal from 'sweetalert2';

const ServiceMaterialRow = ({ lubOil, index ,axiosSecure,refetch}) => {
     //console.log(lubOil);
    const { receivingDate, receivingQuantity, requisitionDate, requisitionQuantity, remark } = lubOil

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
            axiosSecure.delete(`/lubOilList/${id}`)
              .then(deleteRes => {
                if (deleteRes.data.deletedCount > 0) {
                  refetch()
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
  
                }
              })
  
          }
        })
      }
    }
   
    return (
      <tr className="border-2 text-center border-[#aeb49e] hover">
        <td>{index + 1}</td>
        <td className="flex justify-items-center gap-x-2 text-center">
          {/* Edit button */}
          <label
            htmlFor="pgEdit"
            className=" text-red-500"
            //onClick={() => setPgEdit(pg)}
          >
            <PencilSquareIcon className=" w-6 h-6 text-blue-500" />
            
          </label>
          {/*  Or button */}
          <span className="font-bold">|</span>

          {/* cancel button */}
          <button className='btn-link' onClick={() => handleDelete(lubOil._id)}>
          <XCircleIcon className='w-6 h-6 text-red-400' />
        </button>
        </td>
        <td>{requisitionDate} </td>
        <td>{requisitionQuantity}</td>
        <td>{receivingDate} </td>
        <td>{receivingQuantity}</td>
        <td>{remark}</td>
      </tr>
    );
};

export default ServiceMaterialRow;