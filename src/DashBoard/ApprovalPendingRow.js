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
    onCallName,
    status,
    pgRunnerName,
    
  } = pgRun;

  let start = pgStartTime.split(":");
  let stop = pgStoptTime.split(":");
  let startTime = new Date(0, 0, 0, start[0], start[1], 0);
  let stopTime = new Date(0, 0, 0, stop[0], stop[1], 0);
  let diff = stopTime.getTime() - startTime.getTime();
  // console.log(diff)
  const hours = Math.floor(diff / 3600000);
  //console.log(hours);
  diff = diff - hours * 1000 * 3600;
  const minutes = Math.floor(diff / 60000);
  //console.log(minutes);
  const duration = `${hours}:${minutes}`;
  const time = duration.split(":");
  const timeValue = parseInt(time[0], 10) + parseInt(time[1], 10) / 60;
  const consump = (timeValue * 3).toFixed(2);

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
      <td>{duration}</td>
      <td>{consump}</td>
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
