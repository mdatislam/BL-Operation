import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import useUserList from "../Pages/Hook/useUserList";
import Loading from "../Pages/SharedPage/Loading";
import FuelBalanceRow from "./FuelBalanceRow";

const FuelBalance = () => {
  const [userList] = useUserList();
  const navigate = useNavigate();

  const { data: pgRunData, isLoading2 } = useQuery(["list"], () =>
    fetch(
      "https://bl-operation-server-production.up.railway.app/ApprovedAllPgRun",
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/Login");
      }
      return res.json();
    })
  );

  const { data: receiveFuel, isLoading3 } = useQuery(["fuel"], () =>
    fetch("https://bl-operation-server-production.up.railway.app/fuelListAll", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading2 || isLoading3) {
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
  });
  /* } */

  // Total issued fuel calculation
  const FF = receiveFuel?.map((f) => f.fuelQuantity);
  const total = FF?.reduce(
    (previous, current) => previous + parseFloat(current),
    0
  );

  return (
    <div>
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
                Fuel<p>Receive</p>{" "}
              </th>
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
              <th className="text-[#008080] text-xl font-bold">
                {total}
                <span className="stat-desc"> &nbsp;liter</span>
              </th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default FuelBalance;
