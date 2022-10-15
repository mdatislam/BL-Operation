import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Pages/SharedPage/Loading";
import AllFuelListRow from "./AllFuelListRow";

const AllFuelList = () => {
  const navigate = useNavigate()
  const { data: receiveFuel, isLoading } = useQuery(["fuel"], () =>
    fetch("http://localhost:5000/fuelListAll", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        toast.error("Unauthorize access");

        localStorage.removeItem("accessToken");
        navigate("/Login");
      }
      return res.json();
    })
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="px-2 lg:px-16 mt-12 mb-8">
      <div className="grid gap-x-2 grid-cols-4 lg:grid-cols-8 h-12 card bg-[#5a23d9] rounded-lg justify-self-start mb-8">
        <Link to="/PgFuel" className="btn btn-secondary">
          Go BACK
        </Link>
        <h2 className="text-white lg:card-title font-bold col-start-2 col-span-2 lg:col-span-6 justify-self-center self-center">
          All Issued <p>Fuel Record</p>
        </h2>
        <Link to="/Dashboard/FuelUpdate" className="btn btn-secondary">
          GO FUEL UPDATE
        </Link>
      </div>
      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400 text-center">
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
