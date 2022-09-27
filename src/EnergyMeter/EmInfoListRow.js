import React from 'react';

const EmInfoListRow = ({ emInfo, index }) => {
    const {siteId,date,preDate,EmPreSerialNo,EmPreReading,EmSerialNo,EmReading,updaterName}=emInfo
    return (
      <tr className="border-2 border-[#F0D786] hover">
        <td>{index + 1}</td>
        <td>{siteId}</td>
        <td>{preDate} </td>
        <td>{EmPreSerialNo} </td>
        <td>{EmPreReading} </td>
        <td className="text-[#3d6ae8] font-bold">{date}</td>
        <td className="text-[#3d6ae8] font-bold">{EmSerialNo} </td>
        <td className="text-[#3d6ae8] font-bold">{EmReading}</td>
        <td>{updaterName} </td>
        <td></td>
      </tr>
    );
};

export default EmInfoListRow;
