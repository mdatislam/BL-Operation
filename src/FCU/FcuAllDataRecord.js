import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, } from "react-router-dom";
import FcuAllDataRecordRow from "./FcuAllDataRecordRow";
import { CSVLink } from "react-csv";
import { ArrowDownTrayIcon, BackwardIcon} from '@heroicons/react/24/solid'
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";

const FcuAllDataRecord = () => {
 
  const [axiosSecure]=useAxiosSecure()


  const { data: fcuServiceAllRecord=[]} = useQuery({
    queryKey:["fcuServiceAllRecord"],
    queryFn:async()=>{
      const res= await axiosSecure.get("/fcuFilterChangeAllRecord")
      return res.data
    }
  })

  
  return (
    <div className="px-2">
      <div className=" flex flex-col md:flex-row justify-between px-2 gap-y-2 mb-2 rounded-lg border-2 py-4 mt-2">
        <Link
          to="/FcuMaintenance"
          className="flex btn btn-outline btn-primary btn-sm"
        >
          <BackwardIcon  className="h-6 w-6 text-blue-500" />
          
        </Link>

        {/* For Data Export */}

        <div>
          <CSVLink
            data={fcuServiceAllRecord}
            filename="fcuFilterChangeAllRecord"
            className="flex btn btn-outline btn-primary btn-sm"
          >
            <ArrowDownTrayIcon  className="h-6 w-6 text-blue-500" />
            
          </CSVLink>
        </div>
      </div>
      <h2 className="flex rounded-lg  text-white bg-[#746bd8] mb-4 mt-4 h-12 justify-center items-center text-2xl">
        FCU Service All Records
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
                <div>Pre Service</div>
                <div> Date</div>
              </th>
              <th>
                <div>Latest Service</div>
                <div> Date</div>
              </th>
              <th>
                <div>Next Plan</div>
                <div>Date</div>
              </th>
              <th>
                <div>Service </div>
                <div>Type</div>
              </th>
              <th>
                <div>Fcu</div>
                <div>Status</div>
              </th>
              <th>
                <div>Updated</div>
                <div>By</div>
              </th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {fcuServiceAllRecord?.map((data, index) => (
              <FcuAllDataRecordRow key={index} data={data} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FcuAllDataRecord;
