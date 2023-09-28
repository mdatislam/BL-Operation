import React from "react";
//import FuelBalance from './FuelBalance';

const FuelBalanceRow = ({ u, index }) => {
  const { fuelConsume, name, fuelQuantity, receiveOnCall } = u;
  //console.log(fuelConsume)

  return (
    <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
      <th>
        <label>
          {/* <input type="checkbox" className="checkbox" /> */}
          {index + 1}
        </label>
      </th>
      <td className="text-start">{name}</td>
      <td>
        {receiveOnCall} || {fuelQuantity}{" "}
      </td>
      {/*  <td>{fuelQuantity} </td> */}
      <td>{fuelConsume} </td>
      <td className="text-[#3d6ae8] font-bold">
        {receiveOnCall > fuelQuantity
          ? (receiveOnCall - fuelConsume).toFixed(2)
          : (fuelQuantity - fuelConsume).toFixed(2)}
      </td>
    </tr>
  );
};

export default FuelBalanceRow;
