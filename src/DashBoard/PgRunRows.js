import React, { useState } from "react";

const PgRunRows = ({ pgRun, index,refetch }) => {
  const {
    date,
    site,
    pgNo,
    pgStartTime,
    pgStoptTime,
    onCallName,
    status,
    pgRunnerName,
    remark,
  } = pgRun;
 // console.log(fuelConsume);
 // console.log(pgStartTime);
 
  let start = pgStartTime?.split(":");
  let stop = pgStoptTime?.split(":");
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
  const consume = (timeValue * 3).toFixed(2);
 refetch();
  return (
    <>
      <tr className="border-2 border-green-300">
        <th>{index + 1}</th>

        <td>{date}</td>
        <td>{site}</td>
        <td>{pgNo}</td>
        <td>{pgStartTime}</td>
        <td>{pgStoptTime}</td>
        <td>{duration}</td>
        <td>{consume}</td>
        <td>{onCallName}</td>
        <td>{pgRunnerName}</td>
        <td>{status}</td>
        <td className="font-bold">{remark}</td>
      </tr>
    </>
  );
};

export default PgRunRows;
