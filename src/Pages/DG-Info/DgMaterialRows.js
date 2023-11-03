import { TrashIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import useAdmin from '../Hook/useAdmin';
import useAxiosSecure from '../Hook/useAxiosSecure';

const DgMaterialRows = ({ dgInfo, index, refetch }) => {
  const [user] = useAuthState(auth)
  const [admin] = useAdmin(user)
  const [axiosSecure] = useAxiosSecure()
  const {
    siteId,
    date,
    material,
    other,
    oldBatterySerialNo,
    newBatterySerialNo,

    remark,
    rhReading,
    updaterName,
  } = dgInfo;

  /*  To delete the issue */
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
          axiosSecure.delete(`/dgMaterial/${id}`)
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
    <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
      <td>{index + 1}</td>
      <td className='whitespace-pre-line'>{siteId}</td>
      <td >{date}</td>
      <td className='whitespace-pre-line'>{material} {other}</td>
      <td className='whitespace-pre-line'>{rhReading} </td>
      <td className='whitespace-pre-line'>{oldBatterySerialNo}</td>
      <td className='whitespace-pre-line'>{newBatterySerialNo} </td>
      <td className='whitespace-pre-line'>{updaterName} </td>

      <td className='whitespace-pre-line'>{remark}</td>
      {admin && <td className='border border-slate-300'>
        <button className='btn btn-link' onClick={() => handleDelete(dgInfo._id)}>
          <TrashIcon className='w-6 h-6 text-red-400' />
        </button>
      </td>}
    </tr>
  );
};

export default DgMaterialRows;