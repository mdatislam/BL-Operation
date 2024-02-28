import React from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";

const DeleteReceiveFuel = ({ delFuel, refetch, setDelFuel }) => {
  const [axiosSecure]=useAxiosSecure()
  const { _id } = delFuel;

  const handleDelete = (id) => {
    //console.log(id);
    axiosSecure.delete(`/receivedFuel/${id}`)
        .then((deleteRes) => {
        if (deleteRes.data.deletedCount > 0) {
          toast.success(" Delete successfully done ");
        }
        refetch();
        setDelFuel(null);

        // console.log(data)
      });
  };
  return (
    <div>
      <input type="checkbox" id="deleteFuel" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="deleteFuel"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="rounded-full-lg mb-4">
          <h3 className="font-bold text-center text-warning text-2xl">Warning!</h3>
          </div>
          
          <p className="py-4 text-center font-bold text-xl text-red-500">
            Are You Sure?
          </p>
          <p className=" text-center text-lg">
          You won't be able to revert this!
          </p>
          <div className="modal-action">
            <button onClick={() => handleDelete(_id)} className="btn btn-info">
            Yes,delete it!
            </button>
            <label htmlFor="deleteFuel" className="btn btn-error">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteReceiveFuel;
