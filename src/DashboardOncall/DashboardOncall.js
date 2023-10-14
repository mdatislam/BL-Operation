import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const DashboardOncall = () => {
    return (
        <div className="drawer drawer-mobile bg-slate-100">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Outlet />
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4  overflow-y-auto w-70  bg-[#3f3f6d] text-[#ffba24]">
                    {/* Sidebar content here */}
                    <li>
                        <NavLink to="/OnCall"> OnCall Dashboard</NavLink >
                    </li>
                    <li>
                        <NavLink to="/OnCall/siteAllIssues">Record All Issue</NavLink >
                    </li>
                    <li>
                        <NavLink  to="/OnCall/FcuService" >Required FCU Service</NavLink >
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default DashboardOncall;