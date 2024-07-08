import React from 'react';
import { useGetSingleReplacementQuery } from '../../app/features/api/sparePart/spareApi';
import Loading from '../../Pages/SharedPage/Loading';
import { toast } from 'react-toastify';

const ViewReplacement = ({ replacementRecord, setReplacementView }) => {
    //console.log(replacementRecord);

    const { isLoading, data: replacementInfo = [], isSuccess } = useGetSingleReplacementQuery(replacementRecord)
    // console.log(replacementInfo);

    if (isLoading) {
        return <Loading />
    }
    /* if (replacementInfo.replacement?.length === 0 && isSuccess) {
        return alert("Yet Replacement not done")
    } */

    return (
        <div>
            <input type="checkbox" id="replacementView" className="modal-toggle" />
            <div className=" modal " role="dialog">
                <div className="modal-box  relative">
                    <div className='flex items-center justify-center'>
                        <label
                            htmlFor="replacementView"
                            className="btn btn-sm btn-circle absolute right-4 top-2"
                        >
                            ✕
                        </label>
                        <div className='card shadow-lg bg-base-200 px-3 py-2 mb-2 '>
                            <h2 className="text-center text-primary-focus mb-1 text-xl font-bold">
                                Replacement Spare  Info : {replacementInfo?.replacement?.length}
                            </h2>
                        </div>
                    </div>
                    <div className=' flex flex-col  p-2 rounded-md gap-y-3'>
                        {
                            replacementInfo?.replacement?.map((replace,index) => (
                                <div className='card shadow-xl bg-base-100 gap-2 py-3 px-4 flex flex-col items-start gap-y-1' key={index+"view"}>
                                    <h2 className='font-bold  px-3 rounded-md'> SPMS-Challan No:
                                        <span className='text-pink-700'> {replacementInfo.challanNo}</span>
                                    </h2>

                                    <h2 className='font-bold  px-3 rounded-md'>Date:
                                        <span className='text-pink-700'> {replace.replacementDate}</span>
                                    </h2>
                                    <h2 className='font-bold  px-3 rounded-md'> Site ID:
                                        <span className='text-pink-700'> {replace.replacementSiteId}</span>
                                    </h2>
                                    <h2 className='font-bold  px-3 rounded-md'>Spare Name:
                                        <span className='text-pink-700'> {replace.spareName}</span>
                                    </h2>
                                    <h2 className='font-bold  px-3 rounded-md'>Quantity:
                                        <span className='text-pink-700'> {replace.replacementQuantity}</span>
                                    </h2>

                                    <h2 className='font-bold  px-3 rounded-md'>Serial No:
                                        <span className='text-pink-700'> {replace.replacementSerialNo}</span>
                                    </h2>
                                    <h2 className='font-bold  px-3 rounded-md'>ReplacedBy:
                                        <span className='text-pink-700'> {replace.replacedBy}</span>
                                    </h2>
                                    <h2 className='font-bold  px-3 rounded-md'>Remark:
                                        <span className='text-pink-700'> {replace.replacementRemark}</span>
                                    </h2>

                                </div>))
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewReplacement;