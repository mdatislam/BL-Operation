import React from "react";
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/solid'


const PgStatusRows = ({ pg, index, refetch, setPgEdit, setPgDel, admin }) => {

  const { pgNo, date, pgStatus, updaterName, pgDetail } = pg;
  //refetch();
  return (
    <>
      <tr className=" divide-y divide-x-2 divide-gray-300 text-start">

        <td className=" border-b-2 border-gray-300 flex items-center justify-center  gap-x-2 whitespace-pre-line ">
          {/* Edit button */}
          <label
            htmlFor="pgEdit"
            className=" text-red-500"
            onClick={() => setPgEdit(pg)}
          >
            <PencilSquareIcon className="h-6 w-6 text-green-300" />

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
              <XCircleIcon className="h-6 w-6  text-red-500" />

            </label>
          )}
        </td>
        <td>{pgNo}</td>
        <td>{date}</td>
        <td>{pgStatus}</td>
        <td className="whitespace-pre-line">{pgDetail}</td>
        <td>{updaterName}</td>
      </tr>
    </>
  );
};

export default PgStatusRows;
