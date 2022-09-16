import React from 'react';

const FuelDataListRow = ({ fuel, index }) => {
    const {date,siteId,pgNo,slipNo,fuelQuantity,fuelIssuer,fuelReceiverName}= fuel
    return (
      <>
        <tr className="hover border border-3">
          <th>{index + 1}</th>

          <td>{date}</td>
          <td>{slipNo}</td>
          <td>{pgNo}</td>
          <td>{siteId}</td>
          <td>{fuelQuantity}</td>
          <td>{fuelReceiverName}</td>
          <td>{fuelIssuer}</td>
        </tr>
      </>
    );
};

export default FuelDataListRow;