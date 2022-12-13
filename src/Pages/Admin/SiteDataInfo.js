import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../SharedPage/Loading";
import SiteDataInfoRows from "./SiteDataInfoRows";
import useAdmin from './../Hook/useAdmin';
import { useAuthState } from "react-firebase-hooks/auth";
import EditSiteData from "./EditSiteData";

const SiteDataInfo = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [searchFuel, setSearchFuel] = useState("");
  const [filter, setFilter] = useState([]);
  const [siteDataEdit, setSiteDataEdit] = useState([]);

  const navigate = useNavigate();

  // For Existing site upload
  const { data: siteData, isLoading,refetch } = useQuery(["siteInfo"], () =>
    fetch(" http://localhost:5000/siteData", {
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

  /* For filtering purpose */
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchFuel(search);

    if (search !== "") {
      const filterData = siteData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilter(filterData);
    } else {
      setFilter(siteData);
    }
  };
 //console.log(siteDataEdit)
  return (
    <>
      <div className="px-3 mb-4">
        <h5 className="flex justify-center items-center text-white text-xl font-bold h-12 mt-4 p-4 rounded-lg bg-[#6e3790] px-2">
          Existing Site Data Record
        </h5>
        <div className="flex flex-cols gap-x-2 mt-4">
          <div>
            <input
              type="text"
              className="input input-bordered border-sky-400 w-full max-w-xs"
              placeholder="Search by site no/any Keyword "
              onChange={(e) => {
                handleSearch(e);
              }}
            />
          </div>
        </div>

        <div className="overflow-x-auto  mt-4">
          <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
            <thead className="border-2 border-[#FFCB24]">
              <tr className="divide-x divide-blue-400 text-center">
                <th>SNo</th>
                <th>Action</th>
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
                  <div>Backup(hr)</div>
                </th>
                <th>
                  <div>Rectifier</div>
                  <div>Info</div>
                </th>
                <th>MobileNo-1</th>
                <th>MobileNo-2</th>
                <th>Date</th>
                <th>Updater Name</th>

                {/* <th className="w-12 text-start">Address</th> */}
              </tr>
            </thead>
            <tbody>
              {searchFuel.length > 1
                ? filter?.map((data, index) => (
                    <SiteDataInfoRows
                      key={data._id}
                      data={data}
                      index={index}
                      setSiteDataEdit={setSiteDataEdit}
                      admin={admin}
                    ></SiteDataInfoRows>
                  ))
                : siteData?.map((data, index) => (
                    <SiteDataInfoRows
                      key={index._id}
                      data={data}
                      setSiteDataEdit={setSiteDataEdit}
                      admin={admin}
                      index={index}
                    />
                  ))}
            </tbody>
          </table>
          {siteDataEdit && (
            <EditSiteData
              siteDataEdit={siteDataEdit}
              refetch={refetch}
              setSiteDataEdit={setSiteDataEdit}
            ></EditSiteData>
          )}
        </div>
      </div>
    </>
  );
};

export default SiteDataInfo;
