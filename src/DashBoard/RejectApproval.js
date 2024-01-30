import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";

const RejectApproval = ({ reject, setReject, refetch }) => {
  const [axiosSecure] = useAxiosSecure()
  const { _id } = reject;
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, id) => {
    const approveInfo = {
      status: "Reject",
      remark: data.rejectMsg
    }
    //console.log(id)
    axiosSecure.put(`/pgRunList/${_id}`, approveInfo)
      .then((approveData) => {
        // console.log(approveData);
        if (approveData.data.modifiedCount > 0) {
          toast.info(" Data has been Rejected");
          reset();
          setReject(null);
          refetch();
        }
      });


  };

  return (
    <div>
      <input type="checkbox" id="rejectApproval" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="rejectApproval"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <textarea
                placeholder="Please Put Here Rejection Comment! "
                className="input input-bordered w-full max-w-xs mx-2 "
                {...register("rejectMsg", {
                  required: {
                    value: true,
                    message: " Rejection Cause is required",
                  },
                })}
              />
              <label className="label">
                {errors.rejectMsg?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.rejectMsg.message}
                  </span>
                )}
              </label>

              <input
                type="submit"
                value="confirm"
                htmlFor="rejectApproval"
                className="btn btn-warning"
              /* onClick={() => handleReject(_id)} */
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RejectApproval;
