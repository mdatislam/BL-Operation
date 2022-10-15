import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Pages/SharedPage/Loading";
import EmInfoListRow from "./EmInfoListRow";

const EminfoList = () => {
  const navigate = useNavigate();
  const { data: EmInfo, isLoading } = useQuery(["EmInfoList"], () =>
    fetch(" https://enigmatic-eyrie-94440.herokuapp.com/emInfo", {
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
      <div className="grid grid-cols-4 lg:grid-cols-8 h-12 card bg-[#008282] rounded-lg justify-self-start mb-8 gap-x-16">
        <Link to="/Home" className="btn btn-secondary">
          Go Home
        </Link>
        <h2 className="stat-title lg:card-title font-bold col-start-2 col-span-2 lg:col-span-6 justify-self-center self-center text-white">
          All Energy Meter <p>updated Record</p>
        </h2>
        <Link to="/Dashboard/EMDataUpdate" className="btn btn-secondary">
          GO EM Info UPDATE
        </Link>
      </div>

      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full  ">
          <thead className="border-2 border-[#FFCB24] ">
            <tr className="divide-x divide-sky-400">
              <th>SN</th>
              <th>Site ID</th>

              <th>
                <div>previous</div>
                <div>Collected Date</div>
              </th>

              <th>
                <div>Energy Meter </div>
                <div>Serial No</div>
              </th>
              <th>
                <div>Previous</div>
                <div>EM Reading</div>
              </th>

              <th>
                <div>Latest</div>
                <div>Uploaded Date</div>
              </th>

              <th>
                <div>Latest EM </div>
                <div>Serial No</div>
              </th>
              <th>
                <div>Latest</div>
                <div>EM Reading</div>
              </th>
              <th>
                <div>Latest</div>
                <div>Peak Reading</div>
              </th>
              <th>
                <div>Latest</div>
                <div>offPeak Reading</div>
              </th>
              <th>
                <div>DC</div>
                <div>Load Current</div>
              </th>
              <th>
                <div>EM Reading</div>
                <div>Picture</div>
              </th>
              <th>
                <div>Info</div>
                <div>Collector</div>
              </th>

              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {EmInfo.map((emInfo, index) => (
              <EmInfoListRow key={emInfo._id} emInfo={emInfo} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EminfoList;
