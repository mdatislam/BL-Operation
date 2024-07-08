//import NavBar from "./Pages/SharedPage/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import Footer from "./Pages/SharedPage/Footer";
import Login from "./Pages/AuthPage/Login";
import DashBoard from "./DashBoard/DashBoard";
import SignUp from "./Pages/AuthPage/SignUp";
import NotFound from "./Pages/SharedPage/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from './Pages/AuthPage/RequireAuth';
//import { privateRoute } from "./Route/privateRoute";
import PgRunList from "./DashBoard/PgRunList";
import PgRunUpdate from "./DashBoard/PgRunUpdate";
import ApprovalPending from "./DashBoard/ApprovalPending";
import FuelUpdate from "./DashBoard/FuelUpdate";
import FuelDataList from "./DashBoard/FuelDataList";
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
import DgUseMaterial from "./DashBoard/DgUseMaterial";
import DgUseMaterialList from "./Pages/DG-Info/DgUseMaterialList";
import FcuMaintenanceList from "./FCU/FcuMaintenanceList";
import PgStatus from "./PgRunInfo/PgStatus";
import DgServicingPlan from "./Pages/DG-Info/DgServicingPlan";
import FetchExcelToJson from "./Pages/HomePage/FetchExcelToJson";
import DGAllServiceList from "./Pages/DG-Info/DGAllServiceList";
//import ProfilePic from "./Pages/SharedPage/ProfilePic";
import FuelUpdateOncall from './DashBoard/FuelUpdateOncall';
import AllFuelListOncall from "./PgRunInfo/AllFuelListOncall";
import SnagList from './Pages/SiteData/SnagList';
import SiteDataInfo from "./Pages/SiteData/SiteDataInfo";
import SiteDataHome from "./Pages/SiteData/SiteDataHome";
import ServiceMaterial from "./Pages/DG-Info/ServiceMaterial";
import FcuDataFromExcel from "./FCU/FcuDataFromExcel";
import FcuMaterial from './FCU/FcuMaterial';
import FcuAllDataRecord from './FCU/FcuAllDataRecord';
import Login2 from "./Pages/AuthPage/Login2";
import DashboardOncall from "./DashboardOncall/DashboardOncall";
import OnCallHomePage from "./DashboardOncall/OnCallHomePage";
import AddIssues from "./DashboardOncall/siteIssues/AddIssues";
import ViewAllIssue from "./DashboardOncall/siteIssues/ViewAllIssue";
import FcuUpdate from "./DashBoard/FcuUpdate";
import FcuServicePlanSites from "./DashboardOncall/FCU Service Plan/FcuServicePlanSites";
import OnCallPlanSite from "./DashboardOncall/DgServiceIssue/OnCallPlanSite";
import ViewIssues from "./DashboardOncall/siteIssues/ViewIssues";
import EmShortInfo from "./EnergyMeter/EmShortInfo";
import FcuDataFetchFromExcelFile from "./FCU/FcuDataFetchFromExcelFile";
import PerformanceInfo from "./DashboardOncall/perfomanceInfo/PerformanceInfo";
import PowerShutDown from "./DashboardOncall/powerShutDown/PowerShutDown";
import PowerShutDownDashBoard from "./DashboardOncall/powerShutDown/PowerShutDownDashBoard";
import BTSLockFileUploaded from "./DashboardOncall/powerShutDown/BTSLockFIleUploaded";
import ThanaWisePowerAlarm from "./DashboardOncall/powerShutDown/ThanaWisePowerAlarm";
import ThanaWiseDown from "./DashboardOncall/powerShutDown/ThanaWiseDown";
import SpareAdd from "./DashboardOncall/sparePart/SpareAdd";
import NewSpareRecord from "./DashboardOncall/sparePart/NewSpareRecord";
import AddOwnSpare from "./DashboardOncall/sparePart/AddOwnSpare";
import SpareHome from "./DashboardOncall/sparePart/SpareHome";
import OwnSpareRecord from "./DashboardOncall/sparePart/OwnSpareRecord";
import ReturnSpareRecord from "./DashboardOncall/sparePart/ReturnSpareRecord";








