import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../Pages/SharedPage/Loading";
import ApprovalPendingRow from "./ApprovalPendingRow";
import { CSVLink } from "react-csv";
import { ArrowDownTrayIcon, } from '@heroicons/react/24/solid'
import TableCaption from "../Pages/SharedPage/TableCaption";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";

const ApprovalPendingList = () => {
  //const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure()

  const { isLoading, data: pgRunData = [] } = useQuery({
    queryKey: ["pgRunData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/PendingAllPgRun")
      return res.data
    }
  })

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="px-2 lg:px-16 mt-4 mb-4">
      
      {/* For Data Export */}
      <div className="flex justify-end">
        <CSVLink
          data={pgRunData}
          filename="PendingPgRunApproval"
          className="btn btn-outline btn-info mb-2"
        >
          <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />

        </CSVLink>
      </div>
      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <TableCaption tableHeading="Approval Pending List" bgColor="bg-blue-500" />
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400 text-center">
              <th>SN</th>

              <th>Date</th>
              <th>Site ID</th>
              <th>PG No</th>
              <th>
                <div>PG Start</div>
                <div>Time</div>
              </th>
              <th>
                <div>PG Stop</div>
                <div>Time</div>
              </th>
              <th>Duration</th>
              <th>Consumption</th>
              <th>
                {" "}
                <div>Approval</div>
                <div>Responsible</div>
              </th>
              <th>PG Runner</th>
            </tr>
          </thead>
          <tbody>
            {pgRunData?.map((pgRun, index) => (
              <ApprovalPendingRow
                key={pgRun._id}
                pgRun={pgRun}
                index={index}
              ></ApprovalPendingRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalPendingList;
