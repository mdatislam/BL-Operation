import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../SharedPage/Loading";
import DgRefuelingRow from "./DgRefuelingRow";

const DgRefuelingList = () => {
  const navigate = useNavigate();
  const { data: dgRefueling, isLoading } = useQuery(["DgRefueling"], () =>
    fetch("http://localhost:5000/dgRefuelingInfo", {
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
  // console.log(services)
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-8 px-4 mb-4">
      <div className="grid grid-cols-4 lg:grid-cols-8 h-12 card bg-[#099252] rounded-lg justify-self-start mb-8 gap-x-16">
        <Link to="/AllRefueling" className="btn btn-secondary">
          All Refueling
        </Link>
        <h2 className="stat-title lg:card-title font-bold col-start-2 col-span-2 lg:col-span-6 justify-self-center self-center text-white">
          Only Latest DG <p>Refueling Record</p>
        </h2>
        <Link to="/Dashboard/DgRefuelingUpdate" className="btn btn-secondary">
          GO DG Refueling Update
        </Link>
      </div>

      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400">
              <th>SN</th>
              <th>Site ID</th>

              <th>
                <div>previous</div>
                <div>Refueling Date</div>
              </th>

              <th>
                <div>Previous </div>
                <div>Refueling RH</div>
              </th>
              <th>
                <div>Total Fuel</div>
                <div>last Refueling</div>
              </th>

              <th>
                <div>Latest</div>
                <div>Refueling Date</div>
              </th>

              <th>
                <div>Latest </div>
                <div>DG RH</div>
              </th>
              <th>
                <div>Previous</div>
                <div>Fuel Quantity</div>
              </th>

              <th>
                <div>Refueling</div>
                <div>Quantity</div>
              </th>
              <th>
                <div>Consumption</div>
              </th>
              <th>
                <div>Refueling</div>
                <div>By</div>
              </th>
              <th>
                <div>Refueling</div>
                <div>RH Photo</div>
              </th>

              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {dgRefueling.map((refuel, index) => (
              <DgRefuelingRow key={refuel._id} refuel={refuel} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DgRefuelingList;
