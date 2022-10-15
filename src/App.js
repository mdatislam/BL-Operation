import NavBar from "./Pages/SharedPage/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import Footer from "./Pages/SharedPage/Footer";
import Login from "./Pages/AuthPage/Login";
import DashBoard from "./DashBoard/DashBoard";
import SignUp from "./Pages/AuthPage/SignUp";
import NotFound from "./Pages/SharedPage/NotFound";
import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import RequireAuth from './Pages/AuthPage/RequireAuth';
import { privateRoute } from "./Route/privateRoute";
import PgRunList from "./DashBoard/PgRunList";
import PgRunUpdate from "./DashBoard/PgRunUpdate";
import ApprovalPending from "./DashBoard/ApprovalPending";
import FuelUpdate from "./DashBoard/FuelUpdate";
import FuelDataList from "./DashBoard/FuelDataList";
import DG from "./Pages/DG-Info/DG";
import PgFuel from "./PgRunInfo/PgFuel";
import AllPgRunList from "./PgRunInfo/AllPgRunList";
import AllFuelList from "./PgRunInfo/AllFuelList";
import EMDataUpdate from "./DashBoard/EMDataUpdate";
import RequireAdmin from "./Pages/AuthPage/RequireAdmin";
import UserList from "./Pages/Admin/UserList";
import RectifierInfoUpdate from "./Pages/Admin/RectifierInfoUpdate";
import EminfoList from "./EnergyMeter/EminfoList";
import DGServicingUpdate from "./DashBoard/DGServicingUpdate";
import DgServicingInfo from "./Pages/DG-Info/DgServicingInfo";
import Navbar2 from "./Pages/SharedPage/Navbar2";
import DgRefuelingList from "./Pages/DG-Info/DgRefuelingList";
import DgRefuelingUpdate from "./DashBoard/DgRefuelingUpdate";
import ApprovalPendingList from "./PgRunInfo/ApprovalPendingList";
import AllRefuelingList from "./Pages/DG-Info/AllRefuelingList";




function App() {
  return (
    <>
      {/*  <NavBar> */}
      <Navbar2 />
      <Routes>
        {/*  Public Route */}
        {/*    <Route path="/" element={<Home />}></Route> */}

        <Route path="/Login" element={<Login />}></Route>
        {/*     <Route path="/Signup" element={<SignUp />}></Route> */}
        <Route path="*" element={<NotFound />}></Route>

        {/*  private Route */}
        <Route element={<RequireAuth />}>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Dashboard" element={<DashBoard />}>
            <Route index element={<PgRunList />} />
            <Route path="ApprovalPending" element={<ApprovalPending />} />
            <Route path="PgRunUpdate" element={<PgRunUpdate />} />
            <Route path="FuelUpdate" element={<FuelUpdate />} />
            <Route path="FuelData" element={<FuelDataList />} />
            <Route path="EMDataUpdate" element={<EMDataUpdate />} />
            <Route path="DgServicingUpdate" element={<DGServicingUpdate />} />
            <Route path="DgRefuelingUpdate" element={<DgRefuelingUpdate />} />
            {/*  <Route path="UserList" element={<RequireAdmin>
                <UserList/></RequireAdmin>}>
              </Route> */}

            <Route element={<RequireAdmin />}>
              <Route path="UserList" element={<UserList />} />
            </Route>
          </Route>
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/PgFuel" element={<PgFuel />} />
          <Route path="/AllPgRunList" element={<AllPgRunList />} />
          <Route path="/AllFuelList" element={<AllFuelList />} />
          <Route path="/DgInfo" element={<DG />} />
          <Route path="/DgServicing" element={<DgServicingInfo />} />
          <Route path="/DgRefueling" element={<DgRefuelingList />} />
          <Route path="/AllRefueling" element={<AllRefuelingList />} />

          <Route path="/EmInfo" element={<EminfoList />} />
        </Route>

        <Route element={<RequireAdmin />}>
          <Route path="/RectifierUpdate" element={<RectifierInfoUpdate />} />
          <Route path="/Signup" element={<SignUp />}></Route>
          <Route path="/PendingPgRun" element={<ApprovalPendingList />}/> 
        </Route>
      </Routes>
      <Footer />
      {/* </NavBar> */}
      <ToastContainer />
    </>
  );
}

export default App;
