import React from "react";

const FuelBalanceRow = ({ u,index }) => {
    const { fuelConsume, name, fuelQuantity } = u;
    const Balance = (fuelQuantity-fuelConsume).toFixed(2)
  return (
    <tr className="border-2 border-[#F0D786] hover">
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
