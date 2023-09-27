import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Loading from "../SharedPage/Loading";

const useUserOut=()=>{
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    signOut(auth);
    localStorage.removeItem("accessToken");
    navigate("/Login");
 
  if (loading) { return <Loading /> }
}
export default useUserOut