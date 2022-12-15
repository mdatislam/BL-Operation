import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
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
  const [siteName, setSiteName] = useState("")
  const [selectSite,setSelectSite]=useState([])
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
    fetch(`http://localhost:5000/siteData?page=${page}&size=${size}`, {
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

  if (isLoading) {
    return <Loading />;
  }
  //console.log(siteData)
  
  
  const pages = Math.ceil(siteData.count/size);
  //console.log(siteDataEdit)

  const handleSearch2 = (site) => {
   
    if (site) {
     
         fetch(`http://localhost:5000/searchSite?site=${site}`)
           .then((res) => res.json())
           .then((data) => {
             //console.log(data);
             setSelectSite(data);
           });
    }

    if (selectSite !=="") {
      const filterData = selectSite?.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(siteName.toLowerCase());
      });
      setFilter(filterData);
    } else {
      setFilter(siteData.result);
    }
    
  };
  //console.log(selectSite)
  return (
    <>
      <div className="px-3 mb-2">
        <div className="flex flex-row gap-x-2 my-5">
          <input
            type="text"
            name="select"
            onChange={(e) => setSiteName(e.target.value)}
            className="input input-bordered border-sky-400"
            placeholder="Search by site no"
          />
          <button
            className="btn btn-info"
            onClick={() => handleSearch2(siteName)}
          >
            {" "}
            search
          </button>
        </div>

        <h5 className="flex justify-center items-center text-white text-xl font-bold h-12 mt-2 p-4 rounded-lg bg-[#6e3790] px-2 mb-2">
          Existing Site Data Record
        </h5>
        <div className="flex flex-col justify-start  lg:items-center lg:flex-row  gap-2 mt-3">
          <div className="flex-1">
            <NavLink to="/snagList" className="btn bg-[#d99ddb] btn-outline rounded-lg btn-md">
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
              {siteData.result?.map((data, index) => (
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
              setFilter={setFilter}
            ></EditSiteData>
          )}
        </div>
      </div>
    </>
  );
};

export default SiteDataInfo;
