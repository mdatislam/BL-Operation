import React, { useState } from 'react';
import FetchExcelTableRow from './FetchExcelTableRow';
import * as XLSX from "xlsx";
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from './../SharedPage/Loading';
import { useQuery } from '@tanstack/react-query';

const FetchExcelToJson = () => {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects
 // console.log(excelData);
  const navigate = useNavigate();
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

  excelData?.map(siteInfo => {
    const siteID = siteInfo.siteId
    //console.log(siteID);

    
     const siteData = {
       siteId: siteInfo.siteId,
       lat: siteInfo.lat,
       long: siteInfo.long,
       priority: siteInfo.priority,
       shareId: siteInfo.shareId,
       batteryInfo: siteInfo.batteryInfo,
       batteryBackup: siteInfo.batteryBackup,
       rectifierInfo: siteInfo.rectifierInfo,
       connectedSite: siteInfo.connectedSite,
       address:siteInfo.address
       
     };
    fetch(`http://localhost:5000/siteInfo/${siteID}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(siteData),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          // toast.error("Unauthorize access");
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/Login");
        }
        return res.json();
      })
     /*  .then((dgData) => {
        //console.log(dgData);
        if (dgData.upsertedCount || dgData.modifiedCount) {
          toast.success("Data Successfully Update");
        }
       
      }); */
    return siteData
   
 })
 
  const { data:siteDataInfo, isLoading } = useQuery(["sitelist"], () =>
    fetch(" http://localhost:5000/siteInfo", {
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

  return (
    <>
      <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
        <label>
          <h5>Upload Excel file</h5>
        </label>

        <input type="file" onChange={handleFile} required></input>
        {excelFileError && (
          <div className="" style={{ marginTop: 5 + "px" }}>
            {excelFileError}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: 5 + "px" }}
        >
          Submit
        </button>
      </form>

      <h5>View Excel file</h5>
      <div className="">
        {excelData === null && <>No file selected</>}
        {excelData !== null && (
          <div className="overflow-x-auto  mt-4">
            <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600">
              <thead className="border-2 border-[#FFCB24]">
                <tr className="divide-x divide-blue-400 text-center">
                  <th>SNo</th>
                  <th>Site ID</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Priority</th>
                  <th>
                    <div>Share Site</div>
                    <div>Code</div>
                  </th>
                  <th>
                    <div>Connected</div>
                    <div>Site</div>
                  </th>
                  <th>
                    <div>Battery</div>
                    <div>Info</div>
                  </th>
                  <th>
                    <div>Battery</div>
                    <div>Backup</div>
                  </th>
                  <th>
                    <div>Rectifier</div>
                    <div>Info</div>
                  </th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {excelData?.map((data, index) => (
                  <FetchExcelTableRow key={index} data={data} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};        

export default FetchExcelToJson;