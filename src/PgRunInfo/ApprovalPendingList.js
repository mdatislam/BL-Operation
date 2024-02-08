import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Pages/SharedPage/Loading";
import ApprovalPendingRow from "./ApprovalPendingRow";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import auth from "../firebase.init";
import { ArrowDownTrayIcon,ChevronDoubleLeftIcon} from '@heroicons/react/24/solid'

const ApprovalPendingList = () => {
  const navigate = useNavigate();
  const { data: pgRunData, isLoading } = useQuery(["list"], () =>
    fetch("https://myserver.bl-operation.com/PendingAllPgRun", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        //  toast.error("Unauthorize Access")
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
  return (
    <div className="px-2 lg:px-16 mt-12 mb-8">
      <div className="grid grid-cols-4 lg:grid-cols-8 h-12 card bg-[#1b21d9] rounded-lg justify-self-start mb-8 gap-x-16">
        <Link to="/Dashboard/UserList" className="btn btn-secondary">
          
          Back
        </Link>
        <h2 className="stat-title lg:card-title font-bold col-start-2 col-span-2 lg:col-span-6 justify-self-center self-center text-white">
          PG Run Approval <p>Pending List</p>
        </h2>
        <Link to="/Home" className="btn btn-secondary">
        <ChevronDoubleLeftIcon  className="h-6 w-6 text-blue-500" />
          
          &nbsp; Home
        </Link>
      </div>
      {/* For Data Export */}
      <div>
        <CSVLink
          data={pgRunData}
          filename="PendingPgRunApproval"
          className="btn btn-outline btn-info mb-2"
        >
          <ArrowDownTrayIcon  className="h-6 w-6 text-blue-500" />
          
          &nbsp; Download
        </CSVLink>
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
