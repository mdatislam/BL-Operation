import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../SharedPage/Loading";
import { CSVLink } from "react-csv";
import DgServicingInfoRow from "./DgServicingInfoRow";
import auth from "../../firebase.init";
import useAdmin from "../Hook/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import useAxiosSecure from "../Hook/useAxiosSecure";
import TableCaption from '../../Pages/SharedPage/TableCaption';
import LubOilBalance from "./LubOilBalance";



const DgServicingInfo = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [isChecked, setIsChecked] = useState("");
  const [axiosSecure] = useAxiosSecure()


  const { isLoading, data: dgService = [], refetch } = useQuery({
    queryKey: ["dgService"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dgServiceInfo")
      return res.data
    }
  })



  // console.log(services)
  if (isLoading) {
    return <Loading />;
  }

  const handleMultiDelete = () => {
    //console.log(isChecked)

    if (isChecked) {
      axiosSecure.delete("/dgServiceInfo/multiDelete", isChecked)

        .then((data) => {
          //console.log(data);
          if (data.deletedCount > 0) {
            toast.success(
              ` ${data.deletedCount} Nos record delete successfully`
            );
          }
          refetch();
          setIsChecked(null);
        });
    } else {
      toast.error(" Please select min 1 row");
    }
  };

  //console.log(isChecked);
  return (
    <div className=" bg-slate-200 ">
      <div className=" px-2 lg:w-3/4 mx-auto ">
        <div className=" border-2 border-slate-300 py-4 mt-2 rounded-lg
          flex flex-col flex-nowrap lg:flex-row justify-between items-center ">
          <div className="flex justify-between gap-2 px-2">
            <Link
              to="/DgAllServicing"
              className="btn  btn-sm btn-outline btn-info  mb-2"
            >
              All Service
            </Link>
            <Link
              to="/DgPlanServicing"
              className="btn  btn-sm btn-outline btn-info  mb-2"
            >
              Plan site
            </Link>

            <Link
              to="/Dashboard/DgServicingUpdate"
              className="btn  btn-sm btn-outline btn-info  mb-2"
            >
              Data UPDATE
            </Link>
          </div>
          <LubOilBalance />

          <div className="flex flex-row justify-between items-center gap-x-3">
            <div>
              {admin && (
                <button
                  className="btn btn-sm btn-error"
                  onClick={handleMultiDelete}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              {admin && (
                <Link
                  to="/ServiceMaterial"
                  className="btn  btn-sm btn-outline btn-info"
                >
                  Service-Material
                </Link>
              )}
            </div>
            {/* For only last service Data Export */}
            {admin && (
              <div className="lg:px-4 ">
                <CSVLink
                  data={dgService}
                  filename="dgServiceInfo"
                  className="btn btn-outline btn-sm btn-primary mb-2"
                >
                  <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />
                </CSVLink>
              </div>
            )}
          </div>
        </div>
       

        <div className="overflow-x-auto  mt-4">
          <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
            <TableCaption tableHeading=" Latest DG Servicing Record" />
            <thead className="border-2 border-[#FFCB24]">
              <tr className="divide-x divide-blue-400">
                <th>
                  <input type="checkbox" className="checkbox"></input>
                </th>
                <th>SN</th>
                {admin && <th>Action</th>}
                <th>Site ID</th>
                <th>
                  <div>Latest</div>
                  <div>Service Date</div>
                </th>

                <th>
                  <div>Latest </div>
                  <div>DG RH</div>
                </th>
                <th>
                  <div>Latest</div>
                  <div>Battery SN</div>
                </th>
                <th>
                  <div>Air Filter</div>
                  <div>Use Status</div>
                </th>

                <th>
                  <div>DG RH</div>
                  <div>Picture</div>
                </th>
                <th>
                  <div>DG Service</div>
                  <div>Collector</div>
                </th>

                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {dgService?.map((dgInfo, index) => (
                <DgServicingInfoRow
                  key={dgInfo._id}
                  dgInfo={dgInfo}
                  setIsChecked={setIsChecked}
                  isChecked={isChecked}
                  index={index}
                  axiosSecure={axiosSecure}
                  admin={admin}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DgServicingInfo;
