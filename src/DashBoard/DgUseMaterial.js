import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import background from "../../src/images/bb.jpg";
import auth from "../firebase.init";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import useSiteList from "./../Pages/Hook/useSiteList";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { BackwardIcon } from "@heroicons/react/24/solid";

const DgUseMaterial = () => {
  const [user] = useAuthState(auth);
  const [siteList] = useSiteList();
  const [axiosSecure] = useAxiosSecure()
  const [search, setSearch] = useState("");
  const [isBattery, setIsBattery] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [material, setMaterial] = useState("");
  //const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleMaterialUpdate = (event) => {
    setIsBattery(null);
    setIsOther(null);
    event.preventDefault();
    const MaterialName = event.target.value;
    if (MaterialName === "DG Battery") {
      setIsBattery(true);
    } else if (MaterialName === " ") {
      setIsOther(true);
    } else {
      setIsBattery(false);
      setIsOther(false);
    }
    console.log(MaterialName)
    setMaterial(MaterialName);
  };

  const onSubmit = (data) => {
    //setIsLoading(true)
    const dgMaterial = {
      siteId: search,
      date: data.date2,
      material: material,
      oldBatterySerialNo: data.oldBatteryNo || "",
      newBatterySerialNo: data.newBatteryNo || "",
      other: data.other,
      rhReading: data.rhReading,
      updaterName: user.displayName,
      updaterEmail: user.email,
      remark: data.remark,
    };
    //console.log(dgMaterial)

    const updateDgMeterials = async () => {
      const { data } = await axiosSecure.post("/dgMaterialInfo", dgMaterial)
       // console.log(data)
      if (data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Use material has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else {
        toast.error(`Warning: ${data.msg}`);
      }
      reset()
      setMaterial("");
      setSearch("");
    
    }
    updateDgMeterials()

  };

  /*  today find code */
  let date = new Date();
  date.setDate(date.getDate());
  let today = date.toLocaleDateString("en-CA");

  /*  For site list auto suggestion */
  const handleSiteSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchItem = (searchItem) => {
    setSearch(searchItem);
  };

  return (
    <div
      className="flex justify-center justify-items-center bg-no-repeat bg-bottom bg-fixed"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="card  lg:w-96 bg-base-100 shadow-2xl my-8">
        <div className="card-body">
          <Link
            to="/DgMaterial"
            className="btn  btn-primary font-semiBold text-xl mb-2"
          >
            <BackwardIcon className="h-6 w-6 text-blue-400" />
            
            &nbsp; Back to Materials List
          </Link>
          <h2 className="text-center text-secondary-focus text-2xl font-bold mb-3">
            Update Use DG Material
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Date input field */}

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Date:</span>
              </label>
              <input
                type="date"
                // disabled
                defaultValue={today}
                className="input input-bordered w-full max-w-xs"
                {...register("date2", {
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
            </div>

            {/*  Site ID */}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder="Site ID ( type only number )"
                onChange={handleSiteSearch}
                value={search}
                required
                className="input input-bordered w-full max-w-xs"
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
                  .slice(0, 10)
                  .map((item, index) => (
                    <ul
                      className="menu p-2 w-52"
                      onClick={() => handleSearchItem(item.siteId)}
                      key={index}
                    >
                      <li className="text-blue-500 hover"> {item.siteId}</li>
                    </ul>
                  ))}
              </div>
              <label className="label"></label>
            </div>

            {/* Name of Use Materials */}
            <div className="form-control w-full max-w-xs">
              <select
              value={material}
                className="input input-bordered w-full max-w-xs"
                type="text"
                name="material"
                placeholder=" select Use material "
                onChange={handleMaterialUpdate}
              >
                <option value="">----Select Items----</option>
                <option value="MC-100A">MC-100A</option>
                <option value="MC-80A">MC-80A</option>
                <option value="MC-60A">MC-60A</option>
                <option value="Timer">Timer</option>
                <option value="DG Battery">DG Battery</option>
                <option value="RVD Timer">RVD Timer</option>
                <option value="Relay">Relay</option>
                <option value="">Other</option>
              </select>
              <label className="label"></label>
            </div>

            {/*  DG new Battery serial No */}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                hidden={!isBattery}
                placeholder=" New DG Battery Serial No"
                className="input input-bordered input-secondary w-full max-w-xs"
                {...register("newBatteryNo")}
              />
              <label className="label"></label>
            </div>
            {/*  DG old Battery serial No */}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                hidden={!isBattery}
                placeholder=" Old DG Battery Serial No"
                className="input input-bordered input-secondary w-full max-w-xs"
                {...register("oldBatteryNo")}
              />
              <label className="label"></label>
            </div>
            {/*  Other type Material */}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                hidden={!isOther}
                placeholder=" Write Material Name "
                className="input input-bordered input-secondary w-full max-w-xs"
                {...register("other")}
              />
              <label className="label"></label>
            </div>

            {/*  DG RH Reading*/}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder=" If applicable, present DG RunHour,  "
                className="input input-bordered w-full max-w-xs"
                {...register("rhReading")}
              />
              <label className="label">
                
              </label>
            </div>

            {/* Remarks */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Remark:</span>
              </label>
              <textarea
                type="text"
                placeholder="Write purpose of using"
                className="input input-bordered w-full max-w-xs"
                {...register("remark")}
              />
            </div>

            <input
              type="submit"
              className="btn  btn-success btn-wide max-w-xs m-2"
              /* disabled={isLoading ? true : false} */
              value="Submit-Data"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default DgUseMaterial;
