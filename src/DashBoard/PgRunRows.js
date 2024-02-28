
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/solid'

const PgRunRows = ({ pgRun, index, refetch, setDelPg, setEditPgRun }) => {
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
        <td>{index + 1}</td>
        <td className='flex justify-start'>
          {status !== "Approved" ? <label
            htmlFor="deletePgRun"
            className="btn btn-sm btn-link text-red-500"
            onClick={() => setDelPg(pgRun)}
          >
            <XCircleIcon className="h-6 w-6 text-red-500" />

          </label> : ""}

          {
            status !== "Approved" ?
              <label htmlFor="editPgRun_modal" className="btn btn-sm btn-link"
                onClick={() => setEditPgRun(pgRun)}
              >
                <PencilSquareIcon className='w-6 h-6 text-green-500 '

                />
              </label> : ""
          }


        </td>

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

        <td className="whitespace-pre-line text-red-500">{remark}</td>
      </tr>
    </>
  );
};

export default PgRunRows;
