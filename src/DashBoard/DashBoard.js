import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../firebase.init";
import useAdmin from "./../Pages/Hook/useAdmin";
import { BeakerIcon, Bars3Icon, UserCircleIcon, BoltIcon } from '@heroicons/react/24/solid'

const DashBoard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const subMenu = (
    <>
      <Bars3Icon className="h-6 w-6 text-blue-500" />
    </>
  );
  return (
    <div className="drawer drawer-mobile  bg-slate-100 ">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/*    <!-- Page content here --> */}

        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4  overflow-y-auto w-70  bg-[#020203] text-[#FFCB24]">
          {/*  <!-- Sidebar content here --> */}
          {
            <li>
              <Link to="/Dashboard">
                {subMenu}
                Your PG Run List
              </Link>
            </li>
          }
          {!admin && (
            <li>
              <Link to="/Dashboard/FuelData">
                {subMenu}
                Received Fuel List
              </Link>
            </li>
          )}
          <li>
            <Link to="/Dashboard/DgServicingUpdate">
              {subMenu}
              DG Servicing Update
            </Link>
          </li>

          <li>
            <Link to="/Dashboard/ApprovalPending">
              {" "}
              {subMenu}Approval Pending List
            </Link>
          </li>
          <li>
            <Link to="/Dashboard/DgUseMaterial">
              {subMenu}
              Material Replace Update
            </Link>
          </li>

          <li>
            <Link to="/Dashboard/FcuFilterChange">
              {subMenu}
              FCU Filter Update
            </Link>
          </li>

          <li>
            <Link to="/Dashboard/PgRunUpdate"> {subMenu}PG Run Update</Link>
          </li>
          <li>
            <Link to="/Dashboard/FuelUpdate">
              <BeakerIcon className="h-6 w-6 text-blue-500" />
              Fuel Update
            </Link>
          </li>
          <li>
            <Link to="/Dashboard/EMDataUpdate">
              <BoltIcon className="h-6 w-6 text-blue-500" />
              Energy Meter Update
            </Link>
          </li>

          <li>
            <Link to="/Dashboard/DgRefuelingUpdate">
              <BeakerIcon className="h-6 w-6 text-blue-500" />
              DG Refueling Update
            </Link>
          </li>

          <li >
            <Link to="/Dashboard/fuelUpdateOnCall">
              <BeakerIcon className="h-6 w-6 text-blue-500" />
              Fuel Update_Oncall
            </Link>
          </li>
          {admin && (
            <li>
              <Link to="/Dashboard/UserList">
                <UserCircleIcon className="h-6 w-6 text-blue-500" />
                Admin Items
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
