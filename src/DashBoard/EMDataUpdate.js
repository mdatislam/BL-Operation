import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import Loading from "../Pages/SharedPage/Loading";
import EnergyMeter from "./EnergyMeter";

const EMDataUpdate = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const date = new Date();
  date.setDate(date.getDate());
  const default1 = date.toLocaleDateString("en-CA");
  //console.log(default1);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  /*  const { data:sites, isLoading } = useQuery(["siteList"], () =>
    fetch(" https://enigmatic-eyrie-94440.herokuapp.com/emInfo", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  // console.log(services)
  if (isLoading) {
    return <Loading />;
  }
    let siteNo 
    let EmpreSnNo;
    let EmPreRead;
    
    sites.map(site => {
        let siteNo = site.siteId
        let EmpreSnNo = site.EmSerialNo
        let EmPreRead = site.EmReading;
})
 */

  const onSubmit = (data) => {
    console.log("click");
    const EMData = {
      siteId: data.siteId,
      date: data.date2,
      EmSerialNo: data.emNo,
      EmReading: data.emReading,
      //EmPreSerialNo: EmpreSnNo,
      //EmPreReading: EmPreRead,
      updaterName: user.displayName,
      updaterEmail: user.email,
    };
    //console.log(PgRunData);
    fetch(`https://enigmatic-eyrie-94440.herokuapp.com/emInfo/RAJ_X0244`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(EMData),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          toast.error("Unauthorize access");
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/Login");
        }
        return res.json();
      })
      .then((emData) => {
        if (emData.insertedId) {
          toast.success("EM Data Successfully Update");
        }
        //reset();
        //console.log(pgData)
      });
  };

  return (
    <div className="flex  justify-center justify-items-center mt-8">
      <div class="card w-96 bg-base-100 shadow-2xl">
        <div class="card-body">
          <h2 class="text-center text-secondary-focus text-2xl font-bold mb-3">
            Update Energy Meter Info
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Date input field */}

            <div class="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Date:</span>
              </label>
              <input
                type="date"
                disabled
                defaultValue={default1}
                class="input input-bordered w-full max-w-xs"
                {...register("date2", {
                  required: {
                    value: true,
                    message: " Date is required",
                  },
                })}
              />
              <label class="label">
                {errors.date?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.date.message}
                  </span>
                )}
              </label>
            </div>
            {/*  EM serial No */}
            <div class="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder=" Energy Meter Serial No"
                class="input input-bordered w-full max-w-xs"
                {...register("emNo", {
                  required: {
                    value: true,
                    message: " Energy Meter Serial No required",
                  },
                })}
              />
              <label class="label">
                {errors.emNo?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.emNo.message}
                  </span>
                )}
              </label>
            </div>

            {/*  Energy Meter Reading*/}
            <div class="form-control w-full max-w-xs">
              <input
                type="number"
                placeholder=" Energy Meter Reading "
                class="input input-bordered w-full max-w-xs"
                {...register("emReading", {
                  required: {
                    value: true,
                    message: " Energy Meter Reading Required",
                  },
                })}
              />
              <label class="label">
                {errors.emReading?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.emReading.message}
                  </span>
                )}
              </label>
            </div>

            {/*  Site ID */}
            <div class="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder="Site ID"
                class="input input-bordered w-full max-w-xs"
                {...register("siteId", {
                  required: {
                    value: true,
                    message: " Site ID Required",
                  },
                })}
              />
              <label class="label">
                {errors.siteId?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.siteId.message}
                  </span>
                )}
              </label>
            </div>
            {/*  Previous EM no */}
            <div class="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder="Previous EM No"
                defaultValue="123"
                class="input input-bordered w-full max-w-xs"
                {...register("preEmNo")}
              />
              <label class="label"></label>
            </div>

            {/*  Previous EM Reading */}
            <div class="form-control w-full max-w-xs">
              <input
                type="number"
                defaultValue="123"
                placeholder="Previous EM Reading"
                class="input input-bordered w-full max-w-xs"
                {...register("preEmReading")}
              />
            </div>
            {/*  Remarks */}
            {/* <div class="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Remarks:</span>
              </label>
              <textarea
                type="text"
                placeholder="If one More Reading found"
                class="input input-bordered w-full max-w-xs"
                {...register("remark")}
              ></textarea>
            </div> */}

            <input
              type="submit"
              class="btn btn-accent w-full max-w-xs m-2"
              value="Submit-Data"
              /*   <button class="btn btn-success">Success</button> */
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EMDataUpdate;
