import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
    fetch(" http://localhost:5000/userList", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  const { data: rectifiers, isLoading3 } = useQuery(["rectifierList"], () =>
    fetch(" http://localhost:5000/rectifier", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  // console.log(services)
  if (isLoading || isLoading3) {
    return <Loading />;
  }

  const availableUser = users?.filter((u) => u.name !== user.displayName);

  const onSubmit = async (data) => {
    let mod = data.capacity;
    let consumeFuel = rectifiers?.filter((rec) => rec.capacity === mod);
    const consumePerModule = consumeFuel.map((ff) => ff.consumeFuel);
    // console.log(consumePerModule)

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
    
    const consume = parseFloat(timeValue * consumePerModule[0]).toFixed(2);

    const onCallerEmail = availableUser.filter(
      (x) => x.name === data.onCallName
    );

    const PgRunData = {
      site: data.siteName,
      date: data.date,
      moduleCapacity: data.capacity,
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
    fetch(" http://localhost:5000/pgRunData", {
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
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <Link
            to="/AllPgRunList"
            className="btn btn-outline btn-primary font-semiBold text-xl mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z"
                clipRule="evenodd"
              />
            </svg> &nbsp;
            BACK to All PG-Run List
          </Link>
          <h2 className="text-center text-2xl font-bold mb-3">
            Update PG Run Data!
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
                //defaultValue="9/21/22"
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
            {/*  Site Name */}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder=" Site Name"
                className="input input-bordered w-full max-w-xs"
                {...register("siteName", {
                  required: {
                    value: true,
                    message: " Site Name is required",
                  },
                })}
              />
              <label className="label">
                {errors.siteName?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.siteName.message}
                  </span>
                )}
              </label>
            </div>
            {/* Rectifier Module Capacity */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Rectifier Module Capacity:</span>
              </label>
              <select
                type="text"
                defaultValue="kw3"
                className="input input-bordered w-full max-w-xs"
                {...register("capacity", {
                  required: {
                    value: true,
                    message: " Module capacity is required",
                  },
                })}
              >
                {rectifiers?.map((recti) => (
                  <option value={recti.capacity}>{recti.capacity} </option>
                ))}
              </select>
              <label className="label">
                {errors.capacity?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.capacity.message}
                  </span>
                )}
              </label>
            </div>

            {/*  PG Start Time */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">PG Start Time:</span>
              </label>
              <input
                type="time"
                placeholder="startTime"
                className="input input-bordered w-full max-w-xs"
                {...register("startTime", {
                  required: {
                    value: true,
                    message: " Start Time is required",
                  },
                })}
              />
              <label className="label">
                {errors.startTime?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.startTime.message}
                  </span>
                )}
              </label>
            </div>

            {/*  PG Stop Time */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">PG Stop Time:</span>
              </label>
              <input
                type="time"
                placeholder="stopTime"
                className="input input-bordered w-full max-w-xs"
                {...register("stopTime", {
                  required: {
                    value: true,
                    message: " stop Time is required",
                  },
                })}
              />
              <label className="label">
                {errors.stopTime?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.stopTime.message}
                  </span>
                )}
              </label>
            </div>
            {/*  PG NO*/}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">PG No:</span>
              </label>
              <select
                type="text"
                placeholder="PG Number"
                className="input input-bordered w-full max-w-xs"
                {...register("pgNo", {
                  required: {
                    value: true,
                    message: " PG Number is required",
                  },
                })}
              >
                <option value="PG_09">PG_09</option>
                <option value="PG_17">PG_17</option>
                <option value="PG_40">PG_40</option>
                <option value="PG_48">PG_48</option>
                <option value="PG_57">PG_57</option>
                <option value="PG_61">PG_61</option>
                <option value="PG_70">PG_70</option>
                <option value="PG_72">PG_72</option>
                <option value="PG_89">PG_89</option>
                <option value="PG_98">PG_98</option>
              </select>
              <label className="label">
                {errors.pgNo?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.pgNo.message}
                  </span>
                )}
              </label>
            </div>
            {/*  On Call Engineer  Name */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">On Call Name:</span>
              </label>
              <select
                type="text"
                placeholder=" On Caller  Name"
                className="input input-bordered w-full max-w-xs"
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
              <label className="label">
                {errors.onCallName?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.onCallName.message}
                  </span>
                )}
              </label>
            </div>

            <input
              type="submit"
              className="btn btn-accent w-full max-w-xs m-2"
              value="Submit-Data"
              /*   <button className="btn btn-success">Success</button> */
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PgRunUpdate;
