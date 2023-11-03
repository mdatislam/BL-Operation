import { TrashIcon } from '@heroicons/react/24/solid';
import React from 'react';
import Swal from 'sweetalert2';

const DgRefuelingRow = ({ refuel, index, refetch, axiosSecure, admin }) => {

  const {
    siteId,
    date,
    previousQuantity,
    reFuelQuantity,
    remark,
    rhReading,
    updaterName,
    preRhReading,
    previousDate,
    preTotalFuel,
    consumption,
    url
  } = refuel;

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

   /*  To delete the data */
  const handleDelete=id=>{
    //console.log(id)
    if(id){
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
                axiosSecure.delete(`/dgRefuel/${id}`)
                .then(deleteRes=>{
                    if(deleteRes.data.deletedCount >0){
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
      <td>{siteId}</td>
      <td className="text-[#85c5ea] font-bold">{date}</td>
      <td className="text-[#85c5ea] font-bold">{rhReading} </td>
      <td className="text-[#85c5ea] font-bold">{previousQuantity}</td>
      <td className="text-[#85c5ea] font-bold">{reFuelQuantity}</td>
      <td>{previousDate} </td>
      <td>{preRhReading} </td>
      <td>{preTotalFuel} </td>

      <td className="text-[#ea85e8] font-bold">{consumption}</td>
      <td>{updaterName} </td>
      <td>
        <div className="flex items-center space-x-3">

          <button className="btn btn-link" onClick={() => handlePicView(url)}>View Pic</button>
        </div>
      </td>

      <td className='whitespace-pre-line border border-slate-300'>{remark}</td>
      {admin && <td className='border border-slate-300'>
        <button className='btn btn-link' onClick={() => handleDelete(refuel._id)}>
          <TrashIcon className='w-6 h-6 text-red-400' />
        </button>
      </td>}
    </tr>
  );
};

export default DgRefuelingRow;