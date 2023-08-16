import React from "react";
import { PencilSquareIcon,XCircleIcon} from '@heroicons/react/24/solid'


const PgStatusRows = ({ pg, index, refetch, setPgEdit,setPgDel,admin }) => {
  
  const { pgNo, date, pgStatus, updaterName, pgDetail } = pg;
  //refetch();
  return (
    <>
      <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
        <th>{index + 1}</th>
        <td className="flex justify-items-center gap-x-2 text-center">
          {/* Edit button */}
          <label
            htmlFor="pgEdit"
            className=" text-red-500"
            onClick={() => setPgEdit(pg)}
          >
            <PencilSquareIcon  className="h-6 w-6 text-green-300" />
            
          </label>
          {/*  Or button */}
          {admin && <span className="font-bold">|</span>}

          {/* cancel button */}

          {admin && (
            <label
              htmlFor="pgDel"
              className=""
              onClick={() => setPgDel(pg)}
            >
              <XCircleIcon  className="h-6 w-6  text-red-500" />
              
            </label>
          )}
        </td>
        <td>{pgNo}</td>
        <td>{date}</td>
        <td className="text-start">{pgStatus}</td>
        <td className=" px-2 text-start break-all ">{pgDetail}</td>
        <td>{updaterName}</td>
      </tr>
    </>
  );
};

export default PgStatusRows;
