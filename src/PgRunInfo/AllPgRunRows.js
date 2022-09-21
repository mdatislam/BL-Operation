import React from 'react';

const AllPgRunRows = ({pgRun,index}) => {
    const {
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
      remark,
    } = pgRun;
    return (
      <>
        <tr className="border-2 border-[#F0D786]">
          <th>{index + 1}</th>

          <td>{date}</td>
          <td>{site}</td>
          <td>{pgNo}</td>
          <td>{pgStartTime}</td>
          <td>{pgStoptTime}</td>
          <td>{pgRunDuration}</td>
          <td>{fuelConsume}</td>
          <td>{onCallName}</td>
          <td>{pgRunnerName}</td>
          <td>{status}</td>
          <td className="font-bold">{remark}</td>
        </tr>
      </>
    );
};

export default AllPgRunRows;