import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import Loading from "../Pages/SharedPage/Loading";

const EMDataUpdate = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  /*  const [preEmNo, setPreEmNo]= useState("")
  const [preReading, setPreReading]= useState("")
    */
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { data: sites, isLoading } = useQuery(["siteList"], () =>
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
  //console.log(preEmNo)

  const onSubmit = (data) => {
    console.log(" click me");
    const siteID = data.siteId;
    const presentSite = sites.filter((site) => site.siteId === siteID);
    //console.log(presentSite)

    const EmPreReading = presentSite.map((s) => s.EmReading);
    const EmPreSerialNo = presentSite.map((s) => s.EmSerialNo);
    const PreDate = presentSite.map((s) => s.date);
    // console.log(EmPreReading[0])

    /* const date = new Date();
    date.setDate(date.getDate());
    const default1 = date.toLocaleDateString("en-CA");  */

    const EMData = {
      siteId: siteID,
      date: data.date2,
      EmSerialNo: data.emNo,
      EmReading: data.emReading,
      preDate: PreDate[0],
      EmPreSerialNo: EmPreSerialNo[0],
      EmPreReading: EmPreReading[0],
      updaterName: user.displayName,
      updaterEmail: user.email,
    };

    fetch(`https://enigmatic-eyrie-94440.herokuapp.com/emInfo/${siteID}`, {
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
        console.log(emData);
        if (emData.upsertedCount || emData.modifiedCount) {
          toast.success("Data Successfully Update");
        }
        reset();
        //console.log(pgData)
      });
  };

  return (
    <div className="flex justify-center justify-items-center mt-8">
      <div class="card  lg:w-96 bg-base-100 shadow-2xl">
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
                //defaultValue={default1}
                // disabled
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
