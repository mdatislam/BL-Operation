import { TrashIcon } from '@heroicons/react/24/solid';
import React from 'react';
import Swal from 'sweetalert2';

const DgServicingInfoRow = ({ dgInfo, index, setIsChecked, isChecked,
  refetch, admin, axiosSecure }) => {

  const {
    _id,
    siteId,
    airFilter,
    batterySerialNo,
    batteryPreSerialNo,
    date,
    remark,
    rhReading,
    updaterName,
    nextPlanDate,
    url,
    preRhReading,
    previousDate,
  } = dgInfo;

  const handleCheck = (e) => {
    const { value, checked } = e.target
    //console.log(value, checked)

    if (checked) {
      setIsChecked([...isChecked, value]);
    } else {
      setIsChecked(isChecked.filter((e) => e !== value));
    }
  }

  const handlePicView = (imgUrl) => {
    console.log(url)
    if (imgUrl) {
      window.open(imgUrl, '_blank');

      //alternative way

      /* const anchor = document.createElement('a');
      anchor.href = imageUrl;
      anchor.download = 'image.jpg'; // Specify the desired file name
      anchor.click(); */
    }
    else {
      Swal.fire({
        title: `Sorry, Picture Not Found !! `,
        width: 400,
        padding: '2em',
        color: '#FFCB24',
        background: '#fff url(/images/trees.png)',
        backdrop: `
            rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `

      });
    }
  }

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
          axiosSecure.delete(`/dgServiceInfo/${id}`)
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
      <td>
        <input type="checkbox" className="checkbox" value={siteId} onChange={(e) => handleCheck(e)} />
      </td>
      <td>{index + 1}</td>
      {admin && <td className='border border-slate-300'>
        <button className='btn btn-link' onClick={() => handleDelete(_id)}>
          <TrashIcon className='w-6 h-6 text-red-400' />
        </button>
      </td>}
      <td>{siteId}</td>
      <td className="text-[#798fcb] font-bold">{date}</td>
      <td className="text-[#3d6ae8] font-bold">{rhReading} </td>
      <td className="text-[#3d6ae8] font-bold">{batterySerialNo}</td>
      <td className="text-[#3d6ae8] font-bold">{airFilter}</td>

      <td>
        <div className="flex items-center space-x-3">
          {/* <div className="avatar">
              <a target="_blank" rel="noreferrer"
                href={url}
                className="mask mask-squircle w-12 h-12 ">
               
                <img src={url} alt="pic of EM Reading" />
              </a>
            </div> */}
          <button className="btn btn-link" onClick={() => handlePicView(url)}>View Pic</button>
        </div>
      </td>
      <td>{updaterName} </td>

      <td className='whitespace-pre-line border border-slate-300 '>{remark}</td>
    </tr>
  );
};

export default DgServicingInfoRow;


