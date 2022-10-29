import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../SharedPage/Loading";
import { CSVLink } from "react-csv";
import DgServicingInfoRow from "./DgServicingInfoRow";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";

const DgServicingInfo = () => {
  const navigate = useNavigate();
  const { data: dgServiceInfo, isLoading } = useQuery(["DgInfoList"], () =>
    fetch(" https://enigmatic-eyrie-94440.herokuapp.com/dgServiceInfo", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        toast.error("Unauthorize Access");
        signOut(auth);
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
      <div className="grid grid-cols-4 lg:grid-cols-8 h-12 card bg-[#008282] rounded-lg justify-self-start mb-8 gap-x-16">
        <Link to="/Home" className="btn btn-secondary">
          Go Home
        </Link>
        <h2 className="stat-title lg:card-title font-bold col-start-2 col-span-2 lg:col-span-6 justify-self-center self-center text-white">
          DG Servicing<p>updated Record</p>
        </h2>
        <Link to="/Dashboard/DgServicingUpdate" className="btn btn-secondary">
          GO DG Service UPDATE
        </Link>
      </div>
      {/* For Data Export */}
      <div>
        <CSVLink
          data={dgServiceInfo}
          filename="dgServiceInfo"
          className="btn btn-outline btn-primary mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          &nbsp; Download
        </CSVLink>
      </div>

      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400">
              <th>SN</th>
              <th>Site ID</th>

              <th>
                <div>previous</div>
                <div>DG Service Date</div>
              </th>

              <th>
                <div>Previous </div>
                <div>DG RH</div>
              </th>
              <th>
                <div>Previous</div>
                <div>Battery SN</div>
              </th>

              <th>
                <div>Latest</div>
                <div>Service Date</div>
              </th>

              <th>
                <div>Latest </div>
                <div>DG RH</div>
              </th>
              <th>
                <div>Latest</div>
                <div>Battery SN</div>
              </th>
              <th>
                <div>Air Filter</div>
                <div>Use Status</div>
              </th>
              <th>
                <div>DG RH</div>
                <div>Picture</div>
              </th>
              <th>
                <div>DG Service</div>
                <div>Collector</div>
              </th>

              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {dgServiceInfo.map((dgInfo, index) => (
              <DgServicingInfoRow
                key={dgInfo._id}
                dgInfo={dgInfo}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DgServicingInfo;
