import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//import auth from "../firebase.init";



const RectifierInfo = () => {
 //const [user] = useAuthState(auth);
  const navigate = useNavigate(); 
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  
    const onSubmit = (data) => {
    
        const consumeValue = {
            value: "consume",
            kw4:data.KW4,
            kw3:data.KW3,
            kw2:data.KW2,
            kw18:data.KW18,
        };
  

        fetch(
          `http://localhost:5000/rectifierModule/capacity?value=consume`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(consumeValue),
          }
        )
          .then((res) => {
            if (res.status === 401 || res.status === 403) {
              toast.error("Unauthorize access");
              //signOut(auth);
              localStorage.removeItem("accessToken");
              navigate("/Login");
            }
            return res.json();
          })
            .then((consumeData) => {
              console.log(consumeData)
            if (consumeData.modifiedCount) {
              toast.success("Data Successfully Update");
            }
            reset();
            //console.log(pgData)
          });
    }
    return (
      <div className="flex  justify-center justify-items-center mt-8">
        <div class="card w-96 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="text-center text-2xl font-bold mb-3">
              Update Fuel consumption As Per Capacity of Rectifier Module!
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Date input field */}
              <div class="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">4-KW:</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="any"
                  placeholder="Consumption of 4 KW"
                  class="input input-bordered w-full max-w-xs"
                  {...register("KW4", {
                    required: {
                      value: true,
                      message: " consumption value is required",
                    },
                  })}
                />
                <label class="label">
                  {errors.KW4?.type === "required" && (
                    <span class="label-text-alt text-red-500">
                      {errors.date.message}
                    </span>
                  )}
                </label>
              </div>
              
            {  /*For 2KW consumption */}
              <div class="form-control w-full max-w-xs">
                
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="any"
                  placeholder="Consumption of 3 KW"
                  class="input input-bordered w-full max-w-xs"
                  {...register("KW3", {
                    required: {
                      value: true,
                      message: " consumption value is required",
                    },
                  })}
                />
                <label class="label">
                  {errors.KW3?.type === "required" && (
                    <span class="label-text-alt text-red-500">
                      {errors.date.message}
                    </span>
                  )}
                </label>
              </div>
              {/*  For 2KW consumption */}
              <div class="form-control w-full max-w-xs">
                
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="any"
                  placeholder="Consumption of 2 KW"
                  class="input input-bordered w-full max-w-xs"
                  {...register("KW2", {
                    required: {
                      value: true,
                      message: " consumption value is required",
                    },
                  })}
                />
                <label class="label">
                  {errors.KW2?.type === "required" && (
                    <span class="label-text-alt text-red-500">
                      {errors.date.message}
                    </span>
                  )}
                </label>
              </div>
              {/* for 1.8KW consumption */}
              <div class="form-control w-full max-w-xs">
                
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="any"
                  placeholder="Consumption of 1.8 KW"
                  class="input input-bordered w-full max-w-xs"
                  {...register("KW18", {
                    required: {
                      value: true,
                      message: " consumption value is required",
                    },
                  })}
                />
                <label class="label">
                  {errors.KW18?.type === "required" && (
                    <span class="label-text-alt text-red-500">
                      {errors.date.message}
                    </span>
                  )}
                </label>
              </div>
              <input
                type="submit"
                class="btn btn-accent w-full max-w-xs m-2"
                value="Update-Data"
                /*   <button class="btn btn-success">Success</button> */
              />
            </form>
          </div>
        </div>
      </div>
    );
};

export default RectifierInfo;