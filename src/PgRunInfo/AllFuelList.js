import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Pages/SharedPage/Loading";
import AllFuelListRow from "./AllFuelListRow";

const AllFuelList = () => {
  const { data: receiveFuel, isLoading } = useQuery(["fuel"], () =>
    fetch("https://enigmatic-eyrie-94440.herokuapp.com/fuelListAll", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="px-2 lg:px-16 mt-12 mb-8">
      <div className="grid grid-cols-4 lg:grid-cols-8 h-12 card bg-[#DDA0DD] rounded-lg justify-self-start mb-8">
        <Link to="/PgFuel" className="btn btn-outline">
          Go BACK
        </Link>
        <h2 className="text-[#111111] stat-title lg:card-title font-bold col-start-2 col-span-2 lg:col-span-6 justify-self-center self-center">
          All Issued <p>Fuel Record</p>
        </h2>
        <Link to="/Dashboard/FuelUpdate" className="btn btn-outline">
          GO FUEL UPDATE
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="  table table-compact w-full">
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
            {receiveFuel?.map((fuel, index) => (
              <AllFuelListRow
                key={fuel._id}
                fuel={fuel}
                index={index}
              ></AllFuelListRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllFuelList;
