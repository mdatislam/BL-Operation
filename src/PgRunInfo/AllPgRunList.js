import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Pages/SharedPage/Loading";
import AllPgRunRows from "./AllPgRunRows";

const AllPgRunList = () => {
  const { data: pgRunData, isLoading } = useQuery(["list"], () =>
    fetch("https://enigmatic-eyrie-94440.herokuapp.com/pgRunAll", {
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
        <h2 className="text-[#006400] stat-title lg:card-title font-bold col-start-2 col-span-2 lg:col-span-6 justify-self-center self-center">
          All Approved <p>PG-Run List</p>
        </h2>
        <Link to="/Dashboard/PgRunUpdate" className="btn btn-outline">
          GO PG RUN UPDATE
        </Link>
      </div>
      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400 text-center">
              <th>SN</th>

              <th>Date</th>
              <th>Site ID</th>
              <th>PG No</th>
              <th>
                <div>PG Start</div>
                <div>Time</div>
              </th>
              <th>
                <div>PG Stop</div>
                <div>Time</div>
              </th>
              <th>Duration</th>
              <th>Consumption</th>
              <th>
                {" "}
                <div>Approval</div>
                <div>Responsible</div>
              </th>
              <th>PG Runner</th>
            </tr>
          </thead>
          <tbody>
            {pgRunData?.map((pgRun, index) => (
              <AllPgRunRows
                key={pgRun._id}
                pgRun={pgRun}
                index={index}
              ></AllPgRunRows>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPgRunList;
