import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

import DeleteReceiveFuel from "../DashBoard/DeleteReceiveFuel";
import auth from "../firebase.init";
import useAdmin from "../Pages/Hook/useAdmin";
import Loading from "../Pages/SharedPage/Loading";
import AllFuelListRow from "./AllFuelListRow";
import { CSVLink } from "react-csv";
import { ArrowDownTrayIcon} from '@heroicons/react/24/solid'
import Pagination from "../Pages/SharedPage/Pagination";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import TableCaption from '../Pages/SharedPage/TableCaption'

const AllFuelList = () => {
  const [axiosSecure] = useAxiosSecure()
  const [searchFuel, setSearchFuel] = useState("");
  const [filter, setFilter] = useState([]);
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [delFuel, setDelFuel] = useState("");

  /* For Pagination code */
  const [selectPage, setSelectPage] = useState("0")
  const [pageSize, setPageSize] = useState("50");
  const [totalPage, setTotalPage] = useState("1")
  const [actualDataLength, setDataLength] = useState("10")


  useEffect(() => {
    const getLengthData = async () => {
      const { data } = await axiosSecure.get("/fuelListAll/count")
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


  const { isLoading, data: receiveFuel = [], refetch } = useQuery({
    queryKey: ["receiveFuel", pageSize, selectPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/fuelListAll?size=${pageSize}&page=${selectPage}`)
      return res.data
    }
  })

  if (isLoading) {
    return <Loading />;
  }

  /* For filtering purpose */
  const handlesearch = (e) => {
    const search = e.target.value;
    setSearchFuel(search);

    if (search !== "") {
      const filterData = receiveFuel.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilter(filterData);
    } else {
      setFilter(receiveFuel);
    }
  };
  return (
    <div className="px-2 lg:px-16 mt-5 mb-8">
      {/* <div className="grid gap-x-2 grid-cols-4 lg:grid-cols-8 h-12 card bg-[#5a23d9] rounded-lg justify-self-start mb-8">
        <Link to="/PgFuel" className="btn btn-secondary">
          Go BACK
        </Link>
        <h2 className="text-white lg:card-title font-bold col-start-2 col-span-2 lg:col-span-6 justify-self-center self-center">
          All Issued <p>Fuel Record</p>
        </h2>
        <Link to="/Dashboard/FuelUpdate" className="btn btn-secondary">
          GO FUEL UPDATE
        </Link>
      </div> */}
      <div className="flex justify-between border border-slate-400 p-4 rounded-lg">
        <input
          type="text"
          className="input input-bordered border-sky-400 w-full max-w-xs"
          placeholder="Enter search Keyword"
          onChange={(e) => {
            handlesearch(e);
          }}
        />
        <div>
          <CSVLink
            data={receiveFuel}
            filename="receiveFuel"
            className="btn btn-outline btn-accent mb-2"
          >
            <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />

            &nbsp;
          </CSVLink>
        </div>
      </div>
          {/* Pagination part */}
      <Pagination pageSize={pageSize} setPageSize={setPageSize}
        selectPage={selectPage} setSelectPage={setSelectPage}
        totalPage={totalPage} actualDataLength={actualDataLength}
      />
      
      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <TableCaption tableHeading="Issued Fuel Record" bgColor=''/>
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400 text-center">
              <th>SN</th>

              <th>Date</th>
              <th>Slip No</th>
              <th>PG No </th>
              <th>Vehicle No</th>
              <th>Site ID</th>
              <th>
                <div>Fuel</div>
                <div>Quantity</div>
              </th>
              <th>
                <div>Fuel</div>
                <div>Receiver</div>
              </th>
              <th>
                <div>Fuel</div>
                <div>Issuer</div>
              </th>
              {admin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {searchFuel.length > 1
              ? filter?.map((fuel, index) => (
                <AllFuelListRow
                  key={fuel._id}
                  fuel={fuel}
                  index={index}
                  setDelFuel={setDelFuel}
                  admin={admin}
                ></AllFuelListRow>
              ))
              : receiveFuel.map((fuel, index) => (
                <AllFuelListRow
                  key={fuel._id}
                  fuel={fuel}
                  index={index}
                  setDelFuel={setDelFuel}
                  admin={admin}
                ></AllFuelListRow>
              ))}
          </tbody>
        </table>
      </div>
      {delFuel && (
        <DeleteReceiveFuel
          delFuel={delFuel}
          setDelFuel={setDelFuel}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AllFuelList;
