import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import useUserList from "../Pages/Hook/useUserList";
import Loading from "../Pages/SharedPage/Loading";
import FuelBalanceRow from "./FuelBalanceRow";
import FuelBalanceInfo from "./FuelBalanceInfo";

const FuelBalance = () => {
  const [userList] = useUserList();
  const navigate = useNavigate();

  const { isLoading2, data: pgRunData } = useQuery(["list"], () =>
    fetch("http://localhost:5000/ApprovedAllPgRun", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/Login");
      }
      return res.json();
    })
  );

  const { isLoading3, data: receiveFuel } = useQuery(["fuel"], () =>
    fetch("http://localhost:5000/fuelListAll", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  const { isLoading, data: receiveFuelOncall } = useQuery(["fuelOncall"], () =>
    fetch("http://localhost:5000/fuelListAllOncall", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading || isLoading2 || isLoading3) {
    return <Loading />;
  }

  //console.log(users);
  //console.log(pgRunData);
  //console.log(receiveFuel);

  /*   if (users) { */
  userList?.forEach((user) => {
    // per user total fuel consumption calculation

    const pgRun = pgRunData?.filter((p) => p.pgRunnerEmail === user.email);
    const consume = pgRun?.map((c) => c.fuelConsume);
    //console.log(consume)
    const totalConsume = consume?.reduce(
      (previous, current) => previous + parseFloat(current),
      0
    );

    user.fuelConsume = totalConsume?.toFixed(2);

    // per user total fuel receive calculation
    const fuelTaker = receiveFuel?.filter(
      (f) => f.fuelReceiverEmail === user.email
    );
    const fuelTaken = fuelTaker?.map((d) => d.fuelQuantity);
    const totalFuel = fuelTaken?.reduce(
      (previous, current) => previous + parseFloat(current),
      0
    );

    user.fuelQuantity = totalFuel;

    // per user total fuel receiveOncall calculation
    const fuelTakerOncall = receiveFuelOncall?.filter(
      (g) => g.fuelReceiverEmail === user.email
    );
    const fuelTakenOncall = fuelTakerOncall?.map((d) => d.fuelQuantity);
    const totalFuelOncall = fuelTakenOncall?.reduce(
      (previous, current) => previous + parseFloat(current),
      0
    );

    user.fuelQuantityOncall = totalFuelOncall;
  });

  // Total issued fuel calculation
  const FF = receiveFuel?.map((f) => f.fuelQuantity);
  const total = FF?.reduce(
    (previous, current) => previous + parseFloat(current),
    0
  );

  // Total issued fuel Oncall calculation
  const GG = receiveFuelOncall?.map((f) => f.fuelQuantity);
  const totalOncall = GG?.reduce(
    (previous, current) => previous + parseFloat(current),
    0
  );

  return (
    <div>
      <Link
        className="btn btn-sm btn-outline btn-secondary mb-3"
        to="/Dashboard/fuelUpdateOnCall"
      >
        Fuel Update_OnCall
      </Link>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full border-3 border-[#ffcb24]">
          <thead className="border-2 border-[#ffcb24] bg-[#ffcb24] !important">
            <tr className="divide-x divide-blue-400 text-center">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>
                Received Fuel
                <p className="text-pink-400">
                  (Oncall &nbsp;&nbsp;&nbsp; ||&nbsp;&nbsp;&nbsp; Own)
                </p>{" "}
              </th>
              {/*  <th>
                Fuel<p>Receive</p>{" "}
              </th> */}
              <th>
                Fuel <p>Consume</p>
              </th>
              <th> Balance</th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((u, index) => (
              <FuelBalanceRow key={u._id} index={index} u={u}></FuelBalanceRow>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-collapse border-2 border-[#F0D786] text-center">
              <th></th>
              <th className=" font-bold text-[#008080]">
                Total Fuel Issued ={" "}
              </th>
              <th className=" text-xl font-bold">
                <span className="text-pink-700">{totalOncall} </span>
                || <span className="text-blue-600">{total} </span>
                <span className="stat-desc"> &nbsp;liter</span>
              </th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <FuelBalanceInfo />
    </div>
  );
};

export default FuelBalance;
