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
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import Pagination from "../Pages/SharedPage/Pagination";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import TableCaption from '../Pages/SharedPage/TableCaption'
import { toast } from "react-toastify";

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
  const [firstDay, setFirstDay] = useState("")
  const [lastDay, setLastDay] = useState("")

  useEffect(() => {
    if (firstDay > lastDay) {
      toast.error("Last date is less then first date,Please correct")
    }
  }, [firstDay, lastDay])


  useEffect(() => {
    const getLengthData = async () => {
      const { data } = await axiosSecure.get(`/fuelListAll/count?firstDay=${firstDay}&lastDay=${lastDay}`)
      const page = data.lengthOfData
      setDataLength(page)
      const pageCount = Math.ceil(page / pageSize)
      setTotalPage(pageCount)
      if (pageCount < selectPage) {
        setSelectPage(1)
      }
    }
    getLengthData()

  }, [pageSize, selectPage, totalPage, actualDataLength, axiosSecure, firstDay, lastDay])

  useEffect(() => {
    const now = new Date();
    //console.log(now);
    // Calculate the first day of the current month
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    //console.log(firstDayOfMonth);
    // Calculate the last day of the current month
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    //console.log(lastDayOfMonth);

    // Format the dates to YYYY-MM-DD
    const formatDate = (date) => date.toLocaleDateString("en-CA");

    setFirstDay(formatDate(firstDayOfMonth));
    setLastDay(formatDate(lastDayOfMonth));
  }, []);

  const { isLoading, data: receiveFuel = [], refetch } = useQuery({
    queryKey: ["receiveFuel", pageSize, selectPage, firstDay, lastDay],
    queryFn: async () => {
      const res = await axiosSecure.get(`/fuelListAll?size=${pageSize}&page=${selectPage}
        &firstDay=${firstDay}&lastDay=${lastDay}`)
      return res.data
    }
  })
  //console.log(receiveFuel)
  const totalFuel = receiveFuel.reduce((pre, item) => {
    return pre + parseInt(item.fuelQuantity)
  }, 0)

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

      <div className="flex justify-between border border-slate-400 p-4 rounded-lg">
        <input
          type="text"
          className="input input-bordered border-sky-400 w-full max-w-xs"
          placeholder="Enter search Keyword"
          onChange={(e) => {
            handlesearch(e);
          }}
        />

        <label className="input input-bordered flex items-center font-semibold gap-2">
          First-Date:
          <input
            type="date"
            defaultValue={firstDay}
            className="grow"
            placeholder="start date"
            onChange={(e) => {
              setFirstDay(e.target.value);
            }}
          />
        </label>
        <label className="input input-bordered flex items-center font-semibold gap-2">
          Last-Date:
          <input
            type="date"
            defaultValue={lastDay}
            className="grow"
            onChange={(e) => {
              setLastDay(e.target.value);
            }}
          />
        </label>
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
      {/* <p className="text-center font-bold text-blue-500">Total Fuel Issued:{totalFuel}</p> */}

      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <TableCaption tableHeading={`Issued Fuel : ${totalFuel} Liter`} bgColor={"bg-blue-500"} />
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
