import React, { useState } from "react";
import UserListRows from "./UserListRows";
//import newUser from "../../images/NewUser.jpg";
import { Link, } from "react-router-dom";
import RectifierInfo from "./RectifierInfo";
import ProfileChange from "./ProfileChange";
import { toast } from "react-toastify";
import useUserList from "../Hook/useUserList";
import { UserPlusIcon } from '@heroicons/react/24/solid'
import DeleteUser from "./DeleteUser";
import AddVehicle from "./AddVehicle";



const UserList = () => {
   const [userList] = useUserList()
  const [profile, setProfile] = useState(" ");
  const [delUser, setDelUser] = useState("")
 
  return (
    <div className="px-2 lg:px-4 my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 my-12">
        <div className="stats stats-vertical lg:stats-horizontal shadow bg-[#6495ED] text-primary-content">
          <div className="stat">
            <div className="stat-title">To create</div>
            <div className="stat-value">New user </div>

            <div className="stat-actions">
              <Link to="/Signup" className="btn  btn-warning">
                <UserPlusIcon className="h-6 w-6 text-white-500" />

                &nbsp; NEW USER
              </Link>
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">To Change Rate of</div>
            <div className="stat-value">Consume</div>
            <div className="stat-actions">
              <Link to="/RectifierUpdate" className="btn btn-secondary">
                Change-Rate
              </Link>
            </div>
          </div>
        </div>


        {/* site data & Pending pgRun Approval */}
        <div className="stats stats-vertical lg:stats-horizontal shadow bg-[#191b1f] text-primary-content mt-2">
          <div className="stat">
            <div className="stat-title">To show & Update </div>
            <div className="stat-value">Site Data </div>
            <div className="stat-actions">
              <Link
                to="/siteDataUpdate"
                className="btn btn-secondary mb-2"
              >
                Click Me
              </Link>
            </div>
          </div>

          <div className="divider lg:divider-horizontal"></div>

          <div className="stat">
            <div className="stat-title">
              Pg Run Approval Pending
            </div>
            <div className="stat-value">Record</div>
            <div className="stat-actions">
              <Link to="/PendingPgRun" className="btn btn-secondary mb-2">
                Go-List
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-16 px-2">
        <div className="grid h-10 card bg-[#6495ED] rounded-box place-items-center mb-4">
          <h2 className="text-[#FFFFFF] card-title font-bold ">
            All User List
          </h2>
        </div>
        <table className="table-compact  w-2/3 mx-auto  ">
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
            {userList?.map((use) => (
              <UserListRows
                key={use._id}
                use={use}
                setProfile={setProfile}
                setDelUser={setDelUser}
              ></UserListRows>
            ))}
          </tbody>
        </table>
      </div>

      {profile && <ProfileChange profile={profile} setProfile={setProfile} />}
      {delUser && <DeleteUser delUser={delUser} setDelUser={setDelUser} />}
      {/* Rectifier module consume Rate */}
      <div className=" card w-3/2 bg-base-100 shadow-xl my-5
       grid grid-cols-1 md:grid-cols-2 gap-x-4 px-2">
        <div>
          <RectifierInfo />
        </div>
        <div>
          <AddVehicle/>
        </div>
        
      </div>
    </div >
  );
};

export default UserList;
