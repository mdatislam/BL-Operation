import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../SharedPage/Loading";
import RectifierInfoRows from "./RectifierInfoRows";
import useAxiosSecure from "../Hook/useAxiosSecure";

const RectifierInfo = () => {
  const [axiosSecure] = useAxiosSecure()
  const { data: rectifiers, refetch } = useQuery({
    queryKey: ["rectifiers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rectifier")
      return res.data

    }

  })


  return (
    <div className="overflow-x-auto w-full mt-16 px-2">
      <div className="grid h-12 card bg-[#6495ED] rounded-box place-items-center mb-4">
        <h2 className="text-[#ffffff] card-title font-bold ">
          Considering Per Module Consumption
        </h2>
      </div>
      <table className="table-compact  w-full mx-auto  ">
        <thead>
          <tr className="bg-[#ffcb24] border-2 border-[#ffcb45]">
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Brand</th>
            <th>Capacity</th>
            <th>Consumption</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rectifiers?.map((rec) => (
            <RectifierInfoRows key={rec._id} rec={rec} refetch={refetch} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RectifierInfo;
