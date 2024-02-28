import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "../Pages/SharedPage/Loading";
import PgRunRows from "./PgRunRows";
import { useState, } from "react";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import DeletePgRun from "./DeletePgRun";
import TableCaption from '../Pages/SharedPage/TableCaption'
import EditPgRunData from "../PgRunInfo/EditPgRunData";


const PgRunList = () => {
  const [user] = useAuthState(auth);
  const [axiosSecure] = useAxiosSecure()
  const [searchPgRun, setSearchPgRun] = useState("");
  const [filter, setFilter] = useState([]);
  const [delPg, setDelPg] = useState("");
  const [editPgRun, setEditPgRun] = useState("")


  const { isLoading2,
    data: receiveFuel
  } = useQuery({
    queryKey: ["receiveFuel", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/fuelList?email=${user.email}`)
      return res.data
    }
  })


  const { isLoading,
    data: pgRunData,
    refetch,
  } = useQuery({
    queryKey: ["pgRunData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pgRunAllList?email=${user.email}`)
      return res.data
    }
  })

  if (isLoading || isLoading2) {
    return <Loading />;
  }

  const approveConsume = pgRunData?.filter((ap) => ap.status === "Approved");

  const totalFuel = approveConsume?.map((C) => {
    const consume = C.fuelConsume;
    return consume;
  });
  // console.log(totalFuel)
  // console.log(approveConsume);
  /* if (receiveFuel) {
   setLoading(false);
 } */
  const totalConsume = totalFuel?.reduce(
    (previous, current) => previous + parseFloat(current),
    0
  );
  const totalApprovedConsume = totalConsume?.toFixed(2);
  const Fuel = receiveFuel?.map((C) => {
    const fuelReceive = C.fuelQuantity;
    return fuelReceive;
  });

  //console.log(Fuel);
  const receivedFuel = Fuel?.reduce(
    (previous, current) => previous + parseFloat(current),
    0
  );

  const balance = (receivedFuel - totalConsume).toFixed(2);

  /* For filtering purpose */
  const handlesearch = (e) => {
    const search = e.target.value;
    setSearchPgRun(search);

    if (search !== "") {
      const filterData = pgRunData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilter(filterData);
    } else {
      setFilter(pgRunData);
    }
  };

  return (
    <div>
      <div className="text-center  text-2xl mt-12 mb-8">
        <div className="stats bg-[#001f3f] stats-vertical lg:stats-horizontal shadow-xl">
          <div className="stat text-[#FFF]">
            <div className="stat-title">Total Received Fuel</div>
            <div className="stat-value">{receivedFuel}</div>
            <div className="stat-desc">Liter</div>
          </div>

          <div className="stat text-[#FFF]">
            <div className="stat-title">Total Approved Consume</div>
            <div className="stat-value">{totalApprovedConsume}</div>
            <div className="stat-desc">Liter</div>
          </div>

          <div className="stat text-[#FFCB24]">
            <div className="stat-title">Balance</div>
            <div className="stat-value ">{balance}</div>
            <div className="stat-desc"> Liter</div>
          </div>
        </div>
        {/* <div className="grid h-12 card bg-[#c334ef] rounded-box place-items-center mt-12">
          <h2 className="text-white font-bold ">Your All PG Run Record</h2>
        </div>  */}
      </div>
      <div className="flex  justify-between flex-wrap mb-4 px-2">
        <input
          type="text"
          className="input input-bordered border-sky-400 w-full max-w-xs flex-auto "
          placeholder="Enter search Keyword"
          onChange={(e) => {
            handlesearch(e);
          }}
        />
      </div>
      <div className="overflow-x-auto px-2">
        <table className="table table-compact w-full">
          <TableCaption tableHeading="Your All PG Run Record" bgColor="#c334ef " />
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400 text-center">
              <th>SN</th>
              <th>Action</th>
              <th>Date</th>
              <th>Site ID</th>
              <th className="whitespace-pre-line">
                <div>Rectifier Module Capacity</div>

              </th>
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
              <th>Consume</th>
              <th className="whitespace-pre-line">

                <div>Approval Responsible</div>

              </th>
              <th>PG Runner</th>
              <th>
                <div>Approval</div>
                <div>Status</div>
              </th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {searchPgRun.length > 0
              ? filter?.map((pgRun, index) => (
                <PgRunRows
                  key={pgRun._id}
                  pgRun={pgRun}
                  index={index}
                  refetch={refetch}
                  setDelPg={setDelPg}
                 setEditPgRun={setEditPgRun}
                //fuelConsume={fuelConsume}
                ></PgRunRows>
              ))
              : pgRunData?.map((pgRun, index) => (
                <PgRunRows
                  key={pgRun._id}
                  pgRun={pgRun}
                  index={index}
                  refetch={refetch}
                  setDelPg={setDelPg}
                  setEditPgRun={setEditPgRun}
                //fuelConsume={fuelConsume}
                ></PgRunRows>
              ))}
          </tbody>
        </table>
      </div>
      {delPg && (
        <DeletePgRun
          delPg={delPg}
          setDelPg={setDelPg}
          refetch={refetch}
        ></DeletePgRun>
      )}

      {
        editPgRun &&
        <EditPgRunData editPgRun={editPgRun} setEditPgRun={setEditPgRun}
        refetch={refetch}

        />
      }
    </div>
  );
};

export default PgRunList;
