import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSiteList from '../../Pages/Hook/useSiteList';
import useUserList from '../../Pages/Hook/useUserList';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useGetSpareListQuery, useReplaceMentSpareMutation } from '../../app/features/api/sparePart/spareApi';
import Loading from '../../Pages/SharedPage/Loading';
import { toast } from 'react-toastify';

const EditSpare = ({ setSpareEdit, spareEdit }) => {
    const [user] = useAuthState(auth)
    const [siteList] = useSiteList()
    const [userList] = useUserList()
    const [search, setSearch] = useState("");
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm();
    //const {isLoading:isLoading1, data:spareRecord=[]}= useGetSpareListQuery()
    //console.log(spareEdit);
    const [replacementDataInfo, { isLoading, isError, error, isSuccess }] = useReplaceMentSpareMutation()

    /* Today calculate code */
    let date = new Date()
    date.setDate(date.getDate())
    const today = date.toLocaleDateString("en-CA")

    /*  For site list auto suggestion */
    const handleSiteSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchItem = (searchItem) => {
        setSearch(searchItem);
    };

    /* Total faulty quantity calculation */
    const totalFaulty = spareEdit?.replacement?.reduce((pre, item) => {
        return pre + parseInt(item.replacementQuantity)
    }, 0)

    //console.log(totalFaulty);

    useEffect(() => {

        if (isSuccess) {
            toast.success("Spare update successfully")
            setSpareEdit(null)
        }
        if (isError) {
            toast.error(error)
        }
    }, [isLoading, isSuccess, isError, error, setSpareEdit])
    const onSubmit = (data) => {
        console.log({
            ...data, replacementSiteId: search,
            spareName: spareEdit.spareName,
            replacementUpdatedBy: user.displayName
        });
        const finalGoodQuantity = parseFloat(spareEdit.goodQuantity) - parseInt(data.replacementQuantity)
        replacementDataInfo({
            ...data, replacementSiteId: search,
            spareName: spareEdit.spareName, goodQuantity: finalGoodQuantity,
            replacementUpdatedBy: user.displayName, id: spareEdit._id
        })



    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <input type="checkbox" id="spareEdit" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box relative">
                    <div className="card-body">
                        <h2 className="text-center text-secondary-focus mb-1 text-2xl font-bold">
                            Provide Replacement Spare Info!
                        </h2>
                        <label
                            htmlFor="spareEdit"
                            className="btn btn-sm btn-circle absolute right-4 top-2"
                        >
                            ✕
                        </label>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col  gap-3">
                                <div className=" grid grid-cols-1 justify-center items-center gap-4">
                                    <label className="input input-bordered flex items-center font-semibold gap-2">
                                        Replacing_Date:
                                        <input
                                            type="date"
                                            defaultValue={today}
                                            className="grow"
                                            {...register("replacementDate", {
                                                required: {
                                                    value: true,
                                                    message: " ReplacementDate is required",
                                                },
                                            })}
                                        />
                                        <label className="label">
                                            {errors.replacementDate?.type === "required" && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.replacementDate.message}
                                                </span>
                                            )}
                                        </label>
                                    </label>
                                    <label className="input input-bordered flex items-center font-semibold gap-2">
                                        Spare_Name:
                                        <input
                                            type="text"
                                            value={spareEdit.spareName}
                                            readOnly
                                            disabled
                                            className="grow"
                                            {...register("spareName")}
                                        />

                                    </label>

                                    <label className="input input-bordered font-semibold flex items-center gap-2">
                                        Serial_No:
                                        <input
                                            type="text"
                                            placeholder='Faulty spare SN'
                                            className="grow"
                                            {...register("replacementSerialNo")}
                                        />
                                    </label>

                                    <label className="input input-bordered flex items-center font-semibold gap-2">
                                        Replacement_Status:
                                        <select
                                            type="text"
                                            className="grow"
                                            {...register("replacementStatus", {
                                                required: {
                                                    value: true,
                                                    message: " ReplacementStatus is required",
                                                },
                                            })}
                                        >

                                            <option value="faulty"> Faulty</option>
                                            <option value="good"> Good</option>
                                        </select>
                                        <label className="label">
                                            {errors.replacementStatus?.type === "required" && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.replacementStatus.message}
                                                </span>
                                            )}
                                        </label>
                                    </label>

                                    <label className="input input-bordered font-semibold flex items-center gap-2">
                                        Replaced_Quantity:
                                        <input
                                            type="number"
                                            className="grow"
                                            {...register("replacementQuantity", {
                                                required: {
                                                    value: true,
                                                    message: " ReplacementQuantity is required",
                                                },
                                            })}
                                        />
                                        <label className="label">
                                            {errors.replacementQuantity?.type === "required" && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.replacementQuantity.message}
                                                </span>
                                            )}
                                        </label>
                                    </label>
                                    <div className="text-blue-400">
                                        <label className="input input-bordered font-semibold flex items-center gap-2">
                                            Replacement_Site_ID:
                                            <input
                                                type="text"
                                                placeholder="Type only site number"
                                                className="grow"
                                                onChange={handleSiteSearch}
                                                value={search}
                                                required

                                            />

                                        </label>
                                        {/*  For site list auto suggestion */}

                                        <div className=" border-0 rounded-lg w-3/4 max-w-xs mt-2">
                                            {siteList
                                                .filter((item) => {
                                                    const searchItem = search.toLowerCase();
                                                    const name1 = item.siteId.toLowerCase();
                                                    return (
                                                        searchItem &&
                                                        name1.includes(searchItem) &&
                                                        searchItem !== name1
                                                    );
                                                })
                                                .slice(0, 5)
                                                .map((item, index) => (
                                                    <ul
                                                        className="menu  p-2 w-24"
                                                        onClick={() => handleSearchItem(item.siteId)}
                                                        key={index+"xx"}
                                                    >
                                                        <li className="text-blue-500 hover"> {item.siteId}</li>
                                                    </ul>
                                                ))}
                                        </div>
                                    </div>
                                    <label className="input input-bordered flex items-center font-semibold gap-2">
                                        Replaced_By:
                                        <select
                                            type="text"
                                            className="grow"
                                            {...register("replacedBy", {
                                                required: {
                                                    value: true,
                                                    message: "  Who replaced ?",
                                                },
                                            })}
                                        >
                                            <option value=""> ---Replaced By Name---</option>
                                            {
                                                userList.sort((a, b) => a?.name.localeCompare(b?.name))
                                                    .map((user,index )=> (<option value={user.name} key={index+"user"}> {user.name}</option>))
                                            }

                                        </select>
                                        <label className="label">
                                            {errors.replacedBy?.type === "required" && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.replacedBy.message}
                                                </span>
                                            )}
                                        </label>
                                    </label>

                                    <textarea
                                        type="text"
                                        placeholder="Type issue if have"
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("replacementRemark")}
                                    />


                                </div>
                                <div className="flex items-center justify-center gap-x-4 ">
                                    <input
                                        type="submit"
                                        className="btn btn-success max-w-xs m-2 hover:btn-info"
                                        /*  disabled={isLoading ? true:false} */
                                        value="Save_Data"

                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSpare;