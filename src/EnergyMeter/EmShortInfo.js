import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import Loading from "../Pages/SharedPage/Loading";
import { CSVLink } from "react-csv";
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import Pagination from "../Pages/SharedPage/Pagination";
import TableCaption from "../Pages/SharedPage/TableCaption";
import EmShortInfoRow from "./EmShortInfoRow";

const EmShortInfo = () => {
    const [axiosSecure] = useAxiosSecure()
    const [searchEmInfo, setSearchEmInfo] = useState("");
    const [filter, setFilter] = useState([]);

    /* For Pagination code */
    const [selectPage, setSelectPage] = useState("0")
    const [pageSize, setPageSize] = useState("30");
    const [totalPage, setTotalPage] = useState(2)
    const [actualDataLength, setDataLength] = useState("10")


    useEffect(() => {
        const getLengthData = async () => {
            const { data } = await axiosSecure.get("/emInfo/count")
            const page = data.lengthOfData
            setDataLength(page)
            const pageCount = Math.ceil(page / pageSize)
            setTotalPage(pageCount)
            if (pageCount < selectPage) {
                setSelectPage(1)
            }
        }
        getLengthData()

    }, [pageSize, selectPage, totalPage, actualDataLength, axiosSecure])


    const { isLoading, data: EmInfo = [] } = useQuery({
        queryKey: ["EmInfo", pageSize, selectPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/emInfo?size=${pageSize}&page=${selectPage}`)
            return res.data
        }
    })

    if (isLoading) {
        return <Loading />;
    }


    /* For filtering purpose */
    const handleSearch = (e) => {
        const search = e.target.value;
        setSearchEmInfo(search);

        if (search !== "") {
            const filterData = EmInfo.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
            setFilter(filterData);
        } else {
            setFilter(EmInfo);
        }
    };
    return (
        <div className="bg-slate-200 mt-[-20px]">
            <div className="mt-6 py-2 px-2 w-full md:w-3/4 mx-auto mb-4 card bg-base-100 shadow-xl">
                {/* <div className="grid grid-cols-4 lg:grid-cols-8 h-12 card bg-[#008282] rounded-lg justify-self-start mb-8 gap-x-16">
                <Link to="/Home" className="btn btn-secondary">
                    Go Home
                </Link>
                <h2 className="stat-title lg:card-title font-bold col-start-2 col-span-2 lg:col-span-6 justify-self-center self-center text-white">
                    All Energy Meter <p>updated Record</p>
                </h2>
                <Link to="/Dashboard/EMDataUpdate" className="btn btn-Primary">
                    GO EM Info UPDATE
                </Link>
            </div> */}

                {/* For filter input box */}
                <div className="flex  justify-between flex-wrap gap-4 border border-slate-400 mt-2 p-4 rounded-lg">

                    <input
                        type="text"
                        className="input input-bordered border-sky-400 w-full max-w-xs flex-auto"
                        placeholder="Enter search Keyword/Site Id number"
                        onChange={(e) => {
                            handleSearch(e);
                        }}
                    />
                    <div>
                        <Link to="/Dashboard/EMDataUpdate" className="btn btn-sm btn-outline btn-primary">
                            New Entry
                        </Link>
                    </div>
                    <div>
                        <Link to="/EmInfo/Detail" className="btn btn-sm btn-outline btn-primary">
                            Info Detail
                        </Link>
                    </div>

                    <div>
                        <CSVLink
                            data={EmInfo}
                            filename="EnergyMeterInfo"
                            className="btn btn-outline btn-info mb-2 flex-auto"
                        >
                            <ArrowDownTrayIcon className="h-6 w-6 text-blue-500" />
                            &nbsp;
                        </CSVLink>
                    </div>
                </div>

                {/* Pagination */}

                <Pagination pageSize={pageSize} setPageSize={setPageSize}
                    selectPage={selectPage} setSelectPage={setSelectPage}
                    totalPage={totalPage} actualDataLength={actualDataLength}
                />

                <div className="overflow-x-auto  mt-4">
                    <table className="table table-compact ">
                        <TableCaption tableHeading="All Energy Meter updated Record" />
                        <thead className="border-2 border-[#FFCB24] ">
                            <tr className="divide-x divide-sky-400">
                                <th>SN</th>
                                <th>Site ID</th>
                                <th>
                                    Date
                                </th>

                                <th>
                                    EM Serial No
                                </th>
                                <th>
                                    <div>Total</div>
                                    <div>Reading</div>
                                </th>
                                <th>
                                    <div>Peak</div>
                                    <div>Reading</div>
                                </th>
                                <th>
                                    <div>Off-Peak</div>
                                    <div>Reading</div>
                                </th>
                                <th>
                                    <div>DC</div>
                                    <div>Load Current</div>
                                </th>
                                <th>
                                    <div>EM Reading</div>
                                    <div>Picture</div>
                                </th>
                                <th>
                                    <div>Info</div>
                                    <div>Collector</div>
                                </th>

                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchEmInfo.length > 1
                                ? filter.map((emInfo, index) => (
                                    <EmShortInfoRow
                                        key={emInfo._id}
                                        emInfo={emInfo}
                                        index={index}
                                    />
                                ))
                                : EmInfo?.map((emInfo, index) => (
                                    <EmShortInfoRow
                                        key={emInfo._id}
                                        emInfo={emInfo}
                                        index={index}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmShortInfo;
