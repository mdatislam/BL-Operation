import React, { useState } from 'react';
import * as XLSX from "xlsx";
import TableCaption from '../../Pages/SharedPage/TableCaption';
import { useDeleteShutDownDataMutation, usePostDataMutation } from '../../app/features/api/powerShutDown/powerShutDownApi';
import Loading from '../../Pages/SharedPage/Loading';
import { useNavigate } from 'react-router-dom';

const PowerShutDown = () => {
    const navigate = useNavigate()
    const [excelData, setData] = useState([]);

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            let parsedData = XLSX.utils.sheet_to_json(sheet);

            // Process the parsed data to replace spaces in headers with underscores
            if (parsedData.length > 0) {
                const headers = Object.keys(parsedData[0]);
                const newHeaders = headers.map(header => header.replace(/[-\s+]+/g, '_'));

                parsedData = parsedData.map(row => {
                    const newRow = {};
                    newHeaders.forEach((newHeader, index) => {
                        newRow[newHeader] = row[headers[index]];
                    });
                    return newRow;
                });
            }


            setData(parsedData);
        };
    }
    //console.log(excelData)

    const requiredData = excelData?.filter((item) =>
        item.Alarm_Slogan === "MAINS FAIL DELAY CKT ON"
        || item.Alarm_Slogan === "MAINS FAIL"
        || item.Alarm_Slogan === "LOW VOLTAGE"
        || item.Alarm_Slogan === "Genset On"
        || item.Alarm_Slogan === "CSL Fault"


    )

    console.log(requiredData)
    const [dataPost] = usePostDataMutation()

    const handleSubmit = (e) => {
        e.preventDefault()

        requiredData?.map((rawData, index) => {

            const alarmData = {
                Active_for: rawData.Active_for || "",
                Alarm_Slogan: rawData.Alarm_Slogan || "",
                In_house_Office: rawData.In_house_Office || "",
                District: rawData.District || "",
                Thana: rawData.Thana || "",
                Site: rawData.Site || "",
                Shared_Operator: rawData.Shared_Operator || "",
                Priority: rawData.Priority || "",
                Power_Status: rawData.Power_Status || "",

            }

            dataPost(alarmData)
            navigate("/OnCall/dashboardPowerShutDown")
            return rawData

        })

    }
    const [deletePreData] = useDeleteShutDownDataMutation()
    const handleDataDelete = () => {
        deletePreData()

    }

    return (
        <div >
            <label>
                <h5 className="bg-[#28c843df] flex justify-center items-center text-white text-xl font-bold h-12 mt-4 p-4 rounded-lg">
                    Upload Excel file
                </h5>
            </label>
            
            <form className="px-2" autoComplete="off" onSubmit={handleSubmit}>
                <div className="flex flex-row gap-x-4 justify-start items-center">
                    <div className=" flax flex-row  gap-2 form-control w-full max-w-xs  mt-4">
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            required
                            className="input input-bordered w-full max-w-xs py-2"
                        />{/* bellow mention is used for data stringify display into */}
                        {/* <pre>{JSON.stringify(excelData, null, 2)}</pre> */}
                    </div>
                    <div className='flex flex-row gap-5 align-middle items-center'>
                        {/* Delete button for previous Data delete */}
                        <div>
                            <button className='btn btn-md btn-warning'
                                onClick={handleDataDelete}
                            >Delete</button>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary mt-2">
                                Submit
                            </button>
                        </div>

                    </div>
                </div>
            </form>



            {excelData.length > 0 && (
                <table className="table w-3/4 mx-auto my-8">
                    <TableCaption tableHeading="Uploaded Excel file" />
                    <thead>
                        <tr className="border-2 border-blue-500 divide-x-2 px-4 divide-blue-400 text-start">
                            <th >SN</th>
                            {Object.keys(excelData[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {excelData.map((row, index) => (
                            <tr className="border-2 border-blue-500  hover divide-y-2 divide-x-2 divide-gray-500 text-center"
                                key={index}>
                                <td className="border-2 border-gray-500" >{index + 1}</td>
                                {Object.values(row).map((value, index) => (

                                    <td className="border-2 border-gray-500" key={index}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
};

export default PowerShutDown;