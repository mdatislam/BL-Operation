import React from 'react';

const FcuDataFromExcelRow = ({ data, index }) => {
  const {
    siteId,
    office,
    siteType,
    coolingSystem,
    installationDate,
    latestServiceDate,
    fcuBrand,
    nextPlanDate,
    preServiceDate,
    serviceType,
    fcuStatus,
    updaterName,
    remark,
  } = data;
  return (
    <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
      <td className="w-12">{index + 1}</td>
      <td>{siteId}</td>
      <td>{office}</td>
      <td>{siteType}</td>
      <td>{coolingSystem}</td>
      <td className=" ">{fcuBrand} </td>
      <td>{installationDate}</td>
      <td>{serviceType}</td>
      <td className=" ">{preServiceDate}</td>
      <td className=" ">{latestServiceDate}</td>
      <td className="text-[#e41fe4f6] font-bold">{nextPlanDate}</td>
      <td className=" ">{fcuStatus}</td>
      <td className=" ">{updaterName}</td>
      <td>{remark}</td>
    </tr>
  );
};

export default FcuDataFromExcelRow;