import React from 'react';
import {Link, NavLink, Outlet } from 'react-router-dom';


const DashBoard = () => {
    return (
      <div className="drawer drawer-mobile bg-slate-400 ">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/*    <!-- Page content here --> */}
          <Outlet/>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            {/*  <!-- Sidebar content here --> */}
            <li>
              <Link to="/Dashboard">PG Run Data</Link>
            </li>
            <li>
              <Link to="/Dashboard/PgRunUpdate">PG Run DataUpdate</Link>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default DashBoard;