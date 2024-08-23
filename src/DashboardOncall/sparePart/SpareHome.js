import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListBulletIcon } from '@heroicons/react/24/solid';
import {
    useGetNewSpareStockQuery, useGetOwnSpareStockQuery,
    useGetReturnSparePendingQuery,
    useGetSummarySpareQuery,

} from '../../app/features/api/sparePart/spareApi';
import TableCaption from '../../Pages/SharedPage/TableCaption';
import Loading from '../../Pages/SharedPage/Loading';
import SpareHomeReturnRow from './SpareHomeReturnRow';
import SpareHomeBalanceRow from './SpareHomeBalanceRow';


const SpareHome = () => {
    //const { data: newSpareStock = [], isLoading } = useGetNewSpareStockQuery()
    //const { data: returnSparePending = [], isLoading: returnLoading } = useGetReturnSparePendingQuery()
    const { data: ownSpareStock = [], isLoading: loading2 } = useGetOwnSpareStockQuery()
    //console.log(ownSpareStock);
    const { data: spareSummary = [], isLoading: loading3 } = useGetSummarySpareQuery()
    //console.log(spareSummary);
    
 

       /*  ownSpareStock & SpareSummary er comibne array of object making */

    const ownSpareLookup = ownSpareStock.reduce((acc, ownSpare) => {
        acc[ownSpare.BOM_No] = ownSpare;
        return acc;
    }, {});
    //console.log(ownSpareLookup)

    const combined = spareSummary?.map((summary) => {
        const matchingSpare = ownSpareLookup[summary.bomNo] ||
            { ownGoodQuantity: 0, ownFaultyQuantity: 0 }
        return ({
            ...summary,
            ownGoodQuantity: matchingSpare.ownGoodQuantity,
            ownFaultyQuantity: matchingSpare.ownFaultyQuantity,
        })
    })

    // console.log(combined);

    const unmatchedOwnSpare = ownSpareStock.filter(ownSpare => !spareSummary.some(newSpare => newSpare.bomNo === ownSpare.BOM_No))
        .map(ownSpare => ({
            bomNo: ownSpare.BOM_No,
            ownGoodQuantity: ownSpare.ownGoodQuantity,
            ownFaultyQuantity: ownSpare.ownFaultyQuantity,
            totalSpmsGood: ownSpare.totalSpmsGood || 0,
            totalSpmsFaulty: ownSpare.totalSpmsFaulty || 0,
            totalGoodReturn: ownSpare.totalGoodReturn || 0,
            totalFaultyReturn: ownSpare.totalFaultyReturn || 0,
            totalReturn: ownSpare.totalReturn|| 0,
        }))

    // console.log(unmatchedOwnSpare);

    const combineArray = [...combined, ...unmatchedOwnSpare]
    //console.log(combineArray);

      if (loading2|| loading3) {
        return <Loading />
    }
    return (
        <div className='bg-emerald-100  py-5 '>
            <div className='border-2 border-blue-200 bg-zinc-800 rounded-lg max-h-16 m-5 px-2 md:px-10'>
                <div className='flex flex-row justify-between items-start ml-3 text-yellow-500 '>
                    <NavLink to="/NewSpareCollectRecord" className=" btn btn-link">
                        < ListBulletIcon className="h-6 w-6 text-amber-600" />
                        &nbsp;  Spare_Collecting_Record</NavLink>
                    <NavLink to="/OwnSpareRecord" className=" btn btn-link">
                        < ListBulletIcon className="h-6 w-6 text-amber-600" />
                        &nbsp;  Own Spare_Record</NavLink>
                    <NavLink to="/ReturnSpareRecord" className=" btn btn-link">
                        < ListBulletIcon className="h-6 w-6 text-amber-600" />
                        &nbsp;  Return Spare_Record</NavLink>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-6 max-h-screen gap-x-4 px-10'>
                <div className='col-span-2 card shadow-lg bg-orange-100 px-10 py-5'>
                    {/* Balance Summary spare balance table*/}
                    <div className="overflow-x-auto">
                        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600 ">
                            <TableCaption tableHeading="Return Pending Summary " bgColor="bg-[text-red-500]" />
                            <thead className="border-2 border-[#FFCB24]">
                                <tr className="divide-x divide-blue-400 text-center">
                                    <th>SN</th>
                                    <th>Spare_Name</th>
                                    <th>BOM No</th>

                                    <th>
                                        <div>Pending</div>
                                        <div>Quantity</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    spareSummary &&
                                    spareSummary?.map((stock, index) => (
                                        <SpareHomeReturnRow spareReturn={stock} index={index}
                                            key={index + "stock"}
                                        />
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>

                </div>
                <div className='col-span-4 card shadow-lg bg-base-200 px-2 md:px-5 py-5'>

                    {/* Balance Summary spare balance table*/}
                    <div className="overflow-x-auto">
                        <table className="table table-compact w-full border-spacing-2 border border-3 border-slate-600 ">
                            <TableCaption tableHeading="Spare Balance Summary " bgColor="bg-[#fret347]" />
                            <thead className="border-2 border-[#FFCB24]">
                                <tr className="divide-x divide-blue-400 text-center">
                                    <th>SN</th>
                                    <th>Spare_Name</th>
                                    <th>BOM No</th>

                                    <th>
                                        <div>Total_Good</div>
                                        <div>Stock</div>
                                    </th>
                                    <th>
                                        <div>Own_Good</div>
                                        <div>Stock</div>
                                    </th>
                                    <th>
                                        <div>Own_Faulty</div>
                                        <div>Stock</div>
                                    </th>
                                    <th>
                                        <div>SPMS_Good</div>
                                        <div>Stock</div>
                                    </th>
                                    <th>
                                        <div>SPMS_Faulty</div>
                                        <div>Stock</div>
                                    </th>

                                </tr>
                            </thead>
                            <tbody>

                                {
                                    combineArray &&
                                    combineArray?.map((stock, index) =>
                                    (
                                        <SpareHomeBalanceRow
                                            spareBalanceStock={stock}
                                            index={index}
                                            key={index + "balance"}
                                        />
                                    )

                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default SpareHome;