import React from "react";

const FuelBalanceRow = ({ u,index }) => {
  const { fuelConsume, name, fuelQuantity } = u;
//console.log(fuelConsume)
    const Balance = (fuelQuantity-fuelConsume).toFixed(2)
  return (
    <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>{name}</td>
      <td>{fuelQuantity} </td>
      <td>{fuelConsume} </td>
      <td className="text-[#3d6ae8] font-bold">{Balance}</td>
    </tr>
  );
};

export default FuelBalanceRow;
