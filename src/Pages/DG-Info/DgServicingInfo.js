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
    fetch(" http://localhost:5000/dgServiceInfo", {
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

  /*  All DG service record */
  const { data: dgAllServiceInfo, isLoading2 } = useQuery(
    ["DgAllInfoList"],
    () =>
      fetch(" http://localhost:5000/dgAllServiceInfo", {
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

  // console.log(services)
  if (isLoading || isLoading2) {
    return <Loading />;
  }
  return (
    <div className="mt-8 px-4 mb-4">
      <h2 className="flex rounded-lg  text-white bg-[#0f19cb] mb-4 h-12 justify-center items-center">
        DG Servicing updated Record
      </h2>

      <div className="flex flex-col lg:flex-row justify-between border-2  p-4">
        <div className="flex justify-between gap-8">
          <Link
            to="/DgAllServicing"
            className="btn  btn-sm btn-outline btn-info  mb-2"
          >
            Plan site
          </Link>
         

          <Link
            to="/Dashboard/DgServicingUpdate"
            className="btn  btn-sm btn-outline btn-info  mb-2"
          >
            Data UPDATE
          </Link>
        </div>

        <div className="flex flex-row justify-between">
          {/* For All service Data Export */}
          <div>
            <CSVLink
              data={dgAllServiceInfo}
              filename="dgServiceInfo"
              className="btn  btn-sm btn-outline btn-secondary mb-2"
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
              &nbsp; All service
            </CSVLink>
          </div>
          {/* For only last service Data Export */}
          <div className="lg:px-4 ">
            <CSVLink
              data={dgServiceInfo}
              filename="dgServiceInfo"
              className="btn btn-outline btn-sm btn-primary mb-2"
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
              &nbsp; Last service
            </CSVLink>
          </div>
        </div>
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
              <th className="bg-[#61ec4c]">
                <div>Next Plan</div>
                <div>Date(YY_MM_DD)</div>
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
