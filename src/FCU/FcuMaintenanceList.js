import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link} from "react-router-dom";
import { CSVLink } from "react-csv";
import auth from "./../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import useAdmin from "./../Pages/Hook/useAdmin";
import FcuMaintenanceListRow from "./FcuMaintenanceListRow";
import { ArrowDownTrayIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import FcuFilterDel from "./FcuFilterDel";


const FcuMaintenanceList = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [axiosSecure]=useAxiosSecure()
  const [del,setDel]=useState("")
 
  const { data: fcuFilterRecord=[],refetch} = useQuery({
    queryKey:["fcuFilterRecord"],
    queryFn:async()=>{
      const res= await axiosSecure.get("/fcuFilterChangeLatestRecord")
      return res.data
    }
  })

  //console.log(del)
    
  return (
    <div className="bg-teal-300 h-100 px-8">
      <div className=" mx-auto ">
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
                data={fcuFilterRecord}
                filename="fcuServiceRecord"
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
          <table className=" table table-auto w-full  border border-3 border-slate-600 ">
            <thead className="border-2 border-[#FFCB24]">
              <tr className="divide-x divide-blue-400 text-center">
                <th className="">SN</th>
              {admin &&  <th>Action</th> }
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
              {fcuFilterRecord?.map((fcuInfo, index) => (
                <FcuMaintenanceListRow
                  key={fcuInfo._id}
                  fcuInfo={fcuInfo}
                  index={index}
                  setDel={setDel}
                  admin={admin}
                />
              ))}
            </tbody>
          </table>
          { del && <FcuFilterDel id={del} setDel={setDel} refetch={refetch}
          
          />
          }
        </div>
      </div>
    </div>
  );
};

export default FcuMaintenanceList;
