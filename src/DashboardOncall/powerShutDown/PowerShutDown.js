import React, { useEffect, useState } from 'react';
import * as XLSX from "xlsx";
import TableCaption from '../../Pages/SharedPage/TableCaption';
import { useDeleteShutDownDataMutation, usePostDataMutation } from '../../app/features/api/powerShutDown/powerShutDownApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const PowerShutDown = () => {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const [btnVisible, setBtnVisible] = useState(true)
    const [pgInfoVisible, setPgInfoVisible] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [excelData, setData] = useState([]);
    const { register, formState: { errors }, handleSubmit, } = useForm();

    const [deletePreData, { isLoading }] = useDeleteShutDownDataMutation()

    const handleDataDelete = () => {

        deletePreData().then((data) => {
            //console.log(data)
            if (data.data.acknowledged || data.data.deletedCount > 0) {
                setVisible(true)
                //toast.success(" Pre Data Deleted done")
            }
        })


    }
    // console.log(isLoading,data,status)

    const handleFileUpload = (e) => {
        setLoadingData(true)
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
            setLoadingData(false)
            setData(parsedData);
        };

        setBtnVisible(false)
        setPgInfoVisible(true)
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

    if (loadingData) {
        return <p className='text-warning text-3xl text-center mt-40'> "Data Loading  Please Wait....</p>
    }

    const onSubmit = (data) => {
        //console.log({ ...data })
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
            return rawData

        })
        
        dataPost({ ...data, pgType: "pgRun" }).then((data) => {
            // console.log(data)
            if (data.data.acknowledged) {
                toast.success("Upload success & View Dashboard !!!")
                navigate("/dashboardPowerShutDown")
            }
        })

    }

    if (isLoading || isLoading2) {
        return (
            <div>
                <p className='text-pink-400 text-3xl text-center mt-40'> "Data upLoading Please Wait.....
                    
                </p>

            </div>
        )
    }
    return (
        <div >

            <div className="card px-4 mx-5 my-4  bg-base-100 shadow-xl">
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

                            <form className="px-2" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-x-4 justify-start items-center">
                                    <label className="form-control w-full max-w-xs my-2">
                                        <div className="label">
                                            <span className="label-text text-pink-400 font-bold">Choose downloaded UMS Alarm .csv file.</span>
                                        </div>
                                        <input type="file"
                                            onChange={handleFileUpload} className="input input-bordered w-full max-w-xs" />
                                    </label>
                                    {/*  PG run data input part */}

                                    {/*  BL_PG Run Info*/}
                                    {pgInfoVisible && <div>
                                        <div className='card bg-zinc-200 shadow-xl  py-5 px-4'>
                                            <h1 className='text-center text-pink-400 underline text-xl mb-2 font-bold font-sans'> PG Run Info</h1>
                                            <div className='flex flex-row gap-2'>
                                                <label className="input input-bordered flex font-bold items-center gap-2">
                                                    BL Active PG No :
                                                    <input className='grow'
                                                        type="number"
                                                        defaultValue="0"
                                                        {...register("blActivePg", {
                                                            required: {
                                                                value: true,
                                                                message: " BL active Pg no required",
                                                            },
                                                        })}
                                                    />
                                                    <label className="label">
                                                        {errors.blActivePg?.type === "required" && (
                                                            <span className="label-text-alt text-red-500">
                                                                {errors.blActivePg.message}
                                                            </span>
                                                        )}
                                                    </label>
                                                </label>

                                                <label className="input input-bordered flex font-bold items-center gap-2">
                                                    BL PG Run :
                                                    <input className='grow'
                                                        type="number"
                                                        defaultValue="0"
                                                        {...register("blPgRun", {
                                                            required: {
                                                                value: true,
                                                                message: " BL PG Run no required",
                                                            },
                                                        })}
                                                    />
                                                    <label className="label">
                                                        {errors.blPgRun?.type === "required" && (
                                                            <span className="label-text-alt text-red-500">
                                                                {errors.blPgRun.message}
                                                            </span>
                                                        )}
                                                    </label>
                                                </label>

                                                <label className="input input-bordered flex font-bold items-center gap-2">
                                                    BL PG Move :
                                                    <input className='grow'
                                                        type="number"
                                                        defaultValue="0"
                                                        {...register("blPgMove", {
                                                            required: {
                                                                value: true,
                                                                message: " BL PG Move no required",
                                                            },
                                                        })}
                                                    />
                                                    <label className="label">
                                                        {errors.blPgMove?.type === "required" && (
                                                            <span className="label-text-alt text-red-500">
                                                                {errors.blPgMove.message}
                                                            </span>
                                                        )}
                                                    </label>
                                                </label>
                                            </div>

                                            {/* support PG Run info */}
                                            <div className='flex flex-row gap-2 mt-3'>
                                                <label className="input input-bordered flex font-bold items-center gap-2">
                                                    SUP Active PG No :
                                                    <input className='grow'
                                                        type="number"
                                                        defaultValue="0"
                                                        {...register("supActivePg")}
                                                    />
                                                </label>

                                                <label className="input input-bordered flex font-bold items-center gap-2">
                                                    SUP PG Run :
                                                    <input className='grow'
                                                        type="number"
                                                        defaultValue="0"
                                                        {...register("supPgRun")}
                                                    />
                                                </label>

                                                <label className="input input-bordered flex font-bold items-center gap-2">
                                                    SUP PG Move :
                                                    <input className='grow'
                                                        type="number"
                                                        defaultValue="0"
                                                        {...register("supPgMove")}
                                                    />
                                                </label>
                                            </div>
                                            <div className='mt-2'>
                                                <label className="input input-bordered flex font-bold items-center gap-2">
                                                    Remarks :
                                                    <input className='grow text-center'
                                                        type="text"
                                                        placeholder='write remarks if have'
                                                        {...register("remarks")}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>}

                                   
                                    <div className='flex flex-row gap-5 align-middle items-center mt-3'>
                                        <input className=" btn btn-info  w-full max-w-xs"
                                            disabled={btnVisible ? true : false}
                                            type="submit"
                                            value="View Dashboard"
                                        />

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
                    <div className="overflow-x-auto">
                        <table className="table table-xs table-pin-rows table-pin-cols mx-4 py-5">
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
                    </div>
                )}

            </div>

        </div>
    );
};

export default PowerShutDown;