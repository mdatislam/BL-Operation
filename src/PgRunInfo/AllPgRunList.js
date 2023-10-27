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

const AllPgRunList = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [axiosSecure] = useAxiosSecure()
  const [selectPage, setSelectPage] = useState("0")
  const [pageSize, setPageSize] = useState("50");
  const [totalPage, setTotalPage] = useState("10")
  const [actualDataLength,setDataLength]=useState("0")
  const [searchPgRun, setSearchPgRun] = useState("1");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const getLengthData = async () => {
      const { data } = await axiosSecure.get("/ApprovedAllPgRun/pageCount")
      const page = data.lengthPgRunData
      setDataLength(page)
      const pageCount = Math.ceil(page / pageSize)
      setTotalPage(pageCount)
      if(pageCount<selectPage){
        setSelectPage(1)
      }
    }
    getLengthData()

  }, [pageSize])
  console.log(totalPage)


  const { isLoading, data: pgRunData = [] } = useQuery({
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
                Download
              </CSVLink>
            </div>
          )}
        </div>
      </div>
      {/* Pagination part */}
      <div className="mt-5 flex items-center justify-between">
        <div className=" flex items-center justify-start gap-1">
          <h2>Show</h2>
          <div className="border border-slate-300 p-2 w-20">
            <select  onChange={(e) => setPageSize(e.target.value)}>
              <option value="10"> 10</option>
              <option value="50" selected> 50</option>
              <option value="30"> 30</option>
              <option value={actualDataLength}>All</option>
            </select>
          </div>
          <h2>entries</h2>
        </div>
        <div className=" ">
          <h2>Showing {(+selectPage*pageSize)+1} to {(+selectPage*(+pageSize))+(+pageSize)} of {actualDataLength} entries</h2>
          <div className="border border-slate-300 p-2 rounded-lg">
            {
              [...Array(totalPage).keys()].map(number => (<button
                onClick={() => setSelectPage(number)}
                className={selectPage === number ? "btn btn-xs btn-warning" : " btn btn-xs btn-outline"}
              >{number + 1}</button>))
            }
          </div>
        </div>


      </div>

      {/* Table part */}
      <div className="overflow-x-auto  mt-4 py-2">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <caption class=" caption-top bg-[#7e4f9ef5]  rounded-t-lg py-4">
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
            </tr>
          </thead>
          <tbody>
            {searchPgRun.length > 1
              ? filter.map((pgRun, index) => (
                <AllPgRunRows
                  key={pgRun._id}
                  pgRun={pgRun}
                  index={index}
                ></AllPgRunRows>
              ))
              : pgRunData?.map((pgRun, index) => (
                <AllPgRunRows
                  key={pgRun._id}
                  pgRun={pgRun}
                  index={index}
                ></AllPgRunRows>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPgRunList;
