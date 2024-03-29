import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../SharedPage/Loading";
import { CSVLink } from "react-csv";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import DgServicePlanRows from "./DgServicePlanRows";
import useAdmin from "../Hook/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import { ArrowDownTrayIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import useAxiosSecure from "../Hook/useAxiosSecure";

const DgServicingPlan = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [axiosSecure] = useAxiosSecure()


  const { isLoading, data: dgServiceInfo = [] } = useQuery({
    queryKey: ["dgServiceInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dgServiceInfo")
      return res.data
    }
  })


  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-8 px-4 mb-4 lg:w-3/4 mx-auto">
      <h2 className="flex rounded-lg  text-white bg-[#78e33f] mb-4 h-12 justify-center items-center">
        DG Servicing Plan Sites
      </h2>

      <div className=" flex justify-between  mb-2 rounded-lg border-2 p-4 ">
        <Link
          to="/DgServicing"
          className="flex btn btn-outline btn-primary btn-sm"
        >
          <ChevronDoubleLeftIcon className="h-6 w-6 text-blue-500" />

        </Link>

        <Link
          to="/Dashboard/DgServicingUpdate"
          className="flex btn btn-outline btn-primary btn-sm"
        >
          Data UPDATE
        </Link>
        {/* For Data Export */}
        {admin && (
          <div>
            <CSVLink
              data={dgServiceInfo}
              filename="dgServiceInfo"
              className="flex btn btn-outline btn-primary btn-sm"
            >
              <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />

            </CSVLink>
          </div>
        )}
      </div>

      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400 text-center">
              <th className="w-12">SN</th>
              <th>Site ID</th>
              <th>
                <div>Latest</div>
                <div>Service Date</div>
              </th>

              <th>
                <div>Latest </div>
                <div>DG RH</div>
              </th>

              <th>
                <div>Air Filter</div>
                <div>Use Status</div>
              </th>
              <th>Day Difference</th>
              <th className="bg-[#61ec4c]">
                <div>Next Plan</div>
                <div>Date</div>
              </th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {dgServiceInfo?.map((dgInfo, index) => (
              <DgServicePlanRows
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

export default DgServicingPlan;
