import { TrashIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import React from "react";

const FcuMaintenanceListRow = ({ fcuInfo, index, setDel, admin }) => {
  const { _id,
    siteId,
    latestServiceDate,
    fcuBrand,
    //nextPlanDate,
    preServiceDate,
    fcuStatus,
    serviceType,
    updaterName,
    remark,
  } = fcuInfo;

  // next plan date calculation

  // Function to get the abbreviation of the month
  function getMonthAbbreviation(monthIndex) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[monthIndex];
  }

  function addDaysToDate(dateString, days) {
    let date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date;
  } 
   
  
  let resultDate = addDaysToDate(latestServiceDate, 120); //Date format: YYYY-mm-dd

  // Format the result date to your desired format (DD-Mon-YYYY)
  let formattedResultDate = `${resultDate.getDate()}-${getMonthAbbreviation(resultDate.getMonth())}-${resultDate.getFullYear()}`;




  return (
    <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
      <td className="">{index + 1}</td>
      {admin && <td className=" ">
        <label htmlFor="Del" className="btn btn-link" onClick={() => setDel(_id)}>
          <TrashIcon className="h-6 w-6 text-red-500" />
        </label>
      </td>}
      <td>{siteId}</td>
      <td className=" ">{fcuBrand} </td>
      <td className=" ">{serviceType} </td>
      <td className=" ">{fcuStatus} </td>
      <td className=" ">{preServiceDate}</td>
      <td className=" ">{latestServiceDate}</td>
      <td className="text-[#e41fe4f6] font-bold">{formattedResultDate}</td>
      <td className=" ">{updaterName}</td>
      <td className='whitespace-pre-line border border-slate-300 '>{remark}</td>
    </tr>
  );
};

export default FcuMaintenanceListRow;
