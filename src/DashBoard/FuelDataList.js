import { useQuery } from "@tanstack/react-query";

import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "../Pages/SharedPage/Loading";

import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import FuelDataListRow from "./FuelDataListRow";
import FuelBalance from "./FuelBalance";
import PgRunList from "./PgRunList";
import { useState } from "react";

const FuelDataList = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const { data: fuelData, isLoading } = useQuery(["list", user], () =>
    fetch(` http://localhost:5000/fuelList?email=${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/Login");
      }
      return res.json();
    })
  );

  if (isLoading) {
    return <Loading />;
  }

  const totalFuel = fuelData?.map((fuelValue, index) => {
    const x = parseFloat(fuelValue.fuelQuantity);
    return x;
  });
  const receivedFuel = totalFuel?.reduce(
    (previous, current) => previous + parseFloat(current),
    0
  );

  //setFuel(receivedFuel)
  //console.log(fuel)
  return (
    <div>
      <div className="text-center text-primary text-2xl mt-4 mb-8">
        <h2 className="text-secondary-focus">
          Total Received Fuel: {receivedFuel} Liter
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="  table-auto table-compact w-full">
          <thead className="  border-4  text-[#FFcb24]">
            <tr className=" border-4 bg-[#555555]">
              <th>SN</th>

              <th>Date</th>
              <th>Slip No</th>
              <th>PG No</th>
              <th>Site ID</th>
              <th>
                <div>Fuel</div>
                <div>Quantity</div>
              </th>
              <th>
                <div>Fuel</div>
                <div>Receiver</div>
              </th>
              <th>
                <div>Fuel</div>
                <div>Issuer</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {fuelData.map((fuel, index) => (
              <FuelDataListRow
                key={fuel._id}
                fuel={fuel}
                index={index}
                F={receivedFuel}
              ></FuelDataListRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FuelDataList;
