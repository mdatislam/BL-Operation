import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

const SiteDataInfoRows = ({ data, index, admin, setSiteDataEdit }) => {
  const {
    siteId,

    shareId,
    keyStatus,
    connectedSite,
    batteryInfo,
    batteryBackup,
    rectifierInfo,
    mobileNo1,
    mobileNo2,
    date,
    updaterName,
  } = data;

  return (
    <>
      <tr className=" hover text-start divide-y divide-slate-300 divide-x divide-slate-300 ">
        <td className="border border-slate-300">{index + 1}</td>
        <td className="flex items-center text-start whitespace-pre-line ">
          {/* Edit button */}
          <label
            htmlFor="siteEdit"
            className="btn btn-link"
            onClick={() => setSiteDataEdit(data)}
          >
            <PencilSquareIcon className="w-6 h-6 text-green-500" />
          </label>
          {admin && (
            <label
              htmlFor="pgDel"
              className=" btn btn-link "
            //onClick={() => setPgDel(pg)}
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
        <td className='whitespace-pre-line '>{mobileNo2}</td>
        <td className='whitespace-pre-line '>{date}</td>
        <td className='whitespace-pre-line '>{updaterName}</td>

        {/*  <th className='w-12 text-start'>{address}</th> */}
      </tr>
    </>
  );
};

export default SiteDataInfoRows;
