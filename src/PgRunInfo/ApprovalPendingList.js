import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Pages/SharedPage/Loading";
import ApprovalPendingRow from "./ApprovalPendingRow";

const ApprovalPendingList = () => {
  const { data: pgRunData, isLoading } = useQuery(["list"], () =>
    fetch("http://localhost:5000/PendingAllPgRun", {
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
      <div className="grid grid-cols-4 lg:grid-cols-8 h-12 card bg-[#1b21d9] rounded-lg justify-self-start mb-8 gap-x-16">
        <Link to="/Dashboard/UserList" className="btn btn-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
          Back
        </Link>
        <h2 className="stat-title lg:card-title font-bold col-start-2 col-span-2 lg:col-span-6 justify-self-center self-center text-white">
          All PG Run Approval <p>Pending List</p>
        </h2>
        <Link to="/Home" className="btn btn-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
            />
          </svg> &nbsp;
          Home
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
              <ApprovalPendingRow
                key={pgRun._id}
                pgRun={pgRun}
                index={index}
              ></ApprovalPendingRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalPendingList;
