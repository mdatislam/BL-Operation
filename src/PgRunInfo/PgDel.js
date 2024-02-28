import React from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";

const PgDel = ({ pgDel, setPgDel, refetch }) => {
  const [axiosSecure] = useAxiosSecure()
  const { pgNo } = pgDel;

  const handlePgDelete = (pgNo) => {
    //console.log(pgNo);
    const delExecutePg = async () => {
      const { data } = await axiosSecure.delete(`/pgList/${pgNo}`)
      if (data.deletedCount > 0) {
        toast.success(` ${pgNo} Delete done`);
      }
      setPgDel(null);
      refetch();

    }

    delExecutePg()
  };
  return (
    <div>
      <input type="checkbox" id="pgDel" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="pgDel"
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
              onClick={() => handlePgDelete(pgNo)}
            >
             Yes,delete it!
            </button>
            <label htmlFor="pgDel" className="btn btn-error">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgDel;
