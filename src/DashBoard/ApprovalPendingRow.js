import React from "react";
import { toast } from "react-toastify";

const ApprovalPendingRow = ({ pgRun, index, setReject,refetch }) => {
  const {
    _id,
    date,
    site,
    pgNo,
    pgStartTime,
    pgStoptTime,
    pgRunDuration,
    fuelConsume,
    onCallName,
    status,
    pgRunnerName,
    
  } = pgRun;
   

  const handleApprove = id => {
     fetch(`http://localhost:5000/pgRunList/${id}`, {
       method: "PUT",
       headers: {
         "content-type": "application/json",
       },
       body: JSON.stringify({
         status: "Approved",
         remark: "OK",
       }),
     })
      .then(res => res.json())
       .then(approveData => {
         if (approveData.modifiedCount> 0) { 
           toast.success('Approved successfully done')
         } 
         refetch()
    })
  //console.log(id)
}

  return (
    <tr className="border-2 border-green-300">
      <th>{index + 1}</th>
      <th>{status}</th>
      <td>{date}</td>
      <td>{site}</td>
      <td>{pgNo}</td>
      <td>{pgStartTime}</td>
      <td>{pgStoptTime}</td>
      <td>{pgRunDuration}</td>
      <td>{fuelConsume}</td> 
      <td>{onCallName}</td>
      <td>{pgRunnerName}</td>

      <td>
        <label
          
          className="btn btn-secondary text-white btn-xs mx-2"
          onClick={()=> handleApprove(_id)}
        >
          Approve
        </label>

        <label
          htmlFor="rejectApproval"
          className="btn btn-warning btn-xs"
         onClick={() => setReject(pgRun)}
        >
          Reject
        </label>
      </td>
    </tr>
  );
};

export default ApprovalPendingRow;
