import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../SharedPage/Loading";
import SnagListRows from "./SnagListRows";
import useAdmin from "./../Hook/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import EditSiteData from "./EditSiteData";
import "./SiteDataInfo.css";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Pagination from "../SharedPage/Pagination";

const SnagList = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [axiosSecure]=useAxiosSecure()
  const [searchSite, setSearchSite] = useState("");
  const [filter, setFilter] = useState([]);
  const [siteDataEdit, setSiteDataEdit] = useState([]);

  //const [count,setCount]= useState(0)



   /* For Pagination code */
   const [selectPage, setSelectPage] = useState("0")
   const [pageSize, setPageSize] = useState("50");
   const [totalPage, setTotalPage] = useState("1")
   const [actualDataLength, setDataLength] = useState("10")

  // For Existing site upload
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


  const { isLoading, data: siteData, refetch } = useQuery({
    queryKey: ["siteData", pageSize, selectPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/siteData?size=${pageSize}&page=${selectPage}`)
      return res.data
    }
  })


  if (isLoading) {
    return <Loading />;
  }
  //console.log(siteData)

  /* For filtering purpose */
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchSite(search);

    if (search !== "") {
      const filterData = siteData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilter(filterData);
    }
    /* else {
      setFilter(siteData.result);
    } */
  };

  //console.log(siteData)
  return (
    <>
      <div className="px-3 mb-4">
        <h5 className="flex justify-center items-center text-white text-xl font-bold h-12 mt-4 p-4 rounded-lg bg-[#d55d26] px-2">
          Existing Site's Snag List !!
        </h5>
        <div className="flex flex-col justify-start  lg:items-center lg:flex-row  gap-2 ">
          <div className="flex-1 mt-3">
            <NavLink
              to="/siteDataHome"
              className="btn btn-secondary  btn-outline btn-sm "
            >
              Back
            </NavLink>
          </div>
          {/* <div className="flex-1">
            <input
              type="text"
              className="input input-bordered border-sky-400 w-full max-w-xs"
              placeholder="Search by site no/any Keyword "
              onChange={(e) => {
                handleSearch(e);
              }}
            />
          </div> */}

          <Pagination pageSize={pageSize} setPageSize={setPageSize}
          selectPage={selectPage} setSelectPage={setSelectPage}
          totalPage={totalPage} actualDataLength={actualDataLength}
        />
            </div>

        <div className="overflow-x-auto  mt-2">
          <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
            <thead className="border-2 border-[#FFCB24]">
              <tr className="divide-x divide-blue-400 text-center">
                <th>SNo</th>
                <th>Site ID</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Snags</th>
                <th>Unused</th>
                <th>Date</th>
                <th>Updater Name</th>
                <th>Remark</th>

                {/* <th className="w-12 text-start">Address</th> */}
              </tr>
            </thead>
            <tbody>
              { siteData?.map((data, index) => (
                    <SnagListRows
                      key={data._id}
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

export default SnagList;
