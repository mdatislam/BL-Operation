import React from 'react';
import { XCircleIcon} from '@heroicons/react/24/solid'
const AllFuelListRow = ({ fuel, index, setDelFuel, admin  }) => {
     const {
       date,
       siteId,
       pgNo,
       vehicleNo,
       slipNo,
       fuelQuantity,
       fuelIssuer,
       fuelReceiverName,
     } = fuel;
    return (
      <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
        <th>{index + 1}</th>

        <td>{date}</td>
        <td>{slipNo}</td>
        <td>{pgNo}</td>
        <td>{vehicleNo}</td>
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
              <XCircleIcon  className="h-6 w-6  text-red-500" />
              
            </label>
          </th>
        )}
      </tr>
    );
};

export default AllFuelListRow;