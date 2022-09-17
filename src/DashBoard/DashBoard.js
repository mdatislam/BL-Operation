import React from 'react';
import {Link, Outlet } from 'react-router-dom';
import FuelBalance from './FuelBalance';


const DashBoard = () => {
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
          <ul className="menu p-4 overflow-y-auto w-70 bg-pink-400 text-white">
            {/*  <!-- Sidebar content here --> */}
            <li>
              <Link to="/Dashboard">PG Run Data</Link>
            </li>
            <li>
              <Link to="/Dashboard/FuelData">Received Fuel Record</Link>
            </li>
            <li>
              <Link to="/Dashboard/ApprovalPending">Approval Pending List</Link>
            </li>
            <li>
              <Link to="/Dashboard/PgRunUpdate">PG Run DataUpdate</Link>
            </li>
            <li>
              <Link to="/Dashboard/FuelUpdate">Received Fuel Update</Link>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default DashBoard;