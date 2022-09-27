import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../Pages/SharedPage/Loading";
import EmInfoListRow from "./EmInfoListRow";

const EminfoList = () => {
  const { data: EmInfo, isLoading } = useQuery(["EmInfoList"], () =>
    fetch(" https://enigmatic-eyrie-94440.herokuapp.com/emInfo", {
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
  return (
    <div className="mt-8 px-16 mb-4">
      <div className="grid h-12 card bg-[#008282] rounded-box place-items-center mt-12">
        <h2 className="text-[#FFFFFF] font-bold ">
          All Updated Energy Meter Info !!
        </h2>
      </div>

      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <thead className="border-3  text-[#FFcb24]">
            <tr className=" border-3 bg-[#555555]">
              <th>SN</th>
              <th>Site ID</th>

              <th>
                <div>previous</div>
                <div>Uploaded Date</div>
              </th>

              <th>
                <div>Energy Meter </div>
                <div>Serial No</div>
              </th>
              <th>
                <div>Previous</div>
                <div>EM Reading</div>
              </th>

              <th>
                <div>Latest</div>
                <div>Uploaded Date</div>
              </th>

              <th>
                <div>Latest EM </div>
                <div>Serial No</div>
              </th>
              <th>
                <div>Latest</div>
                <div>EM Reading</div>
              </th>
              <th>
                <div>Info</div>
                <div>Collector</div>
              </th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {EmInfo.map((emInfo, index) => (
              <EmInfoListRow key={emInfo._id} emInfo={emInfo} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EminfoList;
