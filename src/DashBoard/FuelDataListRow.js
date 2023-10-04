import React from "react";
import {XCircleIcon} from '@heroicons/react/24/solid'


const FuelDataListRow = ({ fuel, index, setDelFuel,admin }) => {
   
  const {
    date,
    siteId,
    pgNo,
    slipNo,
    fuelQuantity,
    fuelIssuer,
    fuelReceiverName,
    remark
  } = fuel;
  return (
    <>
      <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
        <th>{index + 1}</th>
        <td>{date}</td>
        <td>{slipNo}</td>
        <td>{pgNo}</td>
        <td>{siteId}</td>
        <td>{fuelQuantity}</td>
        <td>{fuelReceiverName}</td>
        <td>{fuelIssuer}</td>
        {admin && (
          <th className="">
            <label
              htmlFor="deleteFuel"
              className="btn btn-link text-red-500"
              onClick={() => setDelFuel(fuel)}
            >
             <XCircleIcon className="h-6 w-6 text-red-500" /> 
             
            </label>
          </th>
        )}
        <th>{remark}</th>
      </tr>
    </>
  );
};

export default FuelDataListRow;
