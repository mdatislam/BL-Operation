import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const DashboardOncall = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleSidebar = () => {
        setIsChecked(!isChecked)
    }
    return (
        <div className="drawer drawer-mobile bg-slate-300">
            {!isChecked ? <input id="dashboardOnCall-drawer" type="checkbox" className="drawer-toggle" /> :
                <input id="dashboardOnCall-drawer" type="checkbox" checked={isChecked} className="drawer-toggle" />}
            <div className="drawer-content">
                <div className='tabs py-2  bg-green-600 px-2 rounded-lg tab-part'>
                    <NavLink to="/OnCall/AllPgRunList" className="tab  text-white  ">All Pg Run Record</NavLink>
                    <NavLink to="/OnCall/AllFuelList" className="tab  text-white ">All Received Fuel Record</NavLink>
                    <NavLink to="/OnCall/AllFuelListOnCall" className="tab  text-white ">All Received Fuel Record_OnCall</NavLink>
                </div>

                <div>
                    <Outlet />
                </div>

                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="dashboardOnCall-drawer" className="drawer-overlay "></label>
                <ul className="menu p-4  overflow-y-auto w-70  bg-[#106d3f] text-[#ffba24]">
                    {/* Sidebar content here */}
                    <li>
                        <NavLink to="/OnCall/PendingIssues">Pending Issues</NavLink >
                    </li>
                    {/* <li>
                        <NavLink to="/OnCall" onClick={handleSidebar}>OnCall Dashboard</NavLink >
                    </li> */}
                    <li>
                        <NavLink to="/OnCall/DgService" onClick={handleSidebar} > Required DG Service</NavLink >
                    </li>
                    <li>
                        <NavLink to="/OnCall/FcuService" onClick={handleSidebar} >Required FCU Service</NavLink >
                    </li>
                    <li>
                        <NavLink to="/OnCall/siteAllIssues" onClick={handleSidebar}>Record All Issue</NavLink >
                    </li>
                    <li>
                        <NavLink to="/OnCall/pgStatus" onClick={handleSidebar}>All PG Status</NavLink >
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default DashboardOncall;