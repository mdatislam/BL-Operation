import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import auth from "../firebase.init";
import useAdmin from "./../Pages/Hook/useAdmin";
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserCircleIcon,HandThumbUpIcon } from '@heroicons/react/24/solid';


const DashboardOncall = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
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
                    <li className="flex justify-end">
                        <div className="avatar">
                            {user?.photoURL ? <div className="w-24 rounded ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL} alt="pho" />
                            </div>
                                :
                                <h2 className="text-pink-400 ">{user?.displayName}</h2>
                            }
                        </div>
                    </li>
                    <div className="divider divider-secondary "></div>
                    <li>
                        <NavLink to="/OnCall/PendingIssues" onClick={handleSidebar} >Pending Issues</NavLink >
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

                    {admin && (
                        <li>
                            <NavLink to="/OnCall/UserList" onClick={handleSidebar}>
                                <UserCircleIcon className="h-6 w-6 text-[#106d3f]-500" />
                                Admin Items
                            </NavLink>
                        </li>
                    )}
                    {admin && (
                        <li>
                            <NavLink to="/OnCall/PerformanceInfo" onClick={handleSidebar}>
                            < HandThumbUpIcon className="h-6 w-6 text-[#106d3f]-500" />
                                PerformanceInfo
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DashboardOncall;