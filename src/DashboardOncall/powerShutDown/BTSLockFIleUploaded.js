import React, { useEffect, useState } from 'react';
import * as XLSX from "xlsx";
import TableCaption from '../../Pages/SharedPage/TableCaption';
import { useDeleteShutDownDataMutation, useGetLockRequestDataQuery, usePostDataMutation } from '../../app/features/api/powerShutDown/powerShutDownApi';
import { useNavigate } from 'react-router-dom';
import { ArrowDownTrayIcon, ArrowRightCircleIcon, } from '@heroicons/react/24/solid'

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CSVLink } from 'react-csv';

const BTSLockFileUploaded = () => {
    const [visible, setVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(true)
    const [btnVisible, setBtnVisible] = useState(true)
    const [inputVisible, setInputVisible] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [excelData, setData] = useState([]);
    const [lowDelay, setLowDelay] = useState("10")
    const [highDelay, setHighDelay] = useState("800")
    const [powerAlarm, setPowerAlarm] = useState("")
    /*  const [delayInputVisible, setDelayInputVisible] = useState(false) */
    /*  const { register, formState: { errors }, handleSubmit, } = useForm(); */

    const [deletePreData, { isLoading }] = useDeleteShutDownDataMutation()

    const delayDuration = { lowTime: lowDelay, highTime: highDelay }
    // console.log(lowDelay,highDelay)
    const { data: alarmQuery = [], } = useGetLockRequestDataQuery(delayDuration)

    const handleDataDelete = () => {

        deletePreData().then((data) => {
            //console.log(data)
            if (data.data.acknowledged || data.data.deletedCount > 0) {
                setVisible(true)
                //toast.success(" Pre Data Deleted done")
                setDeleteVisible(false)
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
        if (excelData) {

            toast.success(" Ok, Now click data upload button")
        }

    }
    // console.log(excelData)



    const requiredData = excelData?.filter((item) =>
        item.Alarm_Slogan === "MAINS FAIL DELAY CKT ON"
        || item.Alarm_Slogan === "MAINS FAIL"

    )

    // console.log(requiredData)
    const [dataPost, { isLoading: isLoading2 }] = usePostDataMutation()

    if (loadingData) {
        return <p className='text-warning text-3xl text-center mt-40'> "Data Loading  Please Wait....</p>
    }

    const ExcelDateToJSDate = (serial) => {
        const utcDays = Math.floor(serial - 25569);
        const utcValue = utcDays * 86400;
        const dateInfo = new Date(utcValue * 1000);
        const year = dateInfo.getFullYear();
        const month = dateInfo.getMonth() + 1;
        const day = dateInfo.getDate();

        return format(new Date(year, month - 1, day), 'dd-MM-yyyy');
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        requiredData?.map((rawData, index) => {
            const alarmRaisedDate = rawData.Alarm_Raised_Date
            const formatedAlarmDate = ExcelDateToJSDate(alarmRaisedDate)
            //console.log(alarmRaisedDate) 

            const alarmData = {
                Site: rawData.Site || "",
                Alarm_Raised_Date: formatedAlarmDate || "",
                Alarm_Raised_Time: rawData.Alarm_Raised_Time || "",
                Active_for: rawData.Active_for || "",
                Alarm_Slogan: rawData.Alarm_Slogan || "",
                In_house_Office: rawData.In_house_Office || "",
                Power_Status: rawData.Power_Status || "",
            }
            // console.log(alarmData)
            dataPost(alarmData)
            return rawData
        })
        setVisible(false)
        setInputVisible(true)
    }

    const handleDelayTime = (event) => {
        event.preventDefault()
        setLowDelay(event.target.lowDelayTime.value)
        setHighDelay(event.target.highDelayTime.value)

        event.target.lowDelayTime.value = ""
        event.target.highDelayTime.value = ""
    }

    const handlePowerAlarm = (e) => {
        setPowerAlarm(e.target.value)
    }


    if (isLoading || isLoading2) {
        return (
            <div>
                <p className='text-pink-400 text-3xl text-center mt-40'> "Data upLoading Please Wait.....
                </p>
            </div>
        )
    }
    // console.log(alarmQuery)
    let alarmSlogan
    if (powerAlarm !== "") {
        alarmSlogan = alarmQuery?.filter((item) => item.Alarm_Slogan === powerAlarm)
    }
    else {
        alarmSlogan = alarmQuery
    }
    return (
        <div >
            <div className="card px-4 mx-5 my-4  bg-base-100 shadow-xl">
                <div className="card-body">
                    {deleteVisible && <div className='flex flex-row gap-3 border-3 p-3 rounded-md text-blue-400 bg-slate-100'>
                        <h2 className="card-title text-center">
                            <ArrowRightCircleIcon className="h-6 w-6 text-[#106d3f]-500" />
                            পুরোনো ডাটা মুছে ফেলার জন্য পাশের ডিলিট বাটনটি ক্লিক করি---</h2>
                        <div>
                            {/* Delete button for previous Data delete */}
                            <div>
                                <button className="btn btn-outline btn-warning "
                                    onClick={handleDataDelete}
                                > Delete
                                </button>
                            </div>
                        </div>
                    </div>}
                    <div>
                        {/* .csv file data uploaded part */}
                        {visible && <div >
                            <form className="px-2" autoComplete="off" onSubmit={handleSubmit}>
                                <div className="flex flex-row gap-x-4 justify-start items-center">
                                    <label className="form-control w-full max-w-xs my-2">
                                        <div className="label">
                                            <span className="label-text text-pink-400 font-bold">Choose downloaded UMS Alarm .csv file.</span>
                                        </div>
                                        <input type="file"
                                            onChange={handleFileUpload} className="input input-bordered w-full max-w-xs" />
                                    </label>
                                    <div className='mt-8'>
                                        <button className=" btn btn-outline btn-primary max-w-xs"
                                            disabled={btnVisible ? true : false}
                                            type="submit"
                                        /*  value="Data Submit" */
                                        > Data Upload</button>

                                    </div>
                                </div>
                            </form>
                        </div>}
                        <div className="divider"></div>


                        {/* delay time input */}
                        {inputVisible && <div>
                            <div className="flex flex-col w-full lg:flex-row">
                                <div className="grid flex-grow w-1/2 card bg-gray-700 px-2 py-4 rounded-box place-items-center">
                                    <form className='px-2' autoComplete='off' onSubmit={handleDelayTime}>
                                        <div className="flex flex-row gap-x-4 justify-start items-center">
                                            <label className="form-control w-full max-w-xs my-2">
                                                <div className="label">
                                                    <span className="label-text text-white font-bold"> Please enter Min & Max power alarm duration in minutes !! (**Default have 10 & 30**) </span>
                                                </div>
                                                <div className='flex flex-row gap-2'>
                                                    <input type="number"
                                                        name='lowDelayTime'
                                                        placeholder=' Minimum minutes'
                                                        className="input input-bordered w-full max-w-xs" />
                                                    <input type="number"
                                                        name='highDelayTime'
                                                        placeholder='Max Minutes'
                                                        className="input input-bordered w-full max-w-xs" />
                                                </div>
                                            </label>
                                            <div className='mt-8'>
                                                <button className=" btn btn-outline btn-secondary max-w-xs mt-6"
                                                    /* disabled={bVisible ? true : false} */
                                                    type="submit"
                                                /*  value="Data Submit" */
                                                >View Lock List</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div className="divider lg:divider-horizontal"></div>
                                <div className="grid flex-grow w-1/2 py-4 card bg-gray-700 rounded-box place-items-center px-2">
                                    <div>
                                        <div className=''>
                                            <label className="label">
                                                <span className="label-text font-serif font-bold text-xl text-white"> Filter Power Status:</span>
                                            </label>
                                            <select
                                                value={powerAlarm}
                                                onChange={handlePowerAlarm}
                                                className="input input-bordered w-full  max-w-xs"
                                            >
                                                <option value=""> .......Choose alarm........</option>
                                                <option value="MAINS FAIL">"MAINS FAIL"</option>
                                                <option value="MAINS FAIL DELAY CKT ON">"MAINS FAIL DELAY CKT ON"</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}

                        <p className='bg-gray-300 h-1 w-full mt-4 rounded-lg'></p>

                    </div>
                </div>

                {/*  To display input data after uploaded */}
                {/* bellow mention is used for data stringify display into */}
                {/* <pre>{JSON.stringify(excelData, null, 2)}</pre> */}

                {/* After filtering alarm data , display in client side */}
                {alarmQuery.length > 0 && (
                    <div>
                        <div className='flex justify-around'>
                            <h1 className='text-pink-700 text-lg font-serif flex justify-center'>
                                <ArrowRightCircleIcon className="h-6 w-6 text-[#106d3f]-500" /> &nbsp; &nbsp;
                                <span> আপনার দেওয়া
                                    <span className='font-extrabold font-serif text-blue-700 text-2xl'> {lowDelay} & {highDelay}  </span>
                                    এর মর্ধ্বর্তী পাওয়ার অ্যালার্ম সম্বলিত সাইট এর
                                    মোট সংখ্যা হলো
                                    <span className='font-extrabold font-serif text-blue-700 text-2xl'> {alarmSlogan.length} </span>
                                    !!
                                </span>
                            </h1>
                            {/* For Data export */}
                            <div>
                                <CSVLink
                                    data={alarmSlogan}
                                    filename="Lock_Request_Site_List"
                                    className="btn btn-primary btn-outline btn-sm mb-2"
                                >
                                    <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />

                                    &nbsp;
                                </CSVLink>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table table-xs table-pin-rows table-pin-cols mx-auto py-5 my-3">
                                <TableCaption tableHeading=" Lock Request Site List" />
                                <thead>
                                    <tr className="border-2 border-blue-500 divide-x-2 px-4 divide-blue-400 text-start">
                                        <th >SN</th>
                                        {Object.keys(alarmQuery[0]).map((key) => (
                                            <th key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {alarmSlogan.map((row, index) => (
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
                    </div>
                )}

                {/* display uploading  alarm data , display in client side */}
                {/* {excelData.length > 0 && (
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
                )} */}




            </div>

        </div>
    );
};

export default BTSLockFileUploaded;