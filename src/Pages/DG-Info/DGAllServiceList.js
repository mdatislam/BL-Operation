import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../SharedPage/Loading";
import { CSVLink } from "react-csv";
import { ArrowDownTrayIcon,ChevronDoubleLeftIcon} from '@heroicons/react/24/solid'
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import DgAllServiceRows from "./DgAllServiceRows";
import useAdmin from "./../Hook/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";


const DGAllServiceList = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [isChecked, setIsChecked] = useState("");

  const navigate = useNavigate();
  /*  All DG service record */
  const {
    data: dgAllServiceInfo,
    isLoading,
    refetch,
  } = useQuery(["DgAllInfoList"], () =>
    fetch("https://blserver.bloperation.com/dgAllServiceInfo", {
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

  // console.log(services)
  if (isLoading) {
    return <Loading />;
  }

  const handleMultiDelete = () => {
    //console.log(isChecked)

    if (isChecked) {
      fetch(`https://blserver.bloperation.com/dgAllServiceInfo/multiDelete`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(isChecked),
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          if (data.deletedCount > 0) {
            toast.success(
              ` ${data.deletedCount} Nos record delete successfully`
            );
          }
          refetch();
          setIsChecked("");
        });
    } else {
      toast.error(" Please select min 1 row");
    }
  };

  //console.log(isChecked);
  return (
    <div className="mt-8 px-4 mb-4">
      <h2 className="flex rounded-lg  text-white bg-[#de2aeb] mb-4 h-12 justify-center items-center">
        DG All Servicing Record
      </h2>

      <div className=" flex justify-between  mb-8 rounded-lg border-2 p-4 ">
        <Link
          to="/DgServicing"
          className="flex btn btn-outline btn-primary btn-sm"
        >
          <ChevronDoubleLeftIcon  className="h-6 w-6 text-blue-500" />
        </Link>

        <Link
          to="/Dashboard/DgServicingUpdate"
          className="flex btn btn-outline btn-primary btn-sm"
        >
          Data UPDATE
        </Link>
        {/* For Data Export */}
        {admin && (
          <div>
            <CSVLink
              data={dgAllServiceInfo}
              filename="dgServiceInfo"
              className="flex btn btn-outline btn-primary btn-sm"
            >
              <ArrowDownTrayIcon  className="h-6 w-6 text-blue-500" />
              
            </CSVLink>
          </div>
        )}
      </div>
      {admin && (
        <button
          className="btn btn-sm btn-error mt-4"
          onClick={handleMultiDelete}
        >
          Delete
        </button>
      )}

      <div className="overflow-x-auto  mt-4">
        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
          <thead className="border-2 border-[#FFCB24]">
            <tr className="divide-x divide-blue-400">
              <th>
                <input type="checkbox" className="checkbox"></input>
              </th>
              <th>SN</th>
              <th>Site ID</th>

              <th>
                <div>previous</div>
                <div>DG Service Date</div>
              </th>

              <th>
                <div>Previous </div>
                <div>DG RH</div>
              </th>
              <th>
                <div>Previous</div>
                <div>Battery SN</div>
              </th>

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
            {dgAllServiceInfo?.map((dgInfo, index) => (
              <DgAllServiceRows
                key={dgInfo._id}
                dgInfo={dgInfo}
                index={index}
                setIsChecked={setIsChecked}
                isChecked={isChecked}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DGAllServiceList;
