import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../SharedPage/Loading";
import SiteDataInfoRows from "./SiteDataInfoRows";

const SiteDataInfo = () => {
  // For Existing site upload
  const navigate = useNavigate();
  const { data: siteData, isLoading } = useQuery(["siteInfo"], () =>
    fetch(" https://bl-operation-server-production.up.railway.app/siteData", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        //  toast.error("Unauthorize Access")
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/Login");
      }
      return res.json();
    })
  );
  // console.log(services)
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <h5 className="flex justify-center items-center text-white text-xl font-bold h-12 mt-4 p-4 rounded-lg bg-[#6e3790] px-2">
          Existing Site Data Record
        </h5>

        <div className="overflow-x-auto  mt-4">
          <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
            <thead className="border-2 border-[#FFCB24]">
              <tr className="divide-x divide-blue-400 text-center">
                <th>SNo</th>
                <th>Site ID</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Priority</th>
                <th>
                  <div>Share Site</div>
                  <div>Code</div>
                </th>
                <th>Key Status</th>
                <th>
                  <div>Connected</div>
                  <div>Site</div>
                </th>
                <th>
                  <div>Battery</div>
                  <div>Info</div>
                </th>
                <th>
                  <div>Battery</div>
                  <div>Backup</div>
                </th>
                <th>
                  <div>Rectifier</div>
                  <div>Info</div>
                </th>
                {/* <th className="w-12 text-start">Address</th> */}
              </tr>
            </thead>
            <tbody>
              {siteData?.map((data, index) => (
                <SiteDataInfoRows key={index} data={data} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SiteDataInfo;
