import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../SharedPage/Loading";
import DgMaterialRows from "./DgMaterialRows";
import { CSVLink } from "react-csv";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { ArrowDownTrayIcon} from '@heroicons/react/24/solid'

const DgUseMaterialList = () => {
  const navigate = useNavigate();
  const { data: dgMaterialInfo, isLoading } = useQuery(["DgInfoList"], () =>
    fetch(" https://backend.bloperation.com/dgMaterialInfo", {
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
          Used Material Record
        </h2>
        <Link to="/Dashboard/DgUseMaterial" className="btn btn-secondary">
          GO Use Material UPDATE
        </Link>
      </div>
      {/* For Data export  */}
      <div>
        <CSVLink
          data={dgMaterialInfo}
          filename="dgMaterialInfo"
          className="btn btn-outline btn-info mb-2"
        >
          <ArrowDownTrayIcon  className="h-6 w-6 text-blue-500" />
          
          &nbsp; Download
        </CSVLink>
      </div>
      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <thead className="border-2 border-[#FFCB24] text-center">
            <tr className="divide-x divide-blue-400">
              <th>SN</th>
              <th>Site ID</th>
              <th> Date</th>

              <th>
                <div>Used</div>
                <div>Material</div>
              </th>
              <th> DG RH</th>
              <th>
                <div>Old</div>
                <div>Battery SN</div>
              </th>
              <th>
                <div>New</div>
                <div>Battery SN</div>
              </th>

              <th>
                <div>Material</div>
                <div>Replaced By</div>
              </th>

              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {dgMaterialInfo?.map((dgInfo, index) => (
              <DgMaterialRows key={dgInfo._id} dgInfo={dgInfo} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DgUseMaterialList;
