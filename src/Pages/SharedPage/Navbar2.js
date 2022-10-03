import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const Navbar2 = () => {
  const { pathname } = useLocation();
  const [user] = useAuthState(auth);
  //console.log(user)
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    navigate("/Login");
  };
  const subMenu = (
    <>
      <ul className=" p-2 text-white rounded-box bg-[#adbfe6]">
        <li>
          <NavLink to="/DgServicing">
            DG SerVicing
            
          </NavLink>
        </li>
        <li>
          <NavLink to="">DG Refueling</NavLink>
        </li>
      </ul>
    </>
  );
  const large = (
    <>
      <li tabIndex={0}>
        <NavLink to="DgInfo" className="justify-between">
          DG-Info
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        </NavLink>
        {subMenu}
      </li>
    </>
  );
  
  const menuItem = (
    <>
      <li>
        <NavLink className="rounded-lg" to="/Home">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="rounded-lg" to="/Dashboard">
          Data-Update
        </NavLink>
      </li>
      <li>
        <NavLink className="rounded-lg" to="/PgFuel">
          PG-Fuel-Info
        </NavLink>
      </li>

      <li>
        <NavLink className="rounded-lg" to="/EmInfo">
          EM-Info
        </NavLink>
      </li>
    </>
  );
  const userStatus = (
    <>
      <li>
        {!user ? (
          <NavLink className="rounded-lg" to="/Login">
            Login
          </NavLink>
        ) : (
          <>
            <small>{user.displayName}</small>
            <button onClick={logout} className=" rounded-lg btn-outline">
              LogOut
            </button>
          </>
        )}
      </li>
    </>
  );
  return (
    <div className=" navbar sticky top-0  z-20 bg-[#ffcb24]  lg:px-20">
      <div className="navbar-start">
        {pathname.includes("Dashboard") && (
          <label
            htmlFor="dashboard-drawer"
            className="drawer-button  lg:hidden btn btn-primary"
          >
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
                d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
              />
            </svg>
          </label>
        )}
        <div className="flex-1 px-2 mx-2 font-bold text-2xl text-white">
          Rangpur O&amp;M
        </div>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu  menu-horizontal flex p-0">
          {menuItem} {large} {userStatus}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost  lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-56"
          >
            {menuItem}

            <div className="dropdown dropdown-left">
              <li tabIndex={0}>
                <NavLink to="DgInfo" className=" justify-start">
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
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>{" "}
                  DG-Info
                </NavLink>
              </li>
              <ul
                tabIndex={0}
                className="dropdown-content menu  p-2  rounded-box w-52"
              >
                {subMenu}
              </ul>
            </div>

            {userStatus}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
