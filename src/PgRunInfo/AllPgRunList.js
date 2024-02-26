import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Loading from "../Pages/SharedPage/Loading";
import AllPgRunRows from "./AllPgRunRows";
import { CSVLink } from "react-csv";
import { useState } from "react";
import auth from "../firebase.init";
import useAdmin from "../Pages/Hook/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import Pagination from "../Pages/SharedPage/Pagination";
import EditPgRunData from "./EditPgRunData";

const AllPgRunList = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [axiosSecure] = useAxiosSecure()
  const [editPgRun,setEditPgRun]= useState("")
  const [searchPgRun, setSearchPgRun] = useState("");
  const [filter, setFilter] = useState([]);

  /* For Pagination code */
  const [selectPage, setSelectPage] = useState("0")
  const [pageSize, setPageSize] = useState("30");
  const [totalPage, setTotalPage] = useState("1")
  const [actualDataLength, setDataLength] = useState("10")

  useEffect(() => {
    const getLengthData = async () => {
      const { data } = await axiosSecure.get("/ApprovedAllPgRun/pageCount")
      const page = data.lengthPgRunData
      setDataLength(page)
      const pageCount = Math.ceil(page / pageSize)
      setTotalPage(pageCount)
      if (pageCount < selectPage) {
        setSelectPage(1)
      }
    }
    getLengthData()

  }, [pageSize, selectPage, totalPage, actualDataLength, axiosSecure])

  //console.log(selectPage,pageSize,actualDataLength,totalPage)


  const { isLoading, data: pgRunData = [],refetch } = useQuery({
    queryKey: ["pgRunData", pageSize, selectPage],
    // enabled: !adminLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/ApprovedAllPgRun?size=${pageSize}&page=${selectPage}`)
      return res.data
    }
  })

  if (isLoading) {
    return <Loading />;
  }

  /* For filtering purpose */
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchPgRun(search);

    if (search !== "") {
      const filterData = pgRunData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilter(filterData);
    } else {
      setFilter(pgRunData);
    }
  };

 // console.log(editPgRun)

  return (
    <div className=" card w-full bg-base-100 shadow-xl px-2 lg:px-16 py-4 mt-4 mb-8">

      <div className="border border-slate-400 p-4 rounded-lg">
        {/* For filter input box */}
        <div className=" flex  justify-between flex-wrap gap-4">
          <input
            type="text"
            className="input input-bordered border-sky-400 w-full max-w-xs flex-auto"
            placeholder="Enter search Keyword"
            onChange={(e) => {
              handleSearch(e);
            }}
          />

          {admin && (
            <div>
              <CSVLink
                data={pgRunData}
                filename="PgRunData"
                className="btn btn-outline btn-info mb-2 flex-auto"
              >
                <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />

              </CSVLink>
            </div>
          )}
        </div>
      </div>
      {/* Pagination part */}
      <Pagination pageSize={pageSize} setPageSize={setPageSize}
        selectPage={selectPage} setSelectPage={setSelectPage}
        totalPage={totalPage} actualDataLength={actualDataLength}
      />

      {/* Table part */}
      <div className="overflow-x-auto  mt-4 py-2">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <caption className=" caption-top bg-[#7e4f9ef5]  rounded-t-lg py-4">
            <h2 className='text-center text-xl font-bold  text-white'>All Approved PG Run Record</h2>

          </caption>
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400 text-center">
              <th>SN</th>

              <th>Date</th>
              <th>Site ID</th>
              <th>PG No</th>
              <th>
                <div>PG Start</div>
                <div>Time</div>
              </th>
              <th>
                <div>PG Stop</div>
                <div>Time</div>
              </th>
              <th>Duration</th>
              <th>Consumption</th>
              <th>
                {" "}
                <div>Approval</div>
                <div>Responsible</div>
              </th>
              <th>PG Runner</th>
              {admin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {searchPgRun.length > 1
              ? filter.map((pgRun, index) => (
                <AllPgRunRows
                  key={pgRun._id}
                  pgRun={pgRun}
                  index={index}
                  admin={admin}
                  setEditPgRun={setEditPgRun}
                ></AllPgRunRows>
              ))
              : pgRunData?.map((pgRun, index) => (
                <AllPgRunRows
                  key={pgRun._id}
                  pgRun={pgRun}
                  index={index}
                  admin={admin}
                  setEditPgRun={setEditPgRun}
                ></AllPgRunRows>
              ))}
          </tbody>
        </table>
        {
          editPgRun && 
          <EditPgRunData 
          editPgRun ={editPgRun}
          setEditPgRun={setEditPgRun}
          refetch={refetch}
          />
        }

        {/* show pages nos */}
        <div className="text-end">
          <h2>{
            ((+selectPage) * (+pageSize)) + (+pageSize) < actualDataLength ? `Showing ${((+selectPage) * (+pageSize)) + 1} to ${((+selectPage) * (+pageSize)) + (+pageSize)} of ${actualDataLength} entries`
              : `Showing ${((+selectPage) * (+pageSize)) + 1} to ${actualDataLength} of ${actualDataLength} entries}`
          }</h2>

          <div className="mt-2">
            <span><strong>Pages</strong></span>
            <span className="border border-slate-300 p-1 rounded-lg">
              {
                [...Array(totalPage).keys()].map(number => (<button
                  onClick={() => setSelectPage(number)}
                  className={+selectPage === number ? "btn btn-xs btn-secondary" : " btn btn-xs btn-outline"}
                >{number + 1}</button>))
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPgRunList;
