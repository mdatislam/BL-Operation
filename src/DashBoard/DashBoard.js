import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashBoard = () => {
    return (
        <div>
           <div className="drawer drawer-start">
  <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
 {/*    <!-- Page content here --> */}
   <Outlet/>
  </div> 
  <div className="drawer-side">
    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
     {/*  <!-- Sidebar content here --> */}
      {/* <li><Link to="/Dashboard/PgRunList">PG Run Data</Link></li> */}
      <li><Link to="/Dashboard/PgRunUpdate">PG Run DataUpdate</Link></li>
      
    </ul>
  </div>
</div>
        </div>
    );
};

export default DashBoard;