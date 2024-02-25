import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import Swal from "sweetalert2";

const SiteDataInfoRows = ({ siteData, index,refetch, admin, setSiteDataEdit, axiosSecure }) => {
  const {
    siteId,
    shareId,
    keyStatus,
    connectedSite,
    batteryInfo,
    batteryBackup,
    rectifierInfo,
    mobileNo1,
    loadCurrent,
    date,
    updaterName,
  } = siteData;

  const handleDeleteSite = (id) => {
    //console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const siteDel = async (id) => {
          const { data } = await axiosSecure.delete(`/siteData/${id}`)
          console.log(data);
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: `Your site ${id} has been deleted.`,
              icon: "success"
            });
            refetch()
          }
        }
        siteDel(id)

      }
    });

  }

  return (
    <>
      <tr className=" hover text-start divide-y  divide-x divide-slate-300 ">
        <td className="border border-slate-300">{index + 1}</td>
        <td className="flex items-center text-start whitespace-pre-line ">

          {admin && (
            <label
              htmlFor="pgDel"
              className=" btn btn-link "
              onClick={() => handleDeleteSite(siteId)}
            >
              <TrashIcon className="h-6 w-6 text-red-500" />
            </label>
          )}
        </td>
        <td>{siteId}</td>
        <td className='whitespace-pre-line'>{shareId}</td>
        <td className='whitespace-pre-line '>{connectedSite}</td>
        <td className='whitespace-pre-line '>{batteryInfo}</td>
        <td className='whitespace-pre-line '>{batteryBackup}</td>
        <td className='whitespace-pre-line '>{rectifierInfo}</td>
        <td className='whitespace-pre-line '>{keyStatus}</td>
        <td className='whitespace-pre-line '>{mobileNo1}</td>
        <td className='whitespace-pre-line '>{loadCurrent}</td>
        <td className='whitespace-pre-line '>{date}</td>
        <td className='whitespace-pre-line '>{updaterName}</td>

        {/*  <th className='w-12 text-start'>{address}</th> */}
      </tr>
    </>
  );
};

export default SiteDataInfoRows;
