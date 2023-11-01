import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link} from "react-router-dom";
import Loading from "../SharedPage/Loading";
import AllRefuelingRows from "./AllRefuelingRows";
import { CSVLink } from "react-csv";
import { ArrowDownTrayIcon,ChevronDoubleLeftIcon} from '@heroicons/react/24/solid'
import useAxiosSecure from "../Hook/useAxiosSecure";

const AllRefuelingList = () => {
  const [axiosSecure]=useAxiosSecure()


  const { data: dgRefueling=[],isLoading } = useQuery({
    queryKey: ["dgRefueling"],
    queryFn: async () => {
        const res = await axiosSecure.get("/dgAllRefueling")
        return res.data
    }
})
  
  // console.log(services)
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-8 px-4 mb-4">
      <div className="flex flex-row flex-wrap h-12 card bg-[#099252] rounded-lg justify-between mb-4 gap-x-16">
        <Link to="/DgRefueling" className="flex-1 btn btn-secondary h-12">
        <ChevronDoubleLeftIcon  className="h-6 w-6 text-blue-500" />
          
          Back
        </Link>
        <h2 className=" flex-auto font-bold  justify-center text-white">
          All Refueling Record
        </h2>
        <Link
          to="/Dashboard/DgRefuelingUpdate"
          className="flex-1 btn btn-secondary h-12"
        >
          Refueling Update
        </Link>
      </div>
      {/* For data export */}
      <div>
        <CSVLink
          data={dgRefueling}
          filename="dgRefueling"
          className="btn btn-outline btn-info mb-2"
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
                <div>previous</div>
                <div>Refueling Date</div>
              </th>

              <th>
                <div>Previous </div>
                <div>Refueling RH</div>
              </th>
              <th>
                <div>Total Fuel</div>
                <div>last Refueling</div>
              </th>

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
            </tr>
          </thead>
          <tbody>
            {dgRefueling.map((refuel, index) => (
              <AllRefuelingRows
                key={refuel._id}
                refuel={refuel}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRefuelingList;
