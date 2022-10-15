import { signOut } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import mobileTower1 from "../../images/Mobile Tower2.jpg";

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

  const dgSubMenu = (
    <div className="dropdown dropdown-hover">
      <li tabIndex={0}>
        <p to="" className="justify-between">
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
        </p>
      </li>
      <ul
        tabIndex={0}
        className=" p-2 shadow menu menu-compact dropdown-content bg-[#98b1e6] rounded-box w-52"
      >
        <li>
          <NavLink to="/DgServicing">DG SerVicing</NavLink>
        </li>
        <li>
          <NavLink to="DgRefueling">Latest DG Refueling</NavLink>
        </li>
        <li>
          <NavLink to="DgInfo">DG Materials</NavLink>
        </li>
      </ul>
    </div>
  );
  /* Profile */
  const userStatus = (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-48 rounded-full">
          <img src={mobileTower1} alt="tower"/>
          Profile
        </div>
      </label>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-compact dropdown-content  bg-base-100 rounded-box"
      >
        <li>
          {!user ? (
            <NavLink className="rounded-lg" to="/Login">
              Login
            </NavLink>
          ) : (
            <>
              <li>{user.displayName}</li>
              <li>
                <button onClick={logout} className=" rounded-lg btn-outline">
                  LogOut
                </button>
              </li>
            </>
          )}
        </li>
      </ul>
    </div>
  );

  /*Profile end  */




  
  return (
    <div className=" navbar  sticky top-0  z-20 bg-[#ffcb24]  lg:px-20">
      <div className="navbar-end ">
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
      <div className="navbar-start hidden lg:flex">
        <ul className="menu  menu-horizontal  p-0">
          {menuItem}
          {dgSubMenu}
        </ul>
      </div>

      {userStatus}
      {/* For mobile device */}
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-56"
          >
            {menuItem}

            {dgSubMenu}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
