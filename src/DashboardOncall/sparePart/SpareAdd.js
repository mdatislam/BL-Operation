
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSiteList from "./../../Pages/Hook/useSiteList";

const SpareAdd = () => {
    const [siteList] = useSiteList()
    const [search, setSearch] = useState("");
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm();

    /*  For site list auto suggestion */
    const handleSiteSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchItem = (searchItem) => {
        setSearch(searchItem);
    };
    const onSubmit = (data) => {

    }

    return (
        <div className="flex  justify-center justify-items-center mt-8 mb-3">
            <div className="card w-96 md:w-3/4 bg-base-100 shadow-2xl">
                <div className="card-body">
                    <h2 className="text-center text-secondary-focus text-2xl font-bold">
                        Provide New Spare Info!
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col  gap-3">
                            <div className=" grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-2">
                                {/* 1st row */}
                                <div className="flex flex-col md:flex-row gap-2">
                                    <label className="input input-bordered flex items-center font-semibold gap-3">
                                        Date:
                                        <input
                                            type="date"
                                            defaultValue=""
                                            className="grow"
                                            {...register("date", {
                                                required: {
                                                    value: true,
                                                    message: " Date is required",
                                                },
                                            })}
                                        />
                                        <label className="label">
                                            {errors.date?.type === "required" && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.date.message}
                                                </span>
                                            )}
                                        </label>
                                    </label>

                                    <label className="input input-bordered font-semibold flex items-center gap-3">
                                        BOM_No:
                                        <input
                                            type="text"
                                            className="grow"
                                            {...register("bomNo", {
                                                required: {
                                                    value: true,
                                                    message: " BomNo is required",
                                                },
                                            })}
                                        />
                                        <label className="label">
                                            {errors.bomNo?.type === "required" && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.bomNo.message}
                                                </span>
                                            )}
                                        </label>
                                    </label>
                                    <label className="input input-bordered font-semibold flex items-center gap-3">
                                        Spare_Name:
                                        <input
                                            type="text"
                                            className="grow"
                                            {...register("spareName", {
                                                required: {
                                                    value: true,
                                                    message: " SpareName is required",
                                                },
                                            })}
                                        />
                                        <label className="label">
                                            {errors.spareName?.type === "required" && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.spareName.message}
                                                </span>
                                            )}
                                        </label>
                                    </label>
                                </div>

                            </div>

                            {/* 2nd Row */}

                            <div className=" grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-2">
                                {/* 1st row */}
                                <div className="flex flex-col md:flex-row gap-2">
                                    <label className="input input-bordered flex items-center font-semibold gap-3">
                                        Status:
                                        <input
                                            type="text"
                                            className="grow"
                                            {...register("status", {
                                                required: {
                                                    value: true,
                                                    message: " Status is required",
                                                },
                                            })}
                                        />
                                        <label className="label">
                                            {errors.status?.type === "required" && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.status.message}
                                                </span>
                                            )}
                                        </label>
                                    </label>

                                    <label className="input input-bordered font-semibold flex items-center gap-3">
                                        Quantity:
                                        <input
                                            type="number"
                                            className="grow"
                                            {...register("quantity", {
                                                required: {
                                                    value: true,
                                                    message: " Quantity is required",
                                                },
                                            })}
                                        />
                                        <label className="label">
                                            {errors.quantity?.type === "required" && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.quantity.message}
                                                </span>
                                            )}
                                        </label>
                                    </label>
                                    <label className="input input-bordered font-semibold flex items-center gap-3">
                                        Site_ID:
                                        <input
                                            type="text"
                                            className="grow"
                                            onChange={handleSiteSearch}
                                            value={search}
                                            required
                                            
                                        />
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
                                                        className="menu menu-vertical p-2 w-24"
                                                        onClick={() => handleSearchItem(item.siteId)}
                                                        key={index}
                                                    >
                                                        <li className="text-blue-500 hover"> {item.siteId}</li>
                                                    </ul>
                                                ))}
                                        </div>

                                    </label>

                                </div>
                            </div>

                            <input
                                type="submit"
                                className="btn btn-success btn-wide max-w-xs m-2"
                                /*  disabled={isLoading ? true:false} */
                                value="Submit-Data"

                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SpareAdd;
