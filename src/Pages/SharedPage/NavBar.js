import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import auth from "./../../firebase.init";

const NavBar = ({ children }) => {
  const [user] = useAuthState(auth);
  //console.log(user)
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth);
    navigate("/About");
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
        <NavLink className="rounded-lg" to="/About">
          About
        </NavLink>
      </li>
      <li>
        {!user ? (
          <NavLink className="rounded-lg" to="/Login">
            Login
          </NavLink>
        ) : (
          <>
            <button onClick={logout} className="btn rounded-lg btn-outline">
              LogOut
            </button>
            <small>{user.displayName}</small>
          </>
        )}
      </li>
    </>
  );
  return (
    <>
      <div class="drawer drawer-end">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
          {/*  <!-- Navbar --> */}
          <div class="w-full navbar fixed z-20 bg-[#ffcb24] lg:px-20">
            <div class="flex-1 px-2 mx-2 font-bold text-2xl text-white">
              Rangpur O&amp;M
            </div>
            <div class="flex-none hidden lg:block">
              <ul class="menu menu-horizontal px-5 gap-x-4">
                {/*  <!-- Navbar menu content here --> */}

                {menuItem}
              </ul>
            </div>
            <div class="flex-none lg:hidden">
              <label for="my-drawer-3" class="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          </div>
          {/*  <!-- Page content here --> */}
          <div className="mt-16">{children}</div>
        </div>
        <div class="drawer-side">
          <label for="my-drawer-3" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
            {/* <!-- Sidebar content here --> */}
            {menuItem}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
