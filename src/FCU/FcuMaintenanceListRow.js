import React from "react";

const FcuMaintenanceListRow = ({fcuInfo, index}) => {
  const {
   siteId,
    date,
    fcuBrand,
    nextPlanDate,
    previousDate,
      fcuFilterStatus,
      fcuCtrl,
       updaterName,
    remark,
  } = fcuInfo;
  return (
    <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
      <td className="w-12">{index+1}</td>
      <td>{siteId}</td>
      <td className=" ">{fcuBrand} </td>
      <td className=" ">{previousDate}</td>
      <td className=" ">{date}</td>
      <td className="text-[#e41fe4f6] font-bold">{nextPlanDate}</td>
      <td className=" ">{fcuFilterStatus}</td>
      <td className=" ">{fcuCtrl}</td>
      <td className=" ">{updaterName}</td>
      <td>{remark}</td>
    </tr>
  );
};

export default FcuMaintenanceListRow;
