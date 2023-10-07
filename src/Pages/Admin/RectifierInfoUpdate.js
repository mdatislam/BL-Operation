import { signOut } from "firebase/auth";
import React from "react";
//import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import huawei from "../../images/Huawei.png";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { BackwardIcon } from "@heroicons/react/24/solid";

const RectifierInfoUpdate = () => {

  const [axiosSecure] = useAxiosSecure()
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const brand = data.brand;

    const RectifierInfo = {
      brand,
      capacity: data.capacity,
      consumeFuel: data.consume,
    };
    //console.log(PgRunData);
    axiosSecure.put(`/rectifier?brand=${brand}`, RectifierInfo)

      .then((rectifierData) => {
        console.log(rectifierData.data);
        if (rectifierData.data.upsertedCount || rectifierData.data.modifiedCount) {
          toast.success("Data Successfully Update");
        }
        reset();
        //console.log(pgData)
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <figure className=" hidden md:block px-10 pt-10">
          <img src={huawei} alt="PG Pic" className="rounded-xl" />
        </figure>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="flex justify-between">
              <button className="btn btn-accent btn-sm btn-outline">
                <Link to="/Dashboard/UserList"> <BackwardIcon className="w-6 h-6 text-blue-500" /></Link>
              </button>
              <h2 className="text-center text-pink-600 text-2xl font-bold mb-3">
                Add Rectifier Info !
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Brand input field */}

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Brand:</span>
                </label>
                <select
                  type="text"
                  placeholder="Put Rectifier Brand"
                  className="input input-bordered w-full max-w-xs"
                  {...register("brand", {
                    required: {
                      value: true,
                      message: " Brand is required",
                    },
                  })}
                >
                  <option >---Select Rectifier Brand----</option>
                  <option value="Huawei-3000"> Huawei-3000</option>
                  <option value="Huawei-400"> Huawei-4000</option>
                  <option value="ZTE-2000"> ZTE-2000</option>
                  <option value="ZTE-4000"> ZTE-4000</option>
                  <option value="Emerson-1800"> Emerson-1800</option>
                  <option value="DPC-2000"> DPC-2000</option>
                </select>

                <label className="label">
                  {errors.brand?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.date.message}
                    </span>
                  )}
                </label>
              </div>

              {/* Rectifier Module Capacity */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Module Capacity:</span>
                </label>
                <select
                  type="text"
                  placeholder="Put Module capacity"
                  className="input input-bordered w-full max-w-xs"
                  {...register("capacity", {
                    required: {
                      value: true,
                      message: " Module capacity is required",
                    },
                  })}
                >
                  <option >----Select Module capacity----</option>
                  <option value="1.8 KW"> 1.8 KW</option>
                  <option value="2 KW"> 2.0 KW</option>
                  <option value="3 KW"> 3.0 KW</option>
                  <option value="4 KW">4.0 KW</option>
                </select>
                <label className="label">
                  {errors.capacity?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.capacity.message}
                    </span>
                  )}
                </label>
              </div>
              {/* Consumption  */}

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Consumption:</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="any"
                  placeholder="Consumption per Module"
                  className="input input-bordered w-full max-w-xs"
                  {...register("consume", {
                    required: {
                      value: true,
                      message: " consumption value is required",
                    },
                  })}
                />
                <label className="label">
                  {errors.consume?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.date.message}
                    </span>
                  )}
                </label>
              </div>

              <input
                type="submit"
                className="btn btn-accent w-full max-w-xs m-2"
                value="Submit-Info"
              /*   <button className="btn btn-success">Success</button> */
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RectifierInfoUpdate;
