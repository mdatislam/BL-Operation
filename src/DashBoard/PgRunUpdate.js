import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import Loading from "../Pages/SharedPage/Loading";

const PgRunUpdate = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { data: users, isLoading } = useQuery(["userList", user], () =>
    fetch("  https://enigmatic-eyrie-94440.herokuapp.com/userList").then(
      (res) => res.json()
    )
  );
  // console.log(services)
  if (isLoading) {
    return <Loading />;
  }

  const availableUser = users.filter((u) => u.name !== user.displayName);

  const onSubmit = (data) => {
    const pgStart = data.startTime;
    const pgStop = data.stopTime;
    let start = pgStart.split(":");
    let stop = pgStop.split(":");
    let startTime = new Date(0, 0, 0, start[0], start[1], 0);
    let stopTime = new Date(0, 0, 0, stop[0], stop[1], 0);
    let diff = stopTime.getTime() - startTime.getTime();
    // console.log(diff)
    const hours = Math.floor(diff / 3600000);
    //console.log(hours);
    diff = diff - hours * 1000 * 3600;
    const minutes = Math.floor(diff / 60000);
    //console.log(minutes);
    const duration = `${hours}:${minutes}`;

    const time = duration.split(":");
    const timeValue = parseInt(time[0], 10) + parseInt(time[1], 10) / 60;
    const consume = (timeValue * 3).toFixed(2);
    const onCallerEmail = availableUser.filter(
      (x) => x.name === data.onCallName
    );

    const PgRunData = {
      site: data.siteName,
      date: data.date,
      pgStartTime: pgStart,
      pgStoptTime: pgStop,
      pgRunDuration: duration,
      fuelConsume: consume,
      pgNo: data.pgNo,
      onCallName: data.onCallName,
      onCallEmail: onCallerEmail[0].email,
      pgRunnerName: user.displayName,
      pgRunnerEmail: user.email,
      status: "Pending",
    };
    //console.log(PgRunData);
    fetch("  https://enigmatic-eyrie-94440.herokuapp.com/pgRunData", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(PgRunData),
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
      .then((pgData) => {
        if (pgData.insertedId) {
          toast.success("Data Successfully Update");
        }
        reset();
        //console.log(pgData)
      });
  };

  return (
    <div className="flex  justify-center justify-items-center mt-8">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="text-center text-2xl font-bold mb-3">
            Update PG Run Data!
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Date input field */}

            <div class="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Date:</span>
              </label>
              <input
                type="date"
                placeholder="Date"
                class="input input-bordered w-full max-w-xs"
                {...register("date", {
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
            {/*  Site Name */}
            <div class="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder=" Site Name"
                class="input input-bordered w-full max-w-xs"
                {...register("siteName", {
                  required: {
                    value: true,
                    message: " Site Name is required",
                  },
                })}
              />
              <label class="label">
                {errors.siteName?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.siteName.message}
                  </span>
                )}
              </label>
            </div>

            {/*  PG Start Time */}
            <div class="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">PG Start Time:</span>
              </label>
              <input
                type="time"
                placeholder="startTime"
                class="input input-bordered w-full max-w-xs"
                {...register("startTime", {
                  required: {
                    value: true,
                    message: " Start Time is required",
                  },
                })}
              />
              <label class="label">
                {errors.startTime?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.startTime.message}
                  </span>
                )}
              </label>
            </div>

            {/*  PG Stop Time */}
            <div class="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">PG Stop Time:</span>
              </label>
              <input
                type="time"
                placeholder="stopTime"
                class="input input-bordered w-full max-w-xs"
                {...register("stopTime", {
                  required: {
                    value: true,
                    message: " stop Time is required",
                  },
                })}
              />
              <label class="label">
                {errors.stopTime?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.stopTime.message}
                  </span>
                )}
              </label>
            </div>
            {/*  PG NO*/}
            <div class="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder="PG Number"
                class="input input-bordered w-full max-w-xs"
                {...register("pgNo", {
                  required: {
                    value: true,
                    message: " PG Number is required",
                  },
                })}
              />
              <label class="label">
                {errors.pgNo?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.pgNo.message}
                  </span>
                )}
              </label>
            </div>
            {/*  On Call Engineer  Name */}
            <div class="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">On Call Name:</span>
              </label>
              <select
                type="text"
                placeholder=" On Caller  Name"
                class="input input-bordered w-full max-w-xs"
                {...register("onCallName", {
                  required: {
                    value: true,
                    message: " onCall Name is required",
                  },
                })}
              >
                {availableUser.map((user) => (
                  <option value={user.name}>{user.name} </option>
                ))}
              </select>
              <label class="label">
                {errors.onCallName?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.onCallName.message}
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

export default PgRunUpdate;
