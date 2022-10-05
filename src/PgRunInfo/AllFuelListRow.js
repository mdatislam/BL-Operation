import React from 'react';

const AllFuelListRow = ({ fuel, index }) => {
     const {
       date,
       siteId,
       pgNo,
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
        <td>{siteId}</td>
        <td>{fuelQuantity}</td>
        <td>{fuelReceiverName}</td>
        <td>{fuelIssuer}</td>
      </tr>
    );
};

export default AllFuelListRow;