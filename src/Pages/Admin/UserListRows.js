import React from "react";

const UserListRows = ({ use}) => {
  const { name, email, role } = use;

  return (
    <tr className="border-2 border-[#ffcb24]">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>{name}</td>
      <td>{email} </td>
      <td>{role}</td>
      <td>
        <button className="btn btn-outline">Change Role</button>
      </td>
    </tr>
  );
};

export default UserListRows;
