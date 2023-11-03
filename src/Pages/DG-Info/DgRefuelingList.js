import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link,} from "react-router-dom";
import Loading from "../SharedPage/Loading";
import DgRefuelingRow from "./DgRefuelingRow";
import { CSVLink } from "react-csv";
import auth from "../../firebase.init";
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useAuthState } from "react-firebase-hooks/auth";
import useAdmin from "../Hook/useAdmin";

const DgRefuelingList = () => {
const [axiosSecure]=useAxiosSecure()
const [user] = useAuthState(auth)
  const [admin] = useAdmin(user)

const { data: dgRefueling=[],isLoading,refetch } = useQuery({
  queryKey: ["dgRefueling"],
  queryFn: async () => {
      const res = await axiosSecure.get("/dgRefuelingInfo")
      return res.data
  }
})

// console.log(services)
if (isLoading) {
  return <Loading />;
}

  
  // console.log(services)
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-8 px-4 mb-4">
      <div className=" flex flex-col lg:flex-row gap-2  rounded-lg mb-4 ">
        <div className="flex flex-row lg:flex-col gap-2 justify-between">
          <Link
            to="/AllRefueling"
            className=" flex-1 order-first btn btn-secondary"
          >
            View All Refueling List
          </Link>
          <Link
            to="/Dashboard/DgRefuelingUpdate"
            className=" flex-1  btn btn-secondary"
          >
            GO DG Refueling Update
          </Link>
        </div>
        <h2 className="grow  bg-[#6495ED] rounded-lg text-center h-12 py-2 align-text-bottom text-xl font-bold text-white">
          Only Latest DG Refueling Record
        </h2>
      </div>
      {/* For Data export */}
      <div>
        <CSVLink
          data={dgRefueling}
          filename="PgRunData"
          className="btn btn-primary btn-sm mb-2"
        >
          <ArrowDownTrayIcon  className="h-6 w-6 text-blue-500" />
          
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
                <div>Latest</div>
                <div>Refueling Date</div>
              </th>

              <th>
                <div>Latest </div>
                <div>DG RH</div>
              </th>
              <th>
                <div>Previous</div>
                <div>Fuel Quantity</div>
              </th>

              <th>
                <div>Refueling</div>
                <div>Quantity</div>
              </th>
              <th className="text-[#e98811] font-bold">
                <div>previous</div>
                <div>Refueling Date</div>
              </th>

              <th className="text-[#e98811] font-bold">
                <div>Previous </div>
                <div>Refueling RH</div>
              </th>
              <th className="text-[#e98811] font-bold">
                <div>Total Fuel</div>
                <div>last Refueling</div>
              </th>
              <th>
                <div>Consumption</div>
              </th>
              <th>
                <div>Refueling</div>
                <div>By</div>
              </th>
              <th>
                <div>Refueling</div>
                <div>RH Photo</div>
              </th>

              <th>Remarks</th>
             {admin && <th>Action</th>}

            </tr>
          </thead>
          <tbody>
            {dgRefueling?.map((refuel, index) => (
              <DgRefuelingRow key={refuel._id} 
              refuel={refuel} index={index}
              admin={admin}
                  axiosSecure={axiosSecure}
                  refetch={refetch}
               />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DgRefuelingList;
