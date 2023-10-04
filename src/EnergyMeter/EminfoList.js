import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Pages/SharedPage/Loading";
import EmInfoListRow from "./EmInfoListRow";
import { CSVLink } from "react-csv";
import { signOut } from "firebase/auth";
import auth from "../firebase.init";
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";

const EminfoList = () => {
  const [axiosSecure] = useAxiosSecure()
  const [searchEmInfo, setSearchEmInfo] = useState("");
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();
  const { data: EmInfo, isLoading } = useQuery({
    queryKey: ['EmInfo'],
    queryFn: async () => {
      const res = await axiosSecure.get("/emInfo")
      return res.data
    }
  })


  // console.log(services)
  if (isLoading) {
    return <Loading />;
  }

  /* For filtering purpose */
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchEmInfo(search);

    if (search !== "") {
      const filterData = EmInfo.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilter(filterData);
    } else {
      setFilter(EmInfo);
    }
  };
  return (
    <div className="mt-8 px-4 mb-4">
      <div className="grid grid-cols-4 lg:grid-cols-8 h-12 card bg-[#008282] rounded-lg justify-self-start mb-8 gap-x-16">
        <Link to="/Home" className="btn btn-secondary">
          Go Home
        </Link>
        <h2 className="stat-title lg:card-title font-bold col-start-2 col-span-2 lg:col-span-6 justify-self-center self-center text-white">
          All Energy Meter <p>updated Record</p>
        </h2>
        <Link to="/Dashboard/EMDataUpdate" className="btn btn-Primary">
          GO EM Info UPDATE
        </Link>
      </div>

      {/* For filter input box */}
      <div className="flex  justify-between flex-wrap gap-4">

        <input
          type="text"
          className="input input-bordered border-sky-400 w-full max-w-xs flex-auto"
          placeholder="Enter search Keyword/Site Id number"
          onChange={(e) => {
            handleSearch(e);
          }}
        />

        <div>
          <CSVLink
            data={EmInfo}
            filename="EnergyMeterInfo"
            className="btn btn-outline btn-info mb-2 flex-auto"
          >
            <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />
            &nbsp; Download
          </CSVLink>
        </div>
      </div>
      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full  ">
          <thead className="border-2 border-[#FFCB24] ">
            <tr className="divide-x divide-sky-400">
              <th>SN</th>
              <th>Site ID</th>

              <th>
                <div>previous</div>
                <div>Collected Date</div>
              </th>

              <th>
                <div>Energy Meter </div>
                <div>Serial No</div>
              </th>
              <th>
                <div>Previous</div>
                <div>EM Reading</div>
              </th>

              <th>
                <div>Latest</div>
                <div>Uploaded Date</div>
              </th>

              <th>
                <div>Latest EM </div>
                <div>Serial No</div>
              </th>
              <th>
                <div>Latest</div>
                <div>EM Reading</div>
              </th>
              <th>
                <div>Latest</div>
                <div>Peak Reading</div>
              </th>
              <th>
                <div>Latest</div>
                <div>offPeak Reading</div>
              </th>
              <th>
                <div>DC</div>
                <div>Load Current</div>
              </th>
              <th>
                <div>EM Reading</div>
                <div>Picture</div>
              </th>
              <th>
                <div>Info</div>
                <div>Collector</div>
              </th>

              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {searchEmInfo.length > 1
              ? filter.map((emInfo, index) => (
                <EmInfoListRow
                  key={emInfo._id}
                  emInfo={emInfo}
                  index={index}
                />
              ))
              : EmInfo?.map((emInfo, index) => (
                <EmInfoListRow
                  key={emInfo._id}
                  emInfo={emInfo}
                  index={index}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EminfoList;
