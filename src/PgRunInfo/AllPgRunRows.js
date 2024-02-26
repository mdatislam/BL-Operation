import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid'

const AllPgRunRows = ({ pgRun, index, admin, setEditPgRun }) => {
  const {
    date,
    site,
    pgNo,
    pgStartTime,
    pgStoptTime,
    pgRunDuration,
    fuelConsume,
    onCallName,
    pgRunnerName,

  } = pgRun;
  return (
    <>
      <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
        <td>{index + 1}</td>
        <td>{date}</td>
        <td>{site}</td>
        <td>{pgNo}</td>
        <td>{pgStartTime}</td>
        <td>{pgStoptTime}</td>
        <td>{pgRunDuration}</td>
        <td>{fuelConsume}</td>
        <td>{onCallName}</td>
        <td>{pgRunnerName}</td>
        <td className='flex justify-center'>{
          admin &&
          <label htmlFor="editPgRun_modal" className="btn btn-link"
            onClick={()=> setEditPgRun(pgRun)}
          >
            <PencilSquareIcon className='w-6 h-6 text-green-500 '

            />
          </label>


        }</td>
      </tr>
    </>
  );
};

export default AllPgRunRows;