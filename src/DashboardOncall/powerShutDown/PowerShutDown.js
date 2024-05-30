import React, { useEffect, useState } from 'react';
import * as XLSX from "xlsx";
import TableCaption from '../../Pages/SharedPage/TableCaption';
import { useDeleteShutDownDataMutation, usePostDataMutation } from '../../app/features/api/powerShutDown/powerShutDownApi';
import Loading from '../../Pages/SharedPage/Loading';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PowerShutDown = () => {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const [btnVisible, setBtnVisible] = useState(true)

    const [excelData, setData] = useState([]);

    const [deletePreData, { isLoading }] = useDeleteShutDownDataMutation()

    const handleDataDelete = () => {

        deletePreData().then((data) => {
            //console.log(data)
            if (data.data.acknowledged || data.data.deletedCount > 0) {
                setVisible(true)
                toast.success(" Pre Data Deleted done")
            }
        })


    }
    // console.log(isLoading,data,status)

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
            setBtnVisible(false)

        };
    }
    // console.log(excelData)

    const requiredData = excelData?.filter((item) =>
        item.Alarm_Slogan === "MAINS FAIL DELAY CKT ON"
        || item.Alarm_Slogan === "MAINS FAIL"
        || item.Alarm_Slogan === "LOW VOLTAGE"
        || item.Alarm_Slogan === "Genset On"
        || item.Alarm_Slogan === "CSL Fault"
        || item.Alarm_Slogan === "Alarm_Raised_Date"
        || item.Alarm_Slogan === "Alarm_Raised_Time"
    )

    // console.log(requiredData)
    const [dataPost, { isLoading: isLoading2, }] = usePostDataMutation()

    const handleSubmit = (e) => {
        e.preventDefault()
        const pgUtilization = {
            BL_PG: {
                pgType: "BL_PG",
                active: e.target.ownActivePg.value,
                run: e.target.ownPgRun.value,
                move: e.target.ownPgMove.value,
            },

            Sup_PG: {
                pgType: "Sup_PG",
                active: e.target.supportActivePg.value || "",
                run: e.target.supportPgRun.value || "",
                move: e.target.supportPgMove.value || "",
            },
            remarks: e.target.remarks.value

        }

        dataPost(pgUtilization)
        // console.log(PgUtilizationInfo)
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

    if (isLoading || isLoading2) {
        return <Loading />
    }
    return (
        <div >

            <div className="card w-3/4 my-2 mx-auto bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className='flex flex-row gap-3 border-3 p-3 rounded-md border-emerald-300 bg-slate-100'>
                        <h2 className="card-title text-center"> Delete Previous Data---</h2>
                        <div>
                            {/* Delete button for previous Data delete */}
                            <div>
                                <button className="btn btn-outline btn-warning "
                                    onClick={handleDataDelete}
                                > Delete 
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {visible && <div >
                            <form className="px-2" autoComplete="off" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-x-4 justify-start items-center">
                                    <label className="form-control w-full max-w-xs my-2">
                                        <div className="label">
                                            <span className="label-text text-pink-400 font-bold">Choose downloaded UMS Alarm .csv file.</span>
                                        </div>
                                        <input type="file" required
                                            onChange={handleFileUpload}  className="input input-bordered w-full max-w-xs" />
                                    </label>
                                    <div className='flex flex-row gap-2'>
                                        <label className="form-control w-full max-w-xs">
                                            <input type="text" name="ownActivePg" placeholder="Bl Own Active PG No" className="input input-bordered w-full max-w-xs" />
                                        </label>
                                        <label className="form-control w-full max-w-xs">
                                            <input type="text" name="ownPgRun" placeholder="Bl Own Pg Run" className="input input-bordered w-full max-w-xs" />
                                        </label>
                                        <label className="form-control w-full max-w-xs">
                                            <input type="text" name="ownPgMove" placeholder="Bl Own Pg Move" className="input input-bordered w-full max-w-xs" />
                                        </label>
                                    </div>
                                    {/* Support pg info */}
                                    <div className='flex flex-row gap-2 mt-3'>
                                        <label className="form-control w-full max-w-xs">
                                            <input type="text" name="supportActivePg" placeholder="Support Active PG No if have" className="input input-bordered w-full max-w-xs" />
                                        </label>
                                        <label className="form-control w-full max-w-xs">
                                            <input type="text" name="supportPgRun" placeholder="Support Pg Run if have" className="input input-bordered w-full max-w-xs" />
                                        </label>
                                        <label className="form-control w-full max-w-xs">
                                            <input type="text" name="supportPgMove" placeholder="Support Pg Move if have" className="input input-bordered w-full max-w-xs" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className=" form-control w-full  text-left mt-2">
                                            <textarea type="text" name="remarks" placeholder=" remarks if have" className="input input-bordered w-full  " />
                                        </label>
                                    </div>
                                    <div className='flex flex-row gap-5 align-middle items-center'>

                                        <div>
                                            <button type="submit" disabled={btnVisible} className="btn btn-info mt-2">
                                                View Power Shutdown Dashboard !
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>}
                    </div>
                </div>

                {/*  To display input data after uploaded */}
                {/* bellow mention is used for data stringify display into */}
                {/* <pre>{JSON.stringify(excelData, null, 2)}</pre> */}

                {excelData.length > 0 && (
                    <table className="table w-3/4 mx-auto my-8">
                        <TableCaption tableHeading="Uploaded Data" />
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

        </div>
    );
};

export default PowerShutDown;