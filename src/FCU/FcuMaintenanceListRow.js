import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

const FcuMaintenanceListRow = ({ fcuInfo, index, setDel, admin }) => {
  const { _id,
    siteId,
    latestServiceDate,
    fcuBrand,
    nextPlanDate,
    preServiceDate,
    fcuStatus,
    serviceType,
    updaterName,
    remark,
  } = fcuInfo;
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
      <td className="text-[#e41fe4f6] font-bold">{nextPlanDate}</td>
      <td className=" ">{updaterName}</td>
      <td className='whitespace-pre-line border border-slate-300 '>{remark}</td>
    </tr>
  );
};

export default FcuMaintenanceListRow;
