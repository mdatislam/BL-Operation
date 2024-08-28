import React, { useState } from 'react';
import * as XLSX from "xlsx";
import TableCaption from '../../Pages/SharedPage/TableCaption';
import { useForm } from 'react-hook-form';
import { useUpdateSpareListMutation } from '../../app/features/api/sparePart/spareApi';
import { toast } from 'react-toastify';

const SpareListExcellUpdate = () => {
    const [loadingData, setLoadingData] = useState(false)
    const [btnVisible, setBtnVisible] = useState(true)
    const [excelData, setData] = useState([]);
    const { register, formState: { errors }, handleSubmit, } = useForm();

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

    }
    const [postSpareList, { isLoading: isLoading2,error,data }] = useUpdateSpareListMutation()
//console.log(data);
    if (loadingData || isLoading2) {
        return <p className='text-warning text-3xl text-center mt-40'> "Data Loading  Please Wait....</p>
    }
    const onSubmit = (data) => {

        excelData?.map((rawData,index)=>{
            const listInfo= {
                spareName:rawData.spareName,
                bomNo:rawData.bomNo,
                barCode:rawData.barCode
            }
            //console.group(listInfo)
            postSpareList(listInfo)
            return rawData
        })
        if(!error && data){
            toast(" List Update Done")
        }
    }
    return (
        <div>
            <form className="px-2 " autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-row gap-3'>
                    <div className="flex flex-col gap-x-4 justify-start items-center mt-3">
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text text-pink-400 font-bold text-xl">Choose spare List .csv file.</span>
                            </div>
                            <input type="file"
                                onChange={handleFileUpload} className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className=' mt-16'>
                        <input className=" btn btn-info  max-w-xs"
                            disabled={btnVisible ? true : false}
                            type="submit"
                            value="Update_List"
                        />

                    </div>
                </div>
            </form>
            <div className='px-6'>
               
                    <p className='font-semibold underline'> Condition</p>
                    <p className="label-text text-blue-400 font-bold text-xl"># column heading contains "spareName","bomNo" #</p>
            

            </div>

            {/*  To display input data after uploaded */}
            <div className='my-8'>
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

export default SpareListExcellUpdate;