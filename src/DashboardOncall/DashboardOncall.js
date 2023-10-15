import React from 'react';
import {  NavLink, Outlet } from 'react-router-dom';

const DashboardOncall = () => {
    return (
        <div className="drawer drawer-mobile bg-slate-300">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Outlet />
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4  overflow-y-auto w-70  bg-[#106d3f] text-[#ffba24]">
                    {/* Sidebar content here */}
                    <li>
                        <NavLink to="/OnCall">OnCall Dashboard</NavLink >
                    </li>
                    <li>
                        <NavLink to="/OnCall/PendingIssues">Pending Issues</NavLink >
                    </li>
                    <li>
                        <NavLink to="/OnCall/DgService"> Required DG Service</NavLink >
                    </li>
                    <li>
                        <NavLink to="/OnCall/FcuService" >Required FCU Service</NavLink >
                    </li>
                    <li>
                        <NavLink to="/OnCall/siteAllIssues">Record All Issue</NavLink >
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default DashboardOncall;