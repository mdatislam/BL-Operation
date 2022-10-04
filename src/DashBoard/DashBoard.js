import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../firebase.init";
import FuelBalance from "./FuelBalance";
import useAdmin from "./../Pages/Hook/useAdmin";

const DashBoard = () => {
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const subMenu = (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
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
          <li>
            <Link to="/Dashboard">
              {subMenu}
              Your PG Run List
            </Link>
          </li>
          <li>
            <Link to="/Dashboard/FuelData">
              {subMenu}
              Received Fuel List
            </Link>
          </li>
          <li>
            <Link to="/Dashboard/ApprovalPending">
              {" "}
              {subMenu}Approval Pending List
            </Link>
          </li>
          <li>
            <Link to="/Dashboard/PgRunUpdate"> {subMenu}PG Run Update</Link>
          </li>
          <li>
            <Link to="/Dashboard/FuelUpdate"> {subMenu}Fuel Update</Link>
          </li>
          <li>
            <Link to="/Dashboard/EMDataUpdate">
              {" "}
              {subMenu}Energy Meter Update
            </Link>
          </li>
          <li>
            <Link to="/Dashboard/DgServicingUpdate">
              {" "}
              {subMenu}DG Servicing Update 
            </Link>
          </li>
          <li>
            <Link to="/Dashboard/DgRefuelingUpdate">
              {" "}
              {subMenu}DG Refueling Update
            </Link>
          </li>
          {admin && (
            <li>
              <Link to="/Dashboard/UserList">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
                User List
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
