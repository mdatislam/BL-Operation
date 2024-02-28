import React from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hook/useAxiosSecure";

const LubOilDel = ({ lubOilDel, setLubOilDel, refetch }) => {
  const [axiosSecure] = useAxiosSecure()
  const { _id } = lubOilDel;
  const handlelubOilDelete = (id) => {
    // console.log(id);
    const lubOilDelete = async () => {
      const { data } = await axiosSecure.delete(`/lubOilList/${id}`)
      if (data.deletedCount > 0) {
        toast.success(` ${id} Delete done`);
      }
      refetch();
      setLubOilDel(null);
    }
lubOilDelete()
  };
  return (
    <div>
      <input type="checkbox" id="lubOilDel" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="lubOilDel"
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
            <button
              className="btn btn-outline btn-info"
              onClick={() => handlelubOilDelete(_id)}
            >
              Yes,delete it!
            </button>
            <label htmlFor="lubOilDel" className="btn btn-error">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LubOilDel;
