import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";

const FcuFilterDel = ({ id, setDel, refetch }) => {
  const [axiosSecure]=useAxiosSecure()
  
  const handleFcuFilterDelete = (id) => {
    //console.log(id);
   if(id){
    axiosSecure.delete(`/fcu/${id}`)
   .then(delRes=>{
    //console.log(delRes.data)
    if(delRes.data.deletedCount>0){
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      setDel(null)
      refetch()
    }
   })
   }
  };
  return (
    <div>
      <input type="checkbox" id="Del" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="Del"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className=" text-center">

            <ExclamationCircleIcon className="w-16 h-16 text-warning absolute left-40 right-50 top-5 mb-8" />
            <div className="py-5 mt-2">
              <h1 className="font-semibold text-3xl text-blue-500 mt-8 px-12">
                Are you sure?
              </h1>
              <p className="text-xl">You won't be able to revert this!</p>
            </div>

          </div>
          <div className="modal-action modal-middle">
            <button
              className="btn btn-primary"
              onClick={() => handleFcuFilterDelete(id)}
            >
              {" "}
              Yes , Delete it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FcuFilterDel;
