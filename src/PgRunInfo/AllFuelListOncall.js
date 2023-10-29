import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import useAdmin from "../Pages/Hook/useAdmin";
import Loading from "../Pages/SharedPage/Loading";
import AllFuelListRowsOncall from "./AllFuelListRowsOncall";
import { CSVLink } from "react-csv";
import { signOut } from "firebase/auth";
import DeleteFuelOnCall from "./DeleteFuelOnCall";
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import Pagination from "../Pages/SharedPage/Pagination";
import TableCaption from "../Pages/SharedPage/TableCaption";

const AllFuelListOncall = () => {
  const [searchFuel, setSearchFuel] = useState("");
  const [filter, setFilter] = useState([]);
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [axiosSecure] = useAxiosSecure()
  const [delFuel, setDelFuel] = useState("");


  /* For Pagination code */
  const [selectPage, setSelectPage] = useState("0")
  const [pageSize, setPageSize] = useState("30");
  const [totalPage, setTotalPage] = useState(2)
  const [actualDataLength, setDataLength] = useState("10")


  useEffect(() => {
    const getLengthData = async () => {
      const { data } = await axiosSecure.get("/onCall/fuelListAll/count")
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


  const { isLoading, data: receiveFuelOncall = [],refetch } = useQuery({
    queryKey: ["receiveFuelOncall", pageSize, selectPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/onCall/fuelListAll?size=${pageSize}&page=${selectPage}`)
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
      const filterData = receiveFuelOncall.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilter(filterData);
    } else {
      setFilter(receiveFuelOncall);
    }
  };
  return (
    <div className="  card w-full bg-base-100 shadow-xl px-2 lg:px-8 mt-2 mb-8">
      {/* <div className="grid gap-x-2 grid-cols-4 lg:grid-cols-8 h-12 card bg-[#5a23d9] rounded-lg justify-self-start mb-8">
        <Link to="/PgFuel" className="btn btn-secondary">
          Go BACK
        </Link>
        <h2 className="text-white lg:card-title font-bold col-start-2 col-span-2 lg:col-span-6 justify-self-center self-center">
          All Issued <p>Fuel Record_Oncall</p>
        </h2>
        <Link to="/Dashboard/FuelUpdateOnCall" className="btn btn-secondary">
          GO FUEL UPDATE
        </Link>
      </div> */}
      <div className=" border border-slate-300 flex justify-between mt-2 p-4 rounded-lg">
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
            data={receiveFuelOncall}
            filename="receiveFuelOncall"
            className="btn btn-outline btn-accent mb-2"
          >
            <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />

            &nbsp;
          </CSVLink>
        </div>
      </div>

      {/* pagination part */}

      <Pagination pageSize={pageSize} setPageSize={setPageSize}
        selectPage={selectPage} setSelectPage={setSelectPage}
        totalPage={totalPage} actualDataLength={actualDataLength}
      />
      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <TableCaption tableHeading="All Issued Record_Oncall" />
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400 text-center">
              <th>SN</th>

              <th>Date</th>
              <th>Slip No</th>
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
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {searchFuel.length > 1
              ? filter?.map((fuel, index) => (
                <AllFuelListRowsOncall
                  key={fuel._id}
                  fuel={fuel}
                  index={index}
                  setDelFuel={setDelFuel}
                  admin={admin}
                ></AllFuelListRowsOncall>
              ))
              : receiveFuelOncall.map((fuel, index) => (
                <AllFuelListRowsOncall
                  key={fuel._id}
                  fuel={fuel}
                  index={index}
                  setDelFuel={setDelFuel}
                  admin={admin}
                ></AllFuelListRowsOncall>
              ))}
          </tbody>
        </table>
      </div>
      {delFuel && (
        <DeleteFuelOnCall
          delFuel={delFuel}
          setDelFuel={setDelFuel}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AllFuelListOncall;