function App() {
  const location = useLocation()
  //console.log(location.pathname)
  return (
    <>
      {/*  <NavBar> */}
      { location.pathname.includes("Login") || <Navbar2 />}
      <Routes>
        {/*  <Route path="/Login" element={<Login />}></Route> */}
        <Route path="/Login" element={<Login2 />}></Route>
        {/*  private Route */}
        <Route element={<RequireAuth />}>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Dashboard" element={<DashBoard />}>
            <Route index element={<PgRunList />} />
            <Route path="ApprovalPending" element={<ApprovalPending />} />
            <Route path="PgRunUpdate" element={<PgRunUpdate />} />
            <Route path="FuelUpdate" element={<FuelUpdate />} />
            <Route path="FcuServiceUpdate" element={<FcuUpdate />} />
            <Route path="FuelUpdateOnCall" element={<FuelUpdateOncall />} />
            <Route path="FuelData" element={<FuelDataList />} />
            <Route path="EMDataUpdate" element={<EMDataUpdate />} />
            <Route path="DgServicingUpdate" element={<DGServicingUpdate />} />
            <Route path="DgRefuelingUpdate" element={<DgRefuelingUpdate />} />
            <Route path="DgUseMaterial" element={<DgUseMaterial />} />
            
            {/* <Route element={<RequireAdmin />}>
              <Route path="UserList" element={<UserList />} />
              <Route path="PerformanceInfo" element={<PerformanceInfo/>} />
            </Route> */}
          </Route>
          {/* on call Dashboard components start */}
          <Route path="OnCall" element={<DashboardOncall />}>
            <Route index element={<OnCallHomePage />}></Route>
          {/*   <Route path="" element={<FuelBalanceInfo />}></Route> */}
            <Route path="AllPgRunList" element={<AllPgRunList />} />
            <Route path="AllFuelList" element={<AllFuelList />} />
            <Route path="AllFuelListOncall" element={<AllFuelListOncall />} />
            <Route path="FcuService" element={<FcuServicePlanSites />} />
            <Route path="DgService" element={<OnCallPlanSite />} />
            <Route path="AddIssues" element={<AddIssues />} />
            <Route path="PendingIssues" element={<ViewIssues />} />
            <Route path="siteAllIssues" element={<ViewAllIssue />} />
            <Route path="pgStatus" element={<PgStatus />} />
              <Route path="PowerShutDown" element={<PowerShutDown/>} />
              <Route path="LockRequest" element={<BTSLockFileUploaded/>} />
             
            <Route element={<RequireAdmin />}>
              <Route path="UserList" element={<UserList />} />
              <Route path="PerformanceInfo" element={<PerformanceInfo/>} />
            </Route>

          </Route>
          {/* on call Dashboard components End */}
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/PgFuel" element={<PgFuel />} />
          <Route path="/DgMaterial" element={<DgUseMaterialList />} />
          <Route path="/DgServicing" element={<DgServicingInfo />} />
          <Route path="/DgAllServicing" element={<DGAllServiceList />} />
          <Route path="/DgPlanServicing" element={<DgServicingPlan />} />
          <Route path="/DgRefueling" element={<DgRefuelingList />} />
          <Route path="/AllRefueling" element={<AllRefuelingList />} />
          <Route path="/FcuMaintenance" element={<FcuMaintenanceList />} />
          <Route path="/FcuDataUpload" element={<FcuDataFromExcel />} />
          <Route path="/FcuDataFetch" element={<FcuDataFetchFromExcelFile/>} />
          <Route path="/FcuAllData" element={<FcuAllDataRecord />} />
          <Route path="/EmInfo/Detail" element={<EminfoList />} />
          <Route path="/EmInfo" element={<EmShortInfo />} />
          <Route path="/fcuMaterial" element={<FcuMaterial />} />
          <Route path="/PgStatus" element={<PgStatus />} />
          <Route path="/siteDataHome" element={<SiteDataHome />} />
          <Route path="/siteDataInfo" element={<SiteDataInfo />} />
          <Route path="/snagList" element={<SnagList />} />
          <Route path="/dashboardPowerShutDown" element={<PowerShutDownDashBoard/>} />
          <Route path="/thanaWisePowerAlarm" element={<ThanaWisePowerAlarm/>} />
          <Route path="/thanaWiseDown" element={<ThanaWiseDown/>} />
          <Route path="/NewSpareCollectRecord" element={<NewSpareRecord/>} />
          <Route path="/OnCall/NewSpareAdd" element={<SpareAdd/>} />
          <Route path="/OnCall/AddOwnSpare" element={<AddOwnSpare/>} />
          <Route path="/OnCall/SpareHome" element={<SpareHome/>} />
          <Route path="/OwnSpareRecord" element={<OwnSpareRecord/>} />
          <Route path="/ReturnSpareRecord" element={<ReturnSpareRecord/>} />

        </Route>

        <Route element={<RequireAdmin />}>
          <Route path="/RectifierUpdate" element={<RectifierInfoUpdate />} />
          <Route path="/Signup" element={<SignUp />}></Route>
          <Route path="/PendingPgRun" element={<ApprovalPendingList />} />
          <Route path="/ServiceMaterial" element={<ServiceMaterial />} />

          <Route path="/siteDataUpdate" element={<FetchExcelToJson />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
      {/* </NavBar> */}
      <ToastContainer />
    </>
  );
}

export default App;
