import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../SharedPage/Loading";
import SiteDataInfoRows from "./SiteDataInfoRows";
import useAdmin from "./../Hook/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import EditSiteData from "./EditSiteData";
import "./SiteDataInfo.css";

const SiteDataInfo = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [searchFuel, setSearchFuel] = useState("");
  const [filter, setFilter] = useState([]);
  const [siteDataEdit, setSiteDataEdit] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  //const [count,setCount]= useState(1)

  const navigate = useNavigate();

  // For Existing site upload
  const {
    data: siteData,
    isLoading,
    refetch,
  } = useQuery(["siteInfo", [page, size]], () =>
    fetch(
      `https://bl-operation-server-production.up.railway.app/siteData?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401 || res.status === 403) {
        //  toast.error("Unauthorize Access")
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/Login");
      }
      return res.json();
    })
  );

  if (isLoading) {
    return <Loading />;
  }
  //console.log(siteData)

  /* For filtering purpose */
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchFuel(search);

    if (search !== "") {
      const filterData = siteData.result.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilter(filterData);
    } else {
      setFilter(siteData.result);
    }
  };
  const pages = Math.ceil(siteData.count / size);
  //console.log(siteDataEdit)
  return (
    <>
      <div className="px-3 mb-2">
        <h5 className="flex justify-center items-center text-white text-xl font-bold h-12 mt-4 p-4 rounded-lg bg-[#6e3790] px-2 mb-2">
          Existing Site Data Record
        </h5>
        <div className="flex flex-col justify-start  lg:items-center lg:flex-row  gap-2 ">
          <div className="flex-1">
            <input
              type="text"
              className="input input-bordered border-sky-400 w-full max-w-xs"
              placeholder="Search by site no/any Keyword "
              onChange={(e) => {
                handleSearch(e);
              }}
            />
          </div>
          <div className="flex-1">
            <NavLink to="/snagList" className="btn btn-primary btn-wide">
              {" "}
              To View snag list
            </NavLink>
          </div>

          <div className="font-bold text-lg pagination  rounded-lg mt-2 px-2">
            <div className="">
              Pages: &nbsp;
              {[...Array(pages).keys()]?.map((number) => (
                <button
                  key={number}
                  onClick={() => setPage(number)}
                  className={
                    page === number
                      ? " btn btn-active text-lg btn-accent text-white"
                      : ""
                  }
                >
                  {number + 1}
                </button>
              ))}
            </div>
            <div>
              <span className="text-pink-700">Size: &nbsp; </span>
              {
                <select onChange={(e) => setSize(e.target.value)}>
                  <option value="50">50</option>
                  <option value="80">80</option>
                  <option value="100">100</option>
                </select>
              }
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
            <thead className="border-2 border-[#FFCB24]">
              <tr className="divide-x divide-blue-400 text-center">
                <th>SNo</th>
                <th>Action</th>
                <th>Site ID</th>
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
                : siteData.result?.map((data, index) => (
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
