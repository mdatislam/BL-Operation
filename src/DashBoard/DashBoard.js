import React from 'react';
import {Link, Outlet } from 'react-router-dom';
import FuelBalance from './FuelBalance';


const DashBoard = () => {
  const subMenu = (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
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
      <div className="drawer drawer-mobile bg-slate-100 ">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/*    <!-- Page content here --> */}

          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto lg:w-70 sm:w-50 bg-[#020203] text-[#FFCB24]">
            {/*  <!-- Sidebar content here --> */}
            <li>
              <Link to="/Dashboard">
                {subMenu}
                PG Run Data
              </Link>
            </li>
            <li>
              <Link to="/Dashboard/FuelData">
                {" "}
                {subMenu} Received Fuel Record
              </Link>
            </li>
            <li>
              <Link to="/Dashboard/ApprovalPending">
                {" "}
                {subMenu}Approval Pending List
              </Link>
            </li>
            <li>
              <Link to="/Dashboard/PgRunUpdate">
                {" "}
                {subMenu}PG Run DataUpdate
              </Link>
            </li>
            <li>
              <Link to="/Dashboard/FuelUpdate">
                {" "}
                {subMenu}Received Fuel Update
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default DashBoard;