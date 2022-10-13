import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import Loading from "../Pages/SharedPage/Loading";

const FuelUpdate = () => {
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
  // console.log(services)
  if (isLoading) {
    return <Loading />;
  }

  const availableUser = users?.filter((u) => u.name !== user.displayName);

  const onSubmit = (data) => {
    const fuelIssuer = availableUser.filter((x) => x.name === data.fuelIssuer);
    const fuelData = {
      siteId: data.siteId,
      date: data.date,
      slipNo: data.slipNo,
      pgNo: data.pgNo,
      fuelQuantity: data.fuel,
      fuelIssuer: data.fuelIssuer,
      fuelIssuerEmail: fuelIssuer[0].email,
      fuelReceiverName: user.displayName,
      fuelReceiverEmail: user.email,
    };
    //console.log(PgRunData);
    fetch(" http://localhost:5000/fuelData", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(fuelData),
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
      .then((fuelData) => {
        if (fuelData.insertedId) {
          toast.success("Fuel Data Successfully Update");
        }
        reset();
        //console.log(pgData)
      });
  };
  return (
    <div className="flex  justify-center justify-items-center mt-8">
      <div className="card w-96 bg-base-100 shadow-2xl">
        <div className="card-body">
          <Link
            to="/AllFuelList"
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
            </svg>{" "}
            &nbsp; all Fuel List
          </Link>
          <h2 className="text-center text-secondary-focus text-2xl font-bold mb-3">
            Update Receive Fuel Info!
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
            {/*  Slip Name */}
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

            {/*  PG No */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">PG No:</span>
              </label>
              <select
                type="text"
                placeholder=" PG Number "
                className="input input-bordered w-full max-w-xs"
                {...register("pgNo", {
                  required: {
                    value: true,
                    message: " PG No Required",
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

            {/*  Site ID */}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder="Site ID"
                className="input input-bordered w-full max-w-xs"
                {...register("siteId", {
                  required: {
                    value: true,
                    message: " Site ID Required",
                  },
                })}
              />
              <label className="label">
                {errors.siteId?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.siteId.message}
                  </span>
                )}
              </label>
            </div>
            {/*  Fuel Quantity*/}
            <div className="form-control w-full max-w-xs">
              <input
                type="number"
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
            {/*  On Call Engineer  Name */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Fuel Issuer:</span>
              </label>
              <select
                type="text"
                placeholder=" Fuel Issuer Name"
                className="input input-bordered w-full max-w-xs"
                {...register("fuelIssuer", {
                  required: {
                    value: true,
                    message: " Fuel Issuer Name required",
                  },
                })}
              >
                {availableUser.map((user) => (
                  <option value={user.name}>{user.name} </option>
                ))}
              </select>
              <label className="label">
                {errors.fuelIssuer?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.fuelIssuer.message}
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

export default FuelUpdate;
