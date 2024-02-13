import React, { useState } from "react";

import ServiceMaterialRow from "./ServiceMaterialRow";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../firebase.init";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../SharedPage/Loading";
import useAxiosSecure from "../Hook/useAxiosSecure";
import LubOilEdit from "./LubOilEdit";
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import LubOilBalance from "./LubOilBalance";
import TableCaption from "../SharedPage/TableCaption";



const ServiceMaterial = () => {
  const [user] = useAuthState(auth);
  const [axiosSecure] = useAxiosSecure()
  const [visible, setVisible] = useState(false);
  const [lubOilEdit, setLubOilEdit] = useState([]);


  const { register, reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { isLoading, data: receiveLubOil = [], refetch } = useQuery({
    queryKey: ["receiveLubOil"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lubOil")
      return res.data
    }
  })

  let date = new Date();
  date.setDate(date.getDate());
  let today = date.toLocaleDateString("en-CA");

  const onSubmit = (data) => {
    const lubOilData = {
      receivingDate: data.receiveDate,
      receivingQuantity: data.receiveQuantity,
      requisitionDate: data.requiDate,
      requisitionQuantity: data.requiQuantity,
      remark: data.remark,
      updaterName: user.displayName,
      updaterEmail: user.email,
      date: today,
    };

    const addNewLubOil = async () => {
      const { data } = await axiosSecure.post("/lubOil", lubOilData)
      //console.log(data)
      if (data.acknowledged) {
        toast.success("Successfully Lub-oil update ")
        reset()
        refetch()
        setVisible(null)
      }
      else {
        toast.error(`Warning: ${data.msg}`);
      }

    }
    addNewLubOil()

  };


  if (isLoading) {
    return <Loading />;
  }


  return (
    <div className="px-2 lg:px-4 my-4">
      <div className="grid grid-cols-1  md:grid-cols-3 gap-x-4">
        <div className=" col-span-2 overflow-x-auto mt-8 px-2">
          <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
            <TableCaption tableHeading=" Lub-Oil Receiving Record" />
            <thead className="border-2 border-[#FFCB24]">
              <tr className="divide-x divide-blue-400">
                <th>S/N</th>
                <th>Action</th>
                <th>
                  <div>Mailing</div>
                  <div> Date</div>
                </th>
                <th>
                  <div>Requisition</div>
                  <div> Quantity</div>
                </th>
                <th>
                  <div>Receiving</div>
                  <div> Date</div>
                </th>
                <th>
                  <div>Receiving</div>
                  <div> Quantity</div>
                </th>

                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {receiveLubOil?.map((lubOil, index) => (
                <ServiceMaterialRow
                  key={lubOil._id}
                  lubOil={lubOil}
                  index={index}
                  refetch={refetch}
                  axiosSecure={axiosSecure}
                  setLubOilEdit={setLubOilEdit}
                />
              ))}
            </tbody>
          </table>
          {
            lubOilEdit && <LubOilEdit
              lubOilEdit={lubOilEdit}
              setLubOilEdit={setLubOilEdit}
              refetch={refetch}
            >

            </LubOilEdit>
          }
        </div>
        {/* 2nd Part */}
        <div className="mt-8 order-first md:order-last">
          <div className="grid h-12 card bg-[#c264ed] rounded-box place-items-center mb-4">
            <h2 className="text-[#FFFFFF] card-title font-bold ">
              Service Material Calculation
            </h2>
          </div>
          <div className="stat-actions">
            <button
              className="btn btn-sm btn-outline btn-primary"
              onClick={() => setVisible(true)}
            >
              <PlusCircleIcon className="w-6 h-6 text-green-600" />
              Lub-Oil
            </button>
            {/* calculation part */}
          <LubOilBalance />
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
                      {/* 2nd part of grid */}
                      <div>
                        {/* Requisition Date input field */}

                        <div className="form-control w-full max-w-xs">
                          <label className="label">
                            <span className="label-text">
                              Requisition Date:
                            </span>
                          </label>
                          <input
                            type="date"
                            placeholder="Requisition Date"
                            className="input input-bordered w-full max-w-xs"
                            {...register("requiDate")}
                          />
                          <label className="label"></label>
                        </div>
                        {/*  email Quantity */}
                        <div className="form-control w-full max-w-xs">
                          <input
                            type="text"
                            placeholder="Requi quantity"
                            className="input input-bordered w-full max-w-xs"
                            {...register("requiQuantity")}
                          />
                          <label className="label"></label>
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
        </div>
      </div>
    </div>
  );
};

export default ServiceMaterial;
