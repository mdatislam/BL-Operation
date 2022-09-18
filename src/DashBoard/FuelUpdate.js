import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import Loading from "../Pages/SharedPage/Loading";

const FuelUpdate = () => {
  const [user] = useAuthState(auth);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { data: users, isLoading } = useQuery(["userList", user], () =>
    fetch("https://enigmatic-eyrie-94440.herokuapp.com/userList").then((res) =>
      res.json()
    )
  );
  // console.log(services)
  if (isLoading) {
    return <Loading />;
  }

  const availableUser = users.filter((u) => u.name !== user.displayName);

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
    fetch("https://enigmatic-eyrie-94440.herokuapp.com/fuelData", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(fuelData),
    })
      .then((res) => res.json())
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
      <div class="card w-96 bg-base-100 shadow-2xl">
        <div class="card-body">
          <h2 class="text-center text-secondary-focus text-2xl font-bold mb-3">
            Update Receive Fuel Info!
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
            {/*  Slip Name */}
            <div class="form-control w-full max-w-xs">
              <input
                type="number"
                placeholder=" Fuel Slip No"
                class="input input-bordered w-full max-w-xs"
                {...register("slipNo", {
                  required: {
                    value: true,
                    message: " Slip No is required",
                  },
                })}
              />
              <label class="label">
                {errors.slipNo?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.slipNo.message}
                  </span>
                )}
              </label>
            </div>

            {/*  PG No */}
            <div class="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder=" PG Number "
                class="input input-bordered w-full max-w-xs"
                {...register("pgNo", {
                  required: {
                    value: true,
                    message: " PG No Required",
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
            {/*  Fuel Quantity*/}
            <div class="form-control w-full max-w-xs">
              <input
                type="number"
                placeholder="Fuel Quantity"
                class="input input-bordered w-full max-w-xs"
                {...register("fuel", {
                  required: {
                    value: true,
                    message: " Fuel Quantity required",
                  },
                })}
              />
              <label class="label">
                {errors.fuel?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.fuel.message}
                  </span>
                )}
              </label>
            </div>
            {/*  On Call Engineer  Name */}
            <div class="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Fuel Issuer:</span>
              </label>
              <select
                type="text"
                placeholder=" Fuel Issuer Name"
                class="input input-bordered w-full max-w-xs"
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
              <label class="label">
                {errors.fuelIssuer?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.fuelIssuer.message}
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

export default FuelUpdate;
