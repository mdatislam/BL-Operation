import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { Link } from 'react-router-dom';

const RectifierInfoRows = ({ rec, refetch }) => {
  const { brand, capacity, consumeFuel } = rec
  const [axiosSecure] = useAxiosSecure()

  const handleDeleteRectifier = brand => {
    console.log(brand)
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
        axiosSecure.delete(`/rectifier/${brand}`)
          .then(deleteRes => {
            if (deleteRes.data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        refetch()
      }
    })
  }


  return (
    <tr className="border-2 border-[#ffcb24] hover">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>{brand}</td>
      <td>{capacity} </td>
      <td>{consumeFuel}</td>
      <td>
        <div className='flex gap-x-2'>
          <Link to="/RectifierUpdate" className="btn btn-outline btn-sm">
            <PencilSquareIcon className='w-6 h-6 text-green-600' />
          </Link>
          <button className=' btn btn-outline btn-sm '
            onClick={() => handleDeleteRectifier(brand)}
          >
            <TrashIcon className='w-6 h-6 text-red-600' />
          </button>
        </div>
      </td>


    </tr >
  );
};

export default RectifierInfoRows;