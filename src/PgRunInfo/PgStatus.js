
import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PgStatusRows from "./PgStatusRows";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import PgDel from "./PgDel";
import EditPg from "./EditPg";
import useAdmin from "../Pages/Hook/useAdmin";
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Pages/SharedPage/Loading";

const PgStatus = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  //const [pgList, setPgList] = useState([])
  const [axiosSecure] = useAxiosSecure()
  const [visible, setVisible] = useState(false);
  const [pgDel, setPgDel] = useState("");
  const [pgEdit, setPgEdit] = useState("");
  
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let date = new Date();
  date.setDate(date.getDate());
  let today = date.toLocaleDateString("en-CA");

  const { isLoading, data: pgList = [],refetch } = useQuery({
    queryKey: ["pgList"],
    queryFn: async () => {
      const pgData = await axiosSecure.get("/pgList")
      return pgData.data
    }
  })

  const onSubmit = (data) => {
    const pgNo = data.pgno
    const PgData = {
      pgNo: data.pgno,
      pgStatus: data.pgCondition,
      pgDetail: data.pgFault,
      updaterName: user.displayName,
      updaterEmail: user.email,
      date: today,
    };

    const pgInfo = async () => {
      const { data } = await axiosSecure.put(`/pgList/${pgNo}`, PgData)
      if (data.upsertedCount || data.modifiedCount) {
        toast.success("Data Successfully Update");
      }
      reset();
      setVisible(null);
      refetch()
    }
    pgInfo()


  };

  const goodCondition = pgList?.filter((good) => good.pgStatus === "Good");
  const goodPg = goodCondition?.length;
  const faultyPg = pgList?.length - goodPg;

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="mt-2 mb-4 w-full px-2 md:w-3/4 mx-auto">

      {/*  Status Summary */}
      <div className="text-center">
        <div className="stats shadow-lg bg-base-300 mt-4 mb-2">
          <div className="stat text-center">
            <div className="stat-title font-bold">Good Condition</div>
            <div className="stat-value text-primary ">{goodPg}</div>
            <div className="stat-desc">nos</div>
          </div>
          <div className="stat text-center">
            <div className="stat-title font-bold">Faulty</div>
            <div className="stat-value text-error">{faultyPg}</div>
            <div className="stat-desc">nos</div>
          </div>
        </div>
      </div>

      {/* PG Add Part */}
      <div className="stat-actions">
        <button
          className="btn btn-sm btn-outline btn-primary"
          onClick={() => setVisible(true)}
        >
          <PlusCircleIcon className="h-6 w-6" />

          Add PG
        </button>
      </div>
      {visible && (
        <div className="w-full px-2 md:px-8">
          <div className="card  bg-base-300 shadow-xl mt-2">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
      <div className="overflow-x-auto  mt-2">
        <table className=" table  border-spacing-2  border border-3 border-slate-600 ">
          <caption class=" caption-top py-2 bg-zinc-600 rounded-t-lg ">
            <div className='w-full px-2 '>
              <h2 className='text-center text-xl font-bold  text-white'> Available Pg Status</h2>

            </div>
          </caption>
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400">
              <th className="">Action</th>
              <th className="">PG NO</th>
              <th className="">Date</th>
              <th className="">Condition</th>

              <th className="">Fault Detail</th>

              <th className="">
                <div>Updated By</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {pgList?.map((pg, index) => (
              <PgStatusRows
                key={pg._id}
                pg={pg}
                index={index}
                //refetch={refetch}
                setPgDel={setPgDel}
                setPgEdit={setPgEdit}
                admin={admin}
              />
            ))}
          </tbody>
        </table>
      </div>
      {pgDel && <PgDel pgDel={pgDel} setPgDel={setPgDel}  refetch={refetch} />}
      {pgEdit && (
        <EditPg pgEdit={pgEdit} setPgEdit={setPgEdit} 
         refetch={refetch} axiosSecure={axiosSecure}
          />
      )}
    </div>
  );
};

export default PgStatus;
