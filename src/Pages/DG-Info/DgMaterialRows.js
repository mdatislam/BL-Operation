import React from 'react';

const DgMaterialRows = ({ dgInfo, index }) => {
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
    </tr>
  );
};

export default DgMaterialRows;