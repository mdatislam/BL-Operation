import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "./../firebase.init";
import { signOut } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Pages/SharedPage/Loading";
import FcuMaterialRow from "./FcuMaterialRow";
import useAdmin from "../Pages/Hook/useAdmin";
import FcuFilterDel from "./FcuFilterDel";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import Swal from "sweetalert2";
const FcuMaterial = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [axiosSecure] = useAxiosSecure()
  const [visible, setVisible] = useState(false);
  const [fcuFilterDel, setFcuFilterDel] = useState([]);
  const [isLoading, setIsLoading] = useState(false)


  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let date = new Date();
  date.setDate(date.getDate());
  let today = date.toLocaleDateString("en-CA");

  const onSubmit = (data) => {
    setIsLoading(true)
    const filter = {
      receivingDate: data.receiveDate,
      receivingQuantity: data.receiveQuantity,
      remark: data.remark,
      updaterName: user.displayName,
      updaterEmail: user.email,
      date: today,
    };

    const fcuFilter = async () => {
      const { data } = await axiosSecure.post("/fcuFilter", filter)
      if (data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Fuel Data has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else {
        toast.error(`Warning: ${data.msg}`);
      }
      reset()
      setVisible(null);
      refetch();
      setIsLoading(false)
    }
    fcuFilter()

  };

  const { data: filterRecord = [], refetch,loading } = useQuery({
    queryKey: ["filterRecord"],
    queryFn: async () => {
      const res = await axiosSecure.get("/fcuFilter")
      return res.data
    }
  })
  //console.log(filterRecord);

  /*  All filter Replace record */

  const { data: fcuFilterReplace = [], isLoading2 } = useQuery({
    queryKey: ["fcuFilterReplace"],
    queryFn: async () => {
      const res = await axiosSecure.get("/fcuFilterChangeAllRecord")
      return res.data
    }
  })

  if (isLoading || isLoading2 || loading) {
    return <Loading />;
  }

  const Filter = filterRecord?.map((quantity) => quantity.receivingQuantity);
  const totalFilter = Filter?.reduce(
    (previous, current) => previous + parseFloat(current),
    0
  );

  const replaceFilter = fcuFilterReplace?.filter(
    (replace) => replace.fcuFilterStatus === "Replace"
  );
  //console.log(replaceFilter)
  const totalReplace = replaceFilter?.length;
  const Balance = totalFilter - totalReplace;
  //console.log(totalReplace)
  return (
    <div className="px-2 lg:px-4 my-4">
      <div className="grid grid-cols-1  md:grid-cols-3 gap-x-4">
        <div className=" col-span-2 overflow-x-auto mt-8 px-2">
          <div className="grid h-12 card bg-[#6495ED] rounded-box place-items-center mb-4">
            <h2 className="text-[#FFFFFF] card-title font-bold ">
              FCU Filter Receiving Record.
            </h2>
          </div>
          <table className="table table-compact w-full ">
            <thead className="border-2 border-[#aef688]">
              <tr className="divide-x divide-blue-400 text-center">
                <th>S/N</th>

                <th>
                  <div>Receive</div>
                  <div> Date</div>
                </th>
                <th>
                  <div>Receive</div>
                  <div> Quantity</div>
                </th>
                <th>Action</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filterRecord.map((filter, index) => (
                <FcuMaterialRow
                  key={filter._id}
                  filter={filter}
                  index={index}
                  setFcuFilterDel={setFcuFilterDel}
                />
              ))}
            </tbody>
          </table>
          {fcuFilterDel && (
            <FcuFilterDel
              fcuFilterDel={fcuFilterDel}
              setFcuFilterDel={setFcuFilterDel}
              refetch={refetch}
            />
          )}
        </div>
        {/* 2nd Part */}
        <div className="mt-8 order-first md:order-last">
          <div className="grid h-12 card bg-[#c264ed] rounded-box place-items-center mb-4">
            <h2 className="text-[#FFFFFF] card-title font-bold ">
              Filter Calculation
            </h2>
          </div>
          <div className="flex justify-between items-center">
            {admin && (
              <Link to="/FcuAllData" className="btn btn-sm btn-outline">
                {" "}
                All FCU Data
              </Link>
            )}
            {admin && (
              <div className="stat-actions">
                <button
                  className="btn btn-sm btn-outline btn-primary"
                  onClick={() => setVisible(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Filter
                </button>
              </div>
            )}
          </div>

          {visible && (
            <div>
              <div className="card w-full bg-base-300 shadow-xl mt-2">
                <div className="card-body">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {/* 1st part of grid */}
                      <div>
                        {/* Receive Date input field */}

                        <div className="form-control w-full max-w-xs">
                          <label className="label">
                            <span className="label-text">Receiving Date:</span>
                          </label>
                          <input
                            type="date"
                            placeholder="Receive Date"
                            className="input input-bordered w-full max-w-xs"
                            {...register("receiveDate", {
                              required: {
                                value: true,
                                message: " Receive Date required",
                              },
                            })}
                          />
                          <label className="label">
                            {errors.receiveDate?.type === "required" && (
                              <span className="label-text-alt text-red-500">
                                {errors.receiveDate.message}
                              </span>
                            )}
                          </label>
                        </div>
                        {/*  Receive Quantity */}
                        <div className="form-control w-full max-w-xs">
                          <input
                            type="text"
                            placeholder="Receive quantity"
                            className="input input-bordered w-full max-w-xs"
                            {...register("receiveQuantity", {
                              required: {
                                value: true,
                                message: " Receive Quantity is required",
                              },
                            })}
                          />
                          <label className="label">
                            {errors.receiveQuantity?.type === "required" && (
                              <span className="label-text-alt text-red-500">
                                {errors.receiveQuantity.message}
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Remark part */}
                    <div className="form-control w-full max-w-xs">
                      <textarea
                        type="text"
                        placeholder="Remarks if have"
                        className="input input-bordered w-full max-w-xs"
                        {...register("remark")}
                      />
                      <label className="label"></label>
                    </div>

                    <div className="flex gap-x-4 justify-items-center">
                      <input
                        type="submit"
                        className="btn btn-sm btn-outline btn-info w-24 "
                        value="ADD"
                      />
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => setVisible(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* calculation part */}
          <div className="text-center">
            <div className=" mt-3 bg-black text-primary-content stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Total Filter Receive</div>
                <div className="stat-value">{totalFilter}</div>
                <div className="stat-desc">pics</div>
              </div>

              <div className="stat">
                <div className="stat-title">Total Replace</div>
                <div className="stat-value">{totalReplace}</div>
                <div className="stat-desc">sites</div>
              </div>

              <div className="stat">
                <div className="stat-title">Balance</div>
                <div className="stat-value">{Balance}</div>
                <div className="stat-desc">Pics</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FcuMaterial;
