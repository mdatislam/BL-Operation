import { useQuery } from "@tanstack/react-query";
import React from "react";
import { signOut } from "firebase/auth";
import auth from "./../firebase.init";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./../Pages/SharedPage/Loading";
import FcuAllDataRecordRow from "./FcuAllDataRecordRow";
import { CSVLink } from "react-csv";
import { ArrowDownTrayIcon} from '@heroicons/react/24/solid'

const FcuAllDataRecord = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const { data: fcuAllData, isLoading } = useQuery(["fcuAllData"], () =>
    fetch(" http://localhost:5000/fcuFilterChangeAllRecord", {
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
    <div className="px-2">
      <div className=" flex flex-col md:flex-row justify-between px-2 gap-y-2 mb-2 rounded-lg border-2 py-4 mt-2">
        <Link
          to="/FcuMaintenance"
          className="flex btn btn-outline btn-primary btn-sm"
        >
          <ArrowDownTrayIcon  className="h-6 w-6 text-blue-500" />
          
        </Link>

        {/* For Data Export */}

        <div>
          <CSVLink
            data={fcuAllData}
            filename="fcuFilterChangeAllRecord"
            className="flex btn btn-outline btn-primary btn-sm"
          >
            <ArrowDownTrayIcon  className="h-6 w-6 text-blue-500" />
            
          </CSVLink>
        </div>
      </div>
      <h2 className="flex rounded-lg  text-white bg-[#746bd8] mb-4 mt-4 h-12 justify-center items-center text-2xl">
        FCU Filter Changing All Records
      </h2>
      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400 text-center">
              <th>SNo</th>
              <th>Site ID</th>
              <th>Office</th>
              <th>Site Type</th>
              <th>
                <div>Cooling</div>
                <div>System</div>
              </th>
              <th>FCU Brand</th>
              <th>
                <div>Installation</div>
                <div>Date</div>
              </th>
              <th>
                <div>Pre Filter</div>
                <div>Change Date</div>
              </th>
              <th>
                <div>Latest Filter</div>
                <div>Change Date</div>
              </th>
              <th>
                <div>Next Plan</div>
                <div>Date</div>
              </th>
              <th>
                <div>Latest </div>
                <div>Action</div>
              </th>
              <th>
                <div>Setting</div>
                <div>Check?</div>
              </th>
              <th>
                <div>Updated</div>
                <div>By</div>
              </th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {fcuAllData?.map((data, index) => (
              <FcuAllDataRecordRow key={index} data={data} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FcuAllDataRecord;
