import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../SharedPage/Loading";
import useAdmin from "../Hook/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import "./SiteDataInfo.css";
import SiteDataInfoRows from "./SiteDataInfoRows";
import EditSiteData from "./EditSiteData";
import { CSVLink } from "react-csv";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Pagination from "../SharedPage/Pagination";
import TableCaption from "../SharedPage/TableCaption";


const SiteDataInfo = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [siteDataEdit, setSiteDataEdit] = useState([]);
  const [axiosSecure] = useAxiosSecure()



  /* For Pagination code */
  const [selectPage, setSelectPage] = useState("0")
  const [pageSize, setPageSize] = useState("50");
  const [totalPage, setTotalPage] = useState("1")
  const [actualDataLength, setDataLength] = useState("10")


  useEffect(() => {
    const getLengthData = async () => {
      const { data } = await axiosSecure.get("/siteData/count")
      const page = data.lengthOfData
      setDataLength(page)
      const pageCount = Math.ceil(page / pageSize)
      setTotalPage(pageCount)
      if (pageCount < selectPage) {
        setSelectPage(1)
      }
    }
    getLengthData()

  }, [pageSize, selectPage, totalPage, actualDataLength, axiosSecure])


  const { isLoading, data: siteData = [], refetch } = useQuery({
    queryKey: ["siteData", pageSize, selectPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/siteData?size=${pageSize}&page=${selectPage}`)
      return res.data
    }
  })

  if (isLoading) {
    return <Loading />;
  }


  return (
    <div className=" py-2 bg-slate-300">
      <div className="card bg-base-100 shadow-xl px-2 w-full mt-4 px-2 py-2 md:px-16 mx-auto">
        <div className=" border border-slate-400 p-4 flex flex-wrap mt-4 
       justify-between rounded-lg">
          {/* For filter input box */}
          
          <input
              type="text"
              className="input input-bordered border-orange-400 bg-white w-full max-w-xs flex-auto"
              placeholder="Enter search Keyword"
              
             
            />
          {/* For Data Export */}
          {admin && (
            <div className="mt-3">
              <CSVLink
                data={siteData}
                filename="SiteDataInfo"
                className="btn btn-outline btn-accent btn-sm mb-2"
              >
                <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />
              </CSVLink>
            </div>
          )}

        </div>
        <Pagination pageSize={pageSize} setPageSize={setPageSize}
          selectPage={selectPage} setSelectPage={setSelectPage}
          totalPage={totalPage} actualDataLength={actualDataLength}
        />

        <div className="overflow-x-scroll mt-4">
          <table className="table table-compact w-full border border-slate-300">
            <TableCaption tableHeading=" Existing Site Info " />
            <thead className="border-2 border-blue-300 bg-slate-500 ">
              <tr className="divide-x divide-blue-300 text-start ">
                <th>SNo</th>
                <th>Action</th>
                <th>Site ID</th>
                <th>
                  <div>Share Site</div>
                  <div>Code</div>
                </th>

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
                <th>Key Status</th>
                <th>MobileNo-1</th>
                <th>Site Load Current</th>
                <th>Date</th>
                <th>Updater Name</th>

                {/* <th className="w-12 text-start">Address</th> */}
              </tr>
            </thead>
            <tbody>
              {siteData.map((data, index) => (
                <SiteDataInfoRows
                  key={index._id}
                  siteData={data}
                  setSiteDataEdit={setSiteDataEdit}
                  axiosSecure={axiosSecure}
                  admin={admin}
                  index={index}
                  refetch={refetch}
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
    </div>
  );
};

export default SiteDataInfo;
