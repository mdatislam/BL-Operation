import React from "react";
import { PencilSquareIcon, UserMinusIcon } from '@heroicons/react/24/solid'

const UserListRows = ({ use, setProfile, setDelUser }) => {
  const { name, email, role } = use;


  return (
    <tr className="border-2 border-[#ffcb24] hover">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>{name}</td>
      <td>{email} </td>
      <td>{role}</td>
      <td className="flex gap-x-2">
        <label className="btn btn-sm btn-outline"
          htmlFor="profileChange"
          onClick={() => setProfile(use)}>
          <PencilSquareIcon
            className="h-6 w-6 text-green-500"
          />
        </label>

        <label htmlFor="userDelete" className="btn btn-outline btn-warning btn-sm"
          onClick={() => setDelUser(use)}
        >
          <UserMinusIcon className="h-6 w-6 text-red-500" />
        </label>
      </td>
    </tr>
  );
};

export default UserListRows;
