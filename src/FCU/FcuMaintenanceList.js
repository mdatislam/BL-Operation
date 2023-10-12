import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { signOut } from "firebase/auth";
import auth from "./../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import useAdmin from "./../Pages/Hook/useAdmin";
import Loading from "./../Pages/SharedPage/Loading";
import FcuMaintenanceListRow from "./FcuMaintenanceListRow";
import { ArrowDownTrayIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'

const FcuMaintenanceList = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const navigate = useNavigate();
  const { data: fcuFilter, isLoading } = useQuery(
    ["fcuFilterChangeRecord"],
    () =>
      fetch(" http://localhost:5000/fcuFilterChangeLatestRecord", {
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
  //console.log(fcuFilter);
  // console.log(dgServiceInfo);
  return (
    <div className="bg-teal-300 h-100 px-2">
      <div className="lg:w-3/4 mx-auto ">
        <div className=" flex flex-col md:flex-row justify-between px-2 gap-y-2 mb-2 rounded-lg border-2 py-4">
          <Link to="/Home" className="flex btn btn-outline btn-primary btn-sm">
            <ChevronDoubleLeftIcon className="h-6 w-6 text-blue-500" />

          </Link>

          <Link
            to="/Dashboard/FcuServiceUpdate"
            className="flex btn btn-outline btn-primary btn-sm"
          >
            Data UPDATE
          </Link>

          {/* FCU filter calcultion */}

          <Link
            to="/fcuMaterial"
            className="flex btn btn-outline btn-primary btn-sm"
          >
            FCU Material
          </Link>

          {/* For Data upload button */}
          {admin && (
            <Link
              to="/FcuDataUpload"
              className="flex btn btn-outline btn-primary btn-sm"
            >
              Data Import
            </Link>
          )}

          {/* For Data Export */}
          {admin && (
            <div>
              <CSVLink
                data={fcuFilter}
                filename="fcuFilerChangeRecord"
                className="flex btn btn-outline btn-primary btn-sm"
              >
                <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />

              </CSVLink>
            </div>
          )}
        </div>

        <h2 className="flex rounded-lg  text-white bg-[#d16bd8] mb-4 h-12 justify-center items-center text-2xl">
          FCU Filter Changing Records
        </h2>

        <div className="overflow-x-auto  mt-4">
          <table className=" table w-full border-spacing-2  border border-3 border-slate-600 ">
            <thead className="border-2 border-[#FFCB24]">
              <tr className="divide-x divide-blue-400 text-center">
                <th className="w-12">SN</th>
                <th>Site ID</th>
                <th>
                  <div>FCU </div>
                  <div>Brand</div>
                </th>
                <th>
                  <div>Service</div>
                  <div>Type</div>
                </th>
                <th>
                  <div>FCU</div>
                  <div>Status</div>
                </th>

                <th>
                  <div>Pre Service</div>
                  <div> Date</div>
                </th>
                <th>
                  <div>Latest Service</div>
                  <div>Date</div>
                </th>
                <th className="text-[#5d9655]">
                  <div>Next Plan</div>
                  <div>Date</div>
                </th>

                <th>
                  <div>Update</div>
                  <div>By</div>
                </th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {fcuFilter?.map((fcuInfo, index) => (
                <FcuMaintenanceListRow
                  key={fcuInfo._id}
                  fcuInfo={fcuInfo}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FcuMaintenanceList;
