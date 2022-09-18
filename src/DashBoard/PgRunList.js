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
    const url = `https://enigmatic-eyrie-94440.herokuapp.com/fuelList?email=${user.email}`;
    //console.log(url)
    fetch(url)
      .then((res) => res.json())
      .then((data) => setReceiveFuel(data));
  }, [user]);

  const { data: pgRunData, isLoading } = useQuery(["list", user], () =>
    fetch(
      `https://enigmatic-eyrie-94440.herokuapp.com/pgRunAllList?email=${user.email}`
    ).then((res) => res.json())
  );

  //setLoading(true);
  /* const { data: receiveFuel, isLoading1 } = useQuery(["list2", user], () =>
    fetch(`https://enigmatic-eyrie-94440.herokuapp.com/fuelList?email=${user.email}`).then((res) =>
      res.json()
    )
  ); */

  if (isLoading) {
    return <Loading />;
  }

  const approveConsume = pgRunData.filter((ap) => ap.status === "Approved");

  const totalFuel = approveConsume.map((C) => {
    const consume = C.fuelConsume;
    return consume;
  });
  // console.log(totalFuel)
  // console.log(approveConsume);
  /* if (receiveFuel) {
   setLoading(false);
 } */
  const totalConsume = totalFuel.reduce(
    (previous, current) => previous + parseFloat(current),
    0
  );

  const Fuel = receiveFuel.map((C) => {
    const fuelReceive = C.fuelQuantity;
    return fuelReceive;
  });

  //console.log(Fuel);
  const receivedFuel = Fuel.reduce(
    (previous, current) => previous + parseFloat(current),
    0
  );

  const balance = receivedFuel - totalConsume;

  return (
    <div>
      <div className="text-center  text-2xl mt-12 mb-8">
        <div className="stats bg-[#001f3f] stats-vertical lg:stats-horizontal shadow">
          <div className="stat text-[#FFFFFF]">
            <div className="stat-title">Total Received Fuel</div>
            <div className="stat-value">{receivedFuel}</div>
            <div className="stat-desc">
              Liter
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                />
              </svg>
            </div>
          </div>

          <div className="stat text-[#FFFFFF]">
            <div className="stat-title">Total Approved Consume</div>
            <div className="stat-value">{totalConsume}</div>
            <div className="stat-desc">
              Liter
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
              </svg>
            </div>
          </div>

          <div className="stat text-[#FFDC00]">
            <div className="stat-title">Balance</div>
            <div className="stat-value ">{balance}</div>
            <div className="stat-desc">
              {" "}
              Liter
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="grid h-20 card bg-[#edf7b6] rounded-box place-items-center mt-12">
          <h2 className="text-[#11111f] font-bold ">Your All PG Run Record</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full border-2 border-cyan-200">
          <thead>
            <tr>
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
