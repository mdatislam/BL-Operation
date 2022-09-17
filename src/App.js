import NavBar from "./Pages/SharedPage/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import Nav1 from "./Nav1";
import About from "./Pages/HomePage/About";
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




function App() {
  return (
    <>
      <NavBar>
        <Routes>
          {/*  Public Route */}
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Signup" element={<SignUp />}></Route>
          <Route path="*" element={<NotFound />}></Route>

          {/*  private Route */}
          <Route element={<RequireAuth />}>
            <Route path="/Dashboard" element={<DashBoard />}>
              <Route index element={<PgRunList/> }/>
              <Route path="ApprovalPending" element={<ApprovalPending />} />
              <Route path="PgRunUpdate" element={<PgRunUpdate />} />
              <Route path="FuelUpdate" element={<FuelUpdate />} />
              <Route path="FuelData" element={<FuelDataList />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </NavBar>
      <ToastContainer />
    </>
  );
}

export default App;
