import { useQuery } from "@tanstack/react-query";

import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "../Pages/SharedPage/Loading";

import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";




const FuelBalance = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  

  const {
    data: receiveFuel,
    isLoading,
   
  } = useQuery(["list", user], () =>
    fetch(`http://localhost:5000/fuelList?email=${user.email}`).then(
      (res) => res.json()
    )
  );


  if (isLoading) {
    return <Loading />;
  }
let arr=[]
  const totalFuel =receiveFuel.map((fuelValue, index) => {
      const x = parseFloat(fuelValue.fuelQuantity);
      arr.push(x)
    return x;
  });
    //console.log(totalFuel)
  const receivedFuel = totalFuel.reduce(
    (previous, current) => previous + parseFloat(current),
    0
  );

  
  return (
    <div>
      <h2 className="text-center">Total fuel:{parseFloat(receivedFuel)}</h2>
    </div>
  );
};

export default FuelBalance;
