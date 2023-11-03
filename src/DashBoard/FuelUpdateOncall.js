import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import useUserList from "../Pages/Hook/useUserList";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import Swal from "sweetalert2";

const FuelUpdateOncall = () => {
  const [user] = useAuthState(auth);
  const [userList] = useUserList()
  const [axiosSecure] = useAxiosSecure()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  /*  today find code */
  let date = new Date();
  date.setDate(date.getDate());
  let today = date.toLocaleDateString("en-CA");

  const availableUser = userList?.filter((u) => u.name !== user.displayName);

  const onSubmit = (data) => {
    setIsLoading(true)
    const receive = userList?.filter((x) => x.name === data.fuelReceiver);

    const fuelData = {
      date: data.date,
      slipNo: data.slipNo,
      fuelQuantity: data.fuel,
      fuelIssuer: user.displayName,
      fuelIssuerEmail: user.email,
      fuelReceiverName: data.fuelReceiver,
      fuelReceiverEmail: receive[0].email,
      remark: data.remark,
    };

    const updateFuel = async () => {
      const { data } = await axiosSecure.post("/fuelDataOncall", fuelData)
      if (data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Fuel Data has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        reset()
        setIsLoading(false)
      }
      else {
        toast.error(`Warning: ${data.msg}`);
      }

    }
    updateFuel()
  };

  return (
    <div className="flex  justify-center justify-items-center mt-8">
      <div className="card w-96 bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-center text-accent text-2xl font-bold mb-3">
            Update Issued Fuel Info!
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Date input field */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Date:</span>
              </label>
              <input
                type="date"
                placeholder="Date"
                defaultValue={today}
                className="input input-bordered w-full max-w-xs"
                {...register("date", {
                  required: {
                    value: true,
                    message: " Date is required",
                  },
                })}
              />
              <label className="label">
                {errors.date?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.date.message}
                  </span>
                )}
              </label>
            </div>
            {/*  Slip No */}
            <div className="form-control w-full max-w-xs">
              <input
                type="number"
                placeholder=" Fuel Slip No"
                className="input input-bordered w-full max-w-xs"
                {...register("slipNo", {
                  required: {
                    value: true,
                    message: " Slip No is required",
                  },
                })}
              />
              <label className="label">
                {errors.slipNo?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.slipNo.message}
                  </span>
                )}
              </label>
            </div>

            {/*  Fuel Quantity*/}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder="Fuel Quantity"
                className="input input-bordered w-full max-w-xs"
                {...register("fuel", {
                  required: {
                    value: true,
                    message: " Fuel Quantity required",
                  },
                })}
              />
              <label className="label">
                {errors.fuel?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.fuel.message}
                  </span>
                )}
              </label>
            </div>

            {/*  Fuel Receiver  Name */}
            <div className="form-control w-full max-w-xs">
              <select
                type="text"
                placeholder=" Fuel Issuer Name"
                className="input input-bordered w-full max-w-xs"
                {...register("fuelReceiver", {
                  required: {
                    value: true,
                    message: " Fuel Receiver Name required",
                  },
                })}
              >
                <option value="">
                  {" "}
                  -------- Select Fuel Receiver Name-------{" "}
                </option>
                {availableUser.map((user) => (
                  <option value={user.name}>{user.name} </option>
                ))}
              </select>
              <label className="label">
                {errors.fuelReceiver?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.fuelReceiver.message}
                  </span>
                )}
              </label>
            </div>
            {/* Remarks */}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder=" Write Remark if have"
                className="input input-bordered w-full max-w-xs"
                {...register("remark")}
              />
              <label className="label"></label>
            </div>

            <input
              type="submit"
              className={isLoading ? "btn btn-warning btn-wide loading  max-w-xs m-2"
                : "btn btn-accent  btn-wide max-w-xs m-2"}
              /* disabled={isLoading ? true:false} */
              value="Submit-Data"

            />

          </form>
        </div>
      </div>
    </div>
  );
};

export default FuelUpdateOncall;
