import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';

const ServiceMaterial = () => {
    const [user] = useAuthState(auth);
    const [visible, setVisible] = useState(false);

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
        const PgData = {
            pgNo: data.pgno,
            pgStatus: data.pgCondition,
            pgDetail: data.pgFault,
            updaterName: user.displayName,
            updaterEmail: user.email,
            date: today,
        };
    }
    return (
      <div className="px-2 lg:px-4 my-4">
        <div className="grid grid-cols-1  md:grid-cols-3 gap-x-4">
          <div className=" col-span-2 overflow-x-auto mt-8 px-2">
            <div className="grid h-12 card bg-[#6495ED] rounded-box place-items-center mb-4">
              <h2 className="text-[#FFFFFF] card-title font-bold ">
                Lub-Oil Receiving Record
              </h2>
            </div>
            <table className="table table-compact w-full ">
              <thead className="border-2 border-[#aef688]">
                <tr className="divide-x divide-blue-400 text-center">
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
              <tbody></tbody>
            </table>
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
                Lub-Oil
              </button>
            </div>
            {visible && (
              <div>
                <div className="card w-full bg-base-300 shadow-xl mt-2">
                  <div className="card-body">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col"
                    >
                      {/* PgNo input field */}

                      <div className="form-control w-full max-w-xs">
                        <input
                          type="text"
                          placeholder="PG No"
                          className="input input-bordered w-full max-w-xs"
                          {...register("pgno", {
                            required: {
                              value: true,
                              message: " PG NO  is required",
                            },
                          })}
                        />
                        <label className="label">
                          {errors.pgno?.type === "required" && (
                            <span className="label-text-alt text-red-500">
                              {errors.pgno.message}
                            </span>
                          )}
                        </label>
                      </div>
                      {/*  PG condition */}
                      <div className="form-control w-full max-w-xs">
                        <input
                          type="text"
                          placeholder="PG Status good/Faulty"
                          className="input input-bordered w-full max-w-xs"
                          {...register("pgCondition", {
                            required: {
                              value: true,
                              message: " PG condition is required",
                            },
                          })}
                        />
                        <label className="label">
                          {errors.pgCondition?.type === "required" && (
                            <span className="label-text-alt text-red-500">
                              {errors.pgCondition.message}
                            </span>
                          )}
                        </label>
                      </div>
                      {/* Detail part */}
                      <div className="form-control w-full max-w-xs">
                        <textarea
                          type="text"
                          placeholder="Remarks if have"
                          className="input input-bordered w-full max-w-xs"
                          {...register("pgFault")}
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