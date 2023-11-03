import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import auth from "./../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import useAdmin from "./../Pages/Hook/useAdmin";
import FcuMaintenanceListRow from "./FcuMaintenanceListRow";
import { ArrowDownTrayIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import FcuFilterDel from "./FcuFilterDel";
import Loading from "../Pages/SharedPage/Loading";
import TableCaption from "../Pages/SharedPage/TableCaption";


const FcuMaintenanceList = () => {
  const [user,loading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const [axiosSecure] = useAxiosSecure()
  const [del, setDel] = useState("")
  const [searchFCU, setSearchFCU] = useState("");
  const [filter, setFilter] = useState([]);

  const {isLoading , data: fcuFilterRecord = [], refetch} = useQuery({
    queryKey: ["fcuFilterRecord"],
   // enabled: !adminLoading,
    queryFn: async () => {
      const res = await axiosSecure.get("/fcuFilterChangeLatestRecord")
      return res.data
    }
  })

  if(loading || adminLoading ||isLoading){
    <Loading/>
  }

  //console.log(del)

  /* For filtering purpose */
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchFCU(search);

    if (search !== "") {
      const filterData = fcuFilterRecord.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilter(filterData);
    } else {
      setFilter(fcuFilterRecord);
    }
  };

  return (
    <div className="bg-teal-300 h-100 px-8">
      <div className=" mx-auto ">
        <div className=" flex flex-col md:flex-row justify-between px-2 gap-y-2 mb-2 rounded-lg border-2 py-4">
          <Link to="/Home" className="flex sm:btn-sm btn btn-secondary btn-sm">
            <ChevronDoubleLeftIcon className="h-6 w-6 text-blue-500" />

          </Link>
          {/* For filter input box */}
          
            <input
              type="text"
              className="input input-bordered border-orange-400 bg-white w-full max-w-xs flex-auto"
              placeholder="Enter search Keyword"
              onChange={(e) => {
                handleSearch(e);
              }}
            />
         

          <Link
            to="/Dashboard/FcuServiceUpdate"
            className="flex btn btn-outline btn-primary btn-sm"
          >
            Data UPDATEEE
          </Link>

          {/* FCU filter calcultion */}

          <Link
            to="/fcuMaterial"
            className="flex btn btn-outline btn-primary btn-sm"
          >
            FCU Material
          </Link>

          {/* For Data upload button */}
          {admin && (
            <Link
              to="/FcuDataUpload"
              className="flex btn btn-outline btn-primary btn-sm"
            >
              Data Import
            </Link>
          )}

          {/* For Data Export */}
          {admin && (
            <div>
              <CSVLink
                data={fcuFilterRecord}
                filename="fcuServiceRecord"
                className="flex btn btn-outline btn-primary btn-sm"
              >
                <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />

              </CSVLink>
            </div>
          )}
        </div>

        

        <div className="overflow-x-auto  mt-4">
          <table className=" table table-auto w-full  border border-3 border-slate-600 mt-2">
            <TableCaption tableHeading="FCU Filter Changing Records" bgColor="#74992f"/>
            <thead className="border-2 border-[#FFCB24]">
              <tr className="divide-x divide-blue-400 text-center">
                <th className="">SN</th>
                {admin && <th>Action</th>}
                <th>Site ID</th>
                <th>
                  <div>FCU </div>
                  <div>Brand</div>
                </th>
                <th>
                  <div>Service</div>
                  <div>Type</div>
                </th>
                <th>
                  <div>FCU</div>
                  <div>Status</div>
                </th>

                <th>
                  <div>Pre Service</div>
                  <div> Date</div>
                </th>
                <th>
                  <div>Latest Service</div>
                  <div>Date</div>
                </th>
                <th className="text-[#5d9655]">
                  <div>Next Plan</div>
                  <div>Date</div>
                </th>

                <th>
                  <div>Update</div>
                  <div>By</div>
                </th>
                <th>Remarks</th>

              </tr>
            </thead>
            <tbody>
              {searchFCU.length > 1 ?
                filter?.map((fcuInfo, index) => (
                  <FcuMaintenanceListRow
                    key={fcuInfo._id}
                    fcuInfo={fcuInfo}
                    index={index}
                    setDel={setDel}
                    admin={admin}
                  />
                ))
                : fcuFilterRecord?.map((fcuInfo, index) => (
                  <FcuMaintenanceListRow
                    key={fcuInfo._id}
                    fcuInfo={fcuInfo}
                    index={index}
                    setDel={setDel}
                    admin={admin}
                  />
                ))}
            </tbody>
          </table>
          {del && <FcuFilterDel id={del} setDel={setDel} refetch={refetch}

          />
          }
        </div>
      </div>
    </div>
  );
};

export default FcuMaintenanceList;
