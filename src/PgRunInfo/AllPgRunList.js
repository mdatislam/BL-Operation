import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Pages/SharedPage/Loading";
import AllPgRunRows from "./AllPgRunRows";
import { CSVLink } from "react-csv";
import { useState } from "react";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import auth from "../firebase.init";
import useAdmin from "../Pages/Hook/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'

const AllPgRunList = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [searchPgRun, setSearchPgRun] = useState("");
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();
  const { isLoading, data: pgRunData } = useQuery(["list"], () =>
    fetch("https://blserver.bloperation.com/ApprovedAllPgRun", {
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

      {/* For filter input box */}
      <div className="flex  justify-between flex-wrap gap-4">
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
      <div className="overflow-x-auto  mt-2">
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
