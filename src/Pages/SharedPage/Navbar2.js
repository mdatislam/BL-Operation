import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "./Loading";
import { BeakerIcon, Bars3Icon, ArrowRightOnRectangleIcon, Bars2Icon, HomeModernIcon } from '@heroicons/react/24/solid'
//import ProfilePic from "./ProfilePic";

const Navbar2 = () => {
  const [user, loading] = useAuthState(auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    navigate("/Login");
  };
  if (loading) { return <Loading /> }
  const menuItem = (
    <>
      <li>
        <NavLink className=" btn btn-ghost rounded-lg" to="/Dashboard">
          Data-Update
        </NavLink>
      </li>
      <li>
        <NavLink className=" btn btn-ghost rounded-lg" to="/PgFuel">
          PG-Fuel-Info
        </NavLink>
      </li>

      <li>
        <NavLink className=" btn btn-ghost rounded-lg" to="/EmInfo">
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
        className=" p-2 shadow menu menu-compact dropdown-content bg-[#eceef3] rounded-box w-52"
      >
        <li>
          <NavLink className=" btn btn-ghost rounded-lg" to="/DgServicing">DG SerVicing</NavLink>
        </li>
        <li>
          <NavLink to="DgRefueling">Latest DG Refueling</NavLink>
        </li>
        <li>
          <NavLink to="DgMaterial">DG Materials</NavLink>
        </li>
        <li>
          <NavLink to="AllRefueling">
            <BeakerIcon className="h-6 w-6 text-blue-500" />
            All Refueling
          </NavLink>
        </li>
      </ul>
    </div>
  );

  return (
    <div className=" navbar  sticky top-0  z-20 bg-[#ffcb24]  text-lg lg:px-4">
      <div className="navbar-end  ">
        {/* <div className=" flex-1 px-2 mx-2 font-bold text-2xl text-white">
          <h3 className="md:hidden"> Rangpur O&amp;M</h3>
        </div> */}
        

        <ul className="menu  menu-horizontal ms-2">
        <li>
            <NavLink className=" btn btn-ghost rounded-lg" to="/OnCall">
              Oncall
            </NavLink>
          </li>
          <li>
            <NavLink className=" btn btn-ghost rounded-lg" to="/Home">
              Home
            </NavLink>
          </li>
                  </ul>
        {pathname.includes("Dashboard") && (
          <label
            htmlFor="dashboard-drawer"
            className="drawer-button  lg:hidden btn-info rounded-lg p-2 "
          >
            <Bars3Icon className="h-6 w-6 text-red-500" />

          </label>
        )}
      </div>
      {/* For large screen */}
      <div className="navbar-start w-full hidden lg:flex justify-around">
        <ul className="menu  menu-horizontal ">
          {menuItem}
          {dgSubMenu}
        </ul>
      </div>

      <div className="navbar-end">
        <ul className="menu px-2 menu-horizontal  ">
          
            {!user ? (
              <NavLink className=" btn btn-ghost rounded-lg" to="/Login">
                Login
              </NavLink>
            ) : (
              <div className="rounded-lg" onClick={logout}>
                <div className="avatar">
                  {user.photoURL ? <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user.photoURL} alt="pho" />
                  </div>
                    :
                    <h2 className="text-pink-400 font-bold">{user.displayName}</h2>
                  }
                </div>
                <button className=" rounded-lg">
                  <ArrowRightOnRectangleIcon className="h-6 w-6 text-blue-500" />
                </button>


              </div>

            )}
            {pathname.includes("OnCall") &&
            <li>
              <label htmlFor="my-drawer" className="mt-5 drawer-button lg:hidden btn btn-link">
                <HomeModernIcon className="  w-8 h-8 text-blue-500 " />
              </label>
            </li>}
          <li>
          </li>
        </ul>
      </div>
      {/*  <ProfilePic/> */}
      {/* For mobile device */}
      {/* <div className="navbar-end">
        <div className="dropdown dropdown-end ms-2">
          <label tabIndex={0} className="btn btn-ghost  lg:hidden">
            <Bars3Icon className="h-6 w-6 text-red-500" />
          </label>

          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-56"
          >
            {menuItem}
            <div className="collapse collapse-arrow border border-base-300 bg-blue-300 rounded-box">
              <input type="checkbox" className="peer" />
              <div className="collapse-title">
                DG Part
              </div>
              <div className="collapse-content bg-base-100 text-primary-content peer-checked:bg-base-100 peer-checked:text-black rounded-lg">
                <li>
                  <NavLink to="/DgServicing">DG SerVicing</NavLink>
                </li>
                <li>
                  <NavLink to="DgRefueling">Latest DG Refueling</NavLink>
                </li>
                <li>
                  <NavLink to="DgMaterial">DG Materials</NavLink>
                </li>
                <li>
                  <NavLink to="AllRefueling">

                    All Refueling
                  </NavLink>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar2;
