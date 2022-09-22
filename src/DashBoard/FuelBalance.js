import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "../Pages/SharedPage/Loading";
import FuelBalanceRow from "./FuelBalanceRow";

const FuelBalance = () => {
  const [user] = useAuthState(auth);
 

  const { data: users, isLoading } = useQuery(["userList"], () =>
    fetch("http://localhost:5000/userList", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
   

  const { data: pgRunData, isLoading2 } = useQuery(["list"], () =>
    fetch("http://localhost:5000/pgRunAll", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  
 

  const { data: receiveFuel, isLoading3 } = useQuery(["fuel"], () =>
    fetch("http://localhost:5000/fuelListAll", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }

   if (isLoading2) {
     return <Loading />;
  }
   if (isLoading3) {
     return <Loading />;
   }
  //console.log(users);
  //console.log(pgRunData);
  //console.log(receiveFuel);
    
  if(users){
    users?.forEach((user) => {
      // per user total fuel consumption calculation

      const pgRun = pgRunData?.filter((p) => p.pgRunnerEmail === user.email);
      const consume = pgRun?.map((c) => c.fuelConsume);
      const totalConsume = consume?.reduce(
        (previous, current) => previous + parseFloat(current),
        0
      );
      user.fuelConsume = totalConsume;

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
  }

  // Total issued fuel calculation
const FF = receiveFuel?.map(f=> f.fuelQuantity)
  const total = FF?.reduce(
    (previous, current) => previous + parseFloat(current),
    0
  );
  
  return (
    <div>
      <div className="overflow-x-auto">
        <table className=" table table-compact w-full border-collapse border border-slate-400">
          <thead>
            <tr className="  border-4  text-[#008080]">
              <th>S.NO</th>
              <th>Name</th>
              <th>Fuel Receive</th>
              <th>Fuel Consume</th>
              <th> Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <FuelBalanceRow key={u._id} index={index} u={u}></FuelBalanceRow>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-collapse border-2 border-[#F0D786]">
              <th></th>
              <th className=" font-bold text-[#008080]">Total Fuel Issued = </th>
              <th className="text-[#008080] text-xl font-bold">
                {total}
                <span className="stat-desc"> &nbsp;liter</span>
              </th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default FuelBalance;
