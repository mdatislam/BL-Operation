
import {XCircleIcon} from '@heroicons/react/24/solid'

const PgRunRows = ({ pgRun, index, refetch, setDelPg }) => {
  const {
    date,
    site,
    moduleCapacity,
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
      <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
        <th>{index + 1}</th>

        <td>{date}</td>
        <td>{site}</td>
        <td>{moduleCapacity}</td>
        <td>{pgNo}</td>
        <td>{pgStartTime}</td>
        <td>{pgStoptTime}</td>
        <td>{pgRunDuration}</td>
        <td>{fuelConsume}</td>
        <td>{onCallName}</td>
        <td>{pgRunnerName}</td>
        <td>{status}</td>
        <th>
          {status !== "Approved" ?<label
            htmlFor="deletePgRun"
            className="btn btn-link text-red-500"
            onClick={() => setDelPg(pgRun)}
          >
            <XCircleIcon className="h-6 w-6 text-red-500" />
            
          </label>:""}

           
        </th>
        <td className="whitespace-pre-line text-red-500">{remark}</td>
      </tr>
    </>
  );
};

export default PgRunRows;
