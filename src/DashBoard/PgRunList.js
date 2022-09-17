import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "../Pages/SharedPage/Loading";
import PgRunRows from "./PgRunRows";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import FuelBalance from "./FuelBalance";


const PgRunList = () => {
  //const {receivedFuel}= receivedFuel
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  /* const [pgRunData, setPgRunData] = useState([])
    useEffect(() => {
        
            const url = `http://localhost:5000/pgRunAllList?email=${user.email}`
            console.log(url)
            fetch(url)
                .then(res => res.json())
            .then(data=> setPgRunData(data))

    }, [user])  */

  const {
    data: pgRunData,
    isLoading,
    refetch,
  } = useQuery(["list", user], () =>
    fetch(`http://localhost:5000/pgRunAllList?email=${user.email}`).then((res) => res.json())
  );

  const { data: receiveFuel, } = useQuery(["list2", user], () =>
    fetch(`http://localhost:5000/fuelList?email=${user.email}`).then((res) =>
      res.json()
    )
  );

   
  if (isLoading) {
    return <Loading />;
  }

  const totalFuel = receiveFuel.map((fuelValue, index) => {
    const x = parseFloat(fuelValue.fuelQuantity);
    return x;
  });
  //console.log(totalFuel);
  const receivedFuel = totalFuel.reduce(
    (previous, current) => previous + parseFloat(current),
    0
  );

  const consumption = pgRunData.map((pgRun, index) => {
    const start1 = pgRun.pgStartTime
    const stop1 = pgRun.pgStopTime
    let array=[]
    if (start1 && stop1) {
      let start = start1.split(":");
     let stop = stop1.split(":");
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
array.push(consume)
      console.log(consume);
    }
   return array
  })
  console.log(consumption)
   const totalConsume = consumption.reduce(
     (previous, current) => previous + parseFloat(current),
     0
   );


  return (
    <div>
      <div className="text-center text-primary text-2xl mt-4 mb-8">
        <h2 className="text-Primary">Your All PG Run Record:{totalConsume} </h2>
        <h2 className="text-Primary"> Total Fuel Receive:{receivedFuel} </h2>
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
                refetch={refetch}
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
