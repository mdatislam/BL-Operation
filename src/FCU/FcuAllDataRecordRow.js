import React from 'react';

const FcuAllDataRecordRow = ({data,index}) => {
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
     fcuStatus,
     serviceType,
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
       <td className=" ">{preServiceDate}</td>
       <td className=" ">{latestServiceDate}</td>
       <td className="text-[#e41fe4f6] font-bold">{nextPlanDate}</td>
       <td className=" ">{serviceType}</td>
       <td className=" ">{fcuStatus}</td>
       <td className=" ">{updaterName}</td>
       <td className='whitespace-pre-line border border-slate-300 '>{remark}</td>
     </tr>
   );
};

export default FcuAllDataRecordRow;