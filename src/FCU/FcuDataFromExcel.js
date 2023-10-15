import React from "react";
import FcuDataFromExcelRow from "./FcuDataFromExcelRow";
import auth from "./../firebase.init";
import * as XLSX from "xlsx";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import {  format } from "date-fns";
import Swal from "sweetalert2";

const FcuDataFromExcel = () => {
  // const [admin]=useAdmin()
  // on change states
  const [user] = useAuthState(auth)
  const [axiosSecure] = useAxiosSecure()
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects
  // console.log(excelData);

  // handle File
  const fileType = ["application/vnd.ms-excel"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      //console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only .xls file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your excel file");
    }
  };

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    } else {
      setExcelData(null);
    }
  };
  //console.log(excelData)

  const ExcelDateToJSDate = (serial) => {
    const utcDays = Math.floor(serial - 25569);
    const utcValue = utcDays * 86400;
    const dateInfo = new Date(utcValue * 1000);
    const year = dateInfo.getFullYear();
    const month = dateInfo.getMonth() + 1;
    const day = dateInfo.getDate();

    return format(new Date(year, month - 1, day), 'dd-MM-yyyy');
  };

  excelData?.map((fcuInfo) => {
    const siteID = fcuInfo.siteId;

    const installationDate = fcuInfo.installationDate;
    const formattedInstallDate = ExcelDateToJSDate(installationDate);
   // console.log(formattedInstallDate)

    const preDate = fcuInfo.preServiceDate;
    const formattedPreDate = ExcelDateToJSDate(preDate);
   // console.log(formattedPreDate)
    const latestDate = fcuInfo.latestServiceDate;
    const formattedLatestDate = ExcelDateToJSDate(latestDate);

    //console.log(formattedLatestDate)
    const planDate = fcuInfo.nextPlanDate;
    const formattedNextServiceDate = ExcelDateToJSDate(planDate);

    //console.log(formattedNextServiceDate)


    const fcuData = {
      siteId: fcuInfo.siteId,
      office: fcuInfo.office,
      siteType: fcuInfo.siteType,
      coolingSystem: fcuInfo.coolingSystem,
      fcuBrand: fcuInfo.fcuBrand,
      installationDate: formattedInstallDate,
      preServiceDate: formattedPreDate,
      latestServiceDate: formattedLatestDate,
      nextPlanDate: formattedNextServiceDate,
      serviceType:fcuInfo.serviceType,
      fcuStatus:fcuInfo.fcuStatus
    };

    axiosSecure.post("/fcuFilterChangeAllRecord", fcuData)
      

    axiosSecure.put(`/fcuFilterChangeLatestRecord/${siteID}`, fcuData)
      .then(putRes => {
        if(putRes.data.acknowledge){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Fcu data has been saved',
            showConfirmButton: false,
            timer: 2000
        })
        }
      })
    return fcuData
  });

  return (
    <>
      <div className="my-4 h-screen px-2">
        <form className="px-2" autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <h5 className="bg-[#28c843df] flex justify-center items-center text-white text-xl font-bold h-12 mt-4 p-4 rounded-lg">
              Upload Excel file
            </h5>
          </label>
          <h4 className="text-xl text-center font-bold text-pink-600 mt-2">
            **Heading of Excel sheet must contain bellow name without space**
          </h4>
          <div className=" w-3/4 mx-auto border-2 m-4">
            <thead className="">
              <tr className="border-2 divide-x-2 px-4 divide-blue-400 text-start">
                <th>siteId</th>
                <th>office</th>
                <th>siteType</th>
                <th>
                  <div>cooling</div>
                  <div>System</div>
                </th>
                <th>fcuBrand</th>
                <th>
                  <div>installation</div>
                  <div>Date</div>
                </th>
                <th>
                  <div>PreService</div>
                  <div>Date</div>
                </th>
                <th>
                  <div>latestService</div>
                  <div>Date</div>
                </th>
                <th>
                  <div>nextPlan</div>
                  <div>Date</div>
                </th>
                <th>
                  <div>service </div>
                  <div>Type</div>
                </th>
                <th>fcuStatus</th>
              </tr>
            </thead>
          </div>

          <div className="flex flex-row gap-x-4 justify-start items-center">
            <div className="form-control w-full max-w-xs  mt-4">
              <input
                type="file"
                onChange={handleFile}
                required
                className="input input-bordered w-full max-w-xs py-2"
              />
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </div>
          <label className="label">
            <span className="label-text font-bold text-warning">
              **File Type Should (.xls)**
            </span>
          </label>
          <label className="label"></label>
          {excelFileError && (
            <div
              className="font-bold text-red-600"
              style={{ marginTop: 5 + "px" }}
            >
              {excelFileError}
            </div>
          )}
        </form>

        <h5 className="flex justify-center items-center text-white text-xl font-bold h-12 mt-4 p-4 rounded-lg bg-[#6e3790] px-2">
          View Excel file
        </h5>
        <div className=" text-center font-bold ">
          {excelData === null && <>No file selected</>}
          {excelData !== null && (
            <div className="overflow-x-auto  mt-4">
              <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
                <thead className="border-2 border-[#FFCB24]">
                  <tr className="divide-x divide-blue-400 text-center">
                    <th>SNo</th>
                    <th>Site ID</th>
                    <th>Office</th>
                    <th>Site Type</th>
                    <th>
                      <div>Cooling</div>
                      <div>System</div>
                    </th>
                    <th>FCU Brand</th>
                    <th>
                      <div>Installation</div>
                      <div>Date</div>
                    </th>
                    <th>
                      <div>Service</div>
                      <div>Type</div>
                    </th>
                    <th>
                      <div>Pre Service</div>
                      <div>Date</div>
                    </th>
                    <th>
                      <div>Latest Service</div>
                      <div>Date</div>
                    </th>
                    <th>
                      <div>Next Plan</div>
                      <div>Date</div>
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
                      <div>Updated</div>
                      <div>By</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {excelData?.map((data, index) => (
                    <FcuDataFromExcelRow
                      key={index}
                      data={data}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* Existing stie data upload code */}
    </>
  );
};

export default FcuDataFromExcel;
