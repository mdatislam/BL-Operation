import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "../Pages/SharedPage/Loading";
import ApprovalPendingRow from "./ApprovalPendingRow";
import RejectApproval from "./RejectApproval";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";

const ApprovalPending = () => {
  const [user] = useAuthState(auth);
  const [axiosSecure] = useAxiosSecure()
  const [reject, setReject] = useState(" ");


  const { isLoading, refetch, data: pgRunData = [] } = useQuery({
    queryKey: ['pgRunData', user],
    queryFn: async () => {
      const res = await axiosSecure.get(`ApprovalList?email=${user.email}`)
      return res.data
    }
  })

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="text-center text-primary text-2xl mt-4 mb-8">
        <h2>Approval Pending List</h2>
      </div>
      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400 text-center">
              <th>SN</th>
              <th>
                <div>Approval</div>
                <div>Status</div>
              </th>
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
              <th>Remarks</th>
              <th>Verify Status</th>
            </tr>
          </thead>
          <tbody>
            {pgRunData.map((pgRun, index) => (
              <ApprovalPendingRow
                key={pgRun._id}
                pgRun={pgRun}
                index={index}
                setReject={setReject}
                refetch={refetch}
                pgRunner={user.displayName}
              ></ApprovalPendingRow>
            ))}
          </tbody>
        </table>
      </div>
      {reject && (
        <RejectApproval
          reject={reject}
          refetch={refetch}
          setReject={setReject}
        ></RejectApproval>
      )}
    </div>
  );
};

export default ApprovalPending;
