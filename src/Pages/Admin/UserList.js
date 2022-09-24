import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserListRows from "./UserListRows";
import Loading from "../SharedPage/Loading";
import newUser from "../../images/NewUser.jpg";
import { Link } from "react-router-dom";
import RectifierInfo from "./RectifierInfo";

const UserList = () => {

 
  const { data: users, isLoading } = useQuery(["list"], () =>
    fetch("http://localhost:5000/userList", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="px-2 lg:px-16 my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <div className="overflow-x-auto mt-16 px-2">
          <div className="grid h-12 card bg-[#6495ED] rounded-box place-items-center mb-4">
            <h2 className="text-[#006400] card-title font-bold ">
              All User List
            </h2>
          </div>
          <table className="table-compact  w-96 mx-auto  ">
            <thead>
              <tr className="bg-[#ffcb24] border-2 border-[#ffcb45]">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((use) => (
                <UserListRows key={use._id} use={use}></UserListRows>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 gap-4 ">
          <div className="card w-full bg-base-100 shadow-xl mt-16">
            <figure className="px-10 pt-10">
              <img src={newUser} alt="PG Pic" className="rounded-xl" />
            </figure>
            <div className="card-body">
              <div className="stats bg-[#6495ED] text-primary-content">
                <div className="stat">
                  <div className="stat-title">To create</div>
                  <div className="stat-value">New user </div>

                  <div className="stat-actions">
                    <Link to="/Signup" className="btn btn-wide btn-warning">
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
                          d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                        />
                      </svg>{" "}
                      &nbsp; NEW USER
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <RectifierInfo />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default UserList;
