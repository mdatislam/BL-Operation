import React from 'react';

const Pagination = ({ pageSize, setPageSize, selectPage, setSelectPage, totalPage, actualDataLength }) => {


    /* For Pagination code */
    // const [selectPage, setSelectPage] = useState("0")
    // const [pageSize, setPageSize] = useState("10");
    // const [totalPage, setTotalPage] = useState(2)
    // const [actualDataLength, setDataLength] = useState("10")


    // useEffect(() => {
    //   const getLengthData = async () => {
    //     const { data } = await axiosSecure.get("/ApprovedAllPgRun/count")
    //     const page = data.lengthOfData
    //     setDataLength(page)
    //     const pageCount = Math.ceil(page / pageSize)
    //     setTotalPage(pageCount)
    //     if (pageCount < selectPage) {
    //       setSelectPage(1)
    //     }
    //   }
    //   getLengthData()

    // }, [pageSize, selectPage, totalPage, actualDataLength, axiosSecure])


    //   const { isLoading, data: pgRunData = [] } = useQuery({
    //     queryKey: ["pgRunData", pageSize, selectPage],
    //     //     queryFn: async () => {
    //       const res = await axiosSecure.get(`/ApprovedAllPgRun?size=${pageSize}&page=${selectPage}`)
    //       return res.data
    //     }
    //   })

    //   if (isLoading) {
    //     return <Loading />;
    //   }

    //Reuse this pagination component  by bellow code

    {/* <Pagination pageSize={pageSize} setPageSize={setPageSize}
selectPage={selectPage} setSelectPage={setSelectPage}
totalPage={totalPage} actualDataLength={actualDataLength}
/> */}


    return (
        <div className="mt-5 flex flex-col gap-1 md:flex-row items-center md:justify-between sm:justify-items-start ">
            <div className=" flex items-center justify-start gap-1">
                <h2>Show</h2>
                <div className="relative inline-block text-left">
                    <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}
                        className="block appearance-none w-full bg-white border border-gray-300
                      text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                    >
                        <option value="10">10</option>
                        <option value="50" >50</option>
                        <option value="30">30</option>
                        <option value={actualDataLength}>All</option>
                    </select>
                </div>
                <h2>entries</h2>
            </div>
            <div className=" text-end">
                <h2>{
                    ((+selectPage) * (+pageSize)) + (+pageSize) < actualDataLength ? `Showing ${((+selectPage) * (+pageSize)) + 1} to ${((+selectPage) * (+pageSize)) + (+pageSize)} of ${actualDataLength} entries`
                        : `Showing ${((+selectPage) * (+pageSize)) + 1} to ${actualDataLength} of ${actualDataLength} entries}`
                }</h2>

                <div className=" flex items-center mt-2">
                    <span><strong>Pages</strong>&nbsp; </span>
                    <span className="border border-slate-400 p-1 rounded-lg">
                        {
                            [...Array(totalPage).keys()].map(number => (<button
                                onClick={() => setSelectPage(number)}
                                key={number}
                                className={+selectPage === number ? "btn btn-sm btn-secondary mr-1" : " btn btn-sm btn-outline mr-1"}
                            >{number + 1}</button>))
                        }
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Pagination;