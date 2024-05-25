import { useState } from "react";
import * as XLSX from "xlsx";
import TableCaption from "../Pages/SharedPage/TableCaption";
import { addDays, format } from "date-fns";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import { toast } from "react-toastify";

const FcuDataFetchFromExcelFile = () => {
    const [axiosSecure] = useAxiosSecure()
    const [excelData, setData] = useState([]);

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
        };
    }
    //console.log(excelData)

    const ExcelDateToJSDate = (serial) => {
        const utcDays = Math.floor(serial - 25569);
        const utcValue = utcDays * 86400;
        const dateInfo = new Date(utcValue * 1000);
        const year = dateInfo.getFullYear();
        const month = dateInfo.getMonth() + 1;
        const day = dateInfo.getDate();

        return format(new Date(year, month - 1, day), 'yyyy-MM-dd');
    };

    function addDaysToDate(dateString, days) {
        let date = new Date(dateString);
        date.setDate(date.getDate() + days);
        return date;
    }

    function dateFormat(dateString) {
        const date = new Date(dateString);

        // Extract year, month, and day from the Date object
        const year = date.getFullYear();
        // Month is zero-indexed, so add 1 to get the correct month,
        //The padStart method is used to ensure that the month and day are always two digits long.
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        // Construct the desired date format
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }

    const handleSubmit = (e) => {
        e.preventDefault();

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
            const nextPlan = addDaysToDate(formattedLatestDate, 120);
            const formattedNextPlan = dateFormat(nextPlan)




            const fcuData = {
                siteId: fcuInfo.siteId,
                office: fcuInfo.office,
                siteType: fcuInfo.siteType,
                coolingSystem: fcuInfo.coolingSystem,
                fcuBrand: fcuInfo.fcuBrand,
                installationDate: formattedInstallDate,
                preServiceDate: formattedPreDate,
                latestServiceDate: formattedLatestDate,
                nextPlanDate: formattedNextPlan,
                serviceType: fcuInfo.serviceType,
                fcuStatus: fcuInfo.fcuStatus
            };

            // console.log(fcuData)

            const excelDataUploaded = async () => {
                const { data } = await axiosSecure.put(`/fcuFilterChangeLatestRecord/${siteID}`, fcuData)
                if (data.acknowledged) {
                    toast.success("data update success")
                }
            }
            excelDataUploaded()


            return fcuInfo
        })

    }
    return (
        <div >
            <label>
                <h5 className="bg-[#28c843df] flex justify-center items-center text-white text-xl font-bold h-12 mt-4 p-4 rounded-lg">
                    Upload Excel file
                </h5>
            </label>
            <h4 className="text-xl text-center font-bold text-pink-600 mt-2">
                **Heading of Excel sheet must contain bellow name without space**
            </h4>
            <div className="border-4 border-blue-500 m-4 w-3/4 mx-auto">
                <thead className="">
                    <tr className=" divide-x-4 px-4 divide-blue-400 text-start">
                        <th className="p-2">siteId</th>
                        <th className="p-2">office</th>
                        <th className="p-2">siteType</th>
                        <th className="p-2"> coolingSystem</th>
                        <th className="p-2"> installationDate</th>
                        <th className="p-2"> PreServiceDate</th>
                        <th className="p-2"> latestServiceDate</th>
                        <th className="p-2"> nextPlanDte</th>
                        <th className="p-2">fcuBrand</th>
                        <th className="p-2">serviceType</th>
                        <th className="p-2">fcuStatus</th>

                    </tr>
                </thead>
            </div>

            <form className="px-2" autoComplete="off" onSubmit={handleSubmit}>
                <div className="flex flex-row gap-x-4 justify-start items-center">
                    <div className=" flax flex-row  gap-2 form-control w-full max-w-xs  mt-4">
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            required
                            className="input input-bordered w-full max-w-xs py-2"
                        />

                    </div>

                    <button type="submit" className="btn btn-primary mt-2">
                        Submit
                    </button>
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

export default FcuDataFetchFromExcelFile;
