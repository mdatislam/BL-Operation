import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "../Pages/SharedPage/Loading";
import PgRunRows from "./PgRunRows";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PgRunList = () => {
  /* const [loading, setLoading] = useState(false); */
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [receiveFuel, setReceiveFuel] = useState([]);
  useEffect(() => {
    const url = `http://localhost:5000/fuelList?email=${user.email}`;
    //console.log(url)
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReceiveFuel(data));
  }, [user]);

  const { data: pgRunData, isLoading } = useQuery(["list", user], () =>
    fetch(
      ` https://enigmatic-eyrie-94440.herokuapp.com/pgRunAllList?email=${user.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => res.json())
  );

  if (isLoading) {
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
            <div className="stat-value">{totalConsume}</div>
            <div className="stat-desc">Liter</div>
          </div>

          <div className="stat text-[#FFCB24]">
            <div className="stat-title">Balance</div>
            <div className="stat-value ">{balance}</div>
            <div className="stat-desc"> Liter</div>
          </div>
        </div>
        <div className="grid h-12 card bg-[#FFCB24] rounded-box place-items-center mt-12">
          <h2 className="text-[#828282] font-bold ">Your All PG Run Record</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead className="border-3  text-[#FFcb24]">
            <tr className=" border-3 bg-[#555555]">
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
              <th>
                <div>Approval</div>
                <div>Status</div>
              </th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {pgRunData.map((pgRun, index) => (
              <PgRunRows
                key={pgRun._id}
                pgRun={pgRun}
                index={index}

                //fuelConsume={fuelConsume}
              ></PgRunRows>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PgRunList;
