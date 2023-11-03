import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../Pages/SharedPage/Loading";
import background from "../../src/images/bb.jpg";
import auth from "../firebase.init";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import useSiteList from "./../Pages/Hook/useSiteList";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { BackwardIcon } from "@heroicons/react/24/solid";

const DgRefuelingUpdate = () => {
  const [user] = useAuthState(auth);
  const [siteList] = useSiteList();
  const [axiosSecure] = useAxiosSecure()
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
   const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { data: sites = [], isLoading2 } = useQuery({
    queryKey: ["sites"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dgRefuelingInfo")
      return res.data
    }
  })
   //console.log(siteList)
  if (isLoading || isLoading2 || loading) {
    return <Loading />;
  }

  const handleImageUpload = (event) => {
    setLoading(true);
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.set("image", imageFile);
    fetch(
      "https://api.imgbb.com/1/upload?key=1b570ca2c45d58b767860a466c63580e",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data1) => {
        // console.log(data);
        setImageUrl(data1.data.display_url);
        setLoading(false);
      });
  };
  //console.log(imgUrl)

  const onSubmit = (data) => {
    setIsLoading(true)
    const siteID = search;
    const presentSite = sites?.filter((site) => site.siteId === siteID);
    //console.log(presentSite)

    const preRhReading = presentSite?.map((s) => s.rhReading);
    const previousFuel = presentSite?.map((s) => s.previousQuantity);
    const previousReFuel = presentSite.map((s) => s.reFuelQuantity);
    const preTotal =
      parseFloat(previousFuel[0]) + parseFloat(previousReFuel[0]);
    const consumption = (
      (preTotal - data.preFuel) /
      (data.rhReading - parseFloat(preRhReading))
    ).toFixed(2);
    const PreDate = presentSite?.map((s) => s.date);
    // console.log(EmPreReading[0])

    const dgRefuelingData = {
      siteId: siteID,
      date: data.date2,
      /*  batterySerialNo: data.dgBatteryNo, */
      rhReading: data.rhReading,
      reFuelQuantity: data.reFuel,
      previousQuantity: data.preFuel,
      previousDate: PreDate[0],
      /*   batteryPreSerialNo: batteryPreSerialNo[0], */
      preRhReading: preRhReading[0],
      preTotalFuel: preTotal,
      consumption,
      updaterName: user.displayName,
      updaterEmail: user.email,
      url: imgUrl,
      remark: data.remark,
    };

    const updateDgRefueling = async () => {
      const { data } = await axiosSecure.put(`dgRefuelingInfo/${siteID}`, dgRefuelingData)
      if (data.acknowledged) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Fuel Data has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else {
        toast.error(`Warning: ${data.msg}`);
      }

    }
    updateDgRefueling()
    
    /* for posting all refueling data */
    const updateDgRefuelingAll = async () => {
      const { data } = await axiosSecure.put(`dgAllRefueling`, dgRefuelingData)
      if (data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Fuel Data has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else {
        toast.error(`Warning: ${data.msg}`);
      }
      reset()
      setImageUrl("");
      setIsLoading(false)
    }
    updateDgRefuelingAll()

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
            to="/DgRefueling"
            className="btn  btn-primary font-semiBold text-xl mb-2"
          >
            <BackwardIcon className="h-6 w-6 text-blue-400"/>
            
            &nbsp;DG-Refueling List
          </Link>
          <h2 className="text-center text-[#db51f3] text-2xl font-bold mb-3">
            Update DG Refueling Info !!
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
              //defaultValue={vv}
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

            {/*  DG RH Reading*/}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder=" Refueling DG Run Hour "
                className="input input-bordered w-full max-w-xs"
                {...register("rhReading", {
                  required: {
                    value: true,
                    message: " DG servicing RH Required",
                  },
                })}
              />
              <label className="label">
                {errors.rhReading?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.rhReading.message}
                  </span>
                )}
              </label>
            </div>
            {/*  previous Quantity*/}
            <div className="form-control w-full max-w-xs">
              <input
                type="number"
                step=".001"
                placeholder="Previous Fuel Quantity"
                className="input input-bordered w-full max-w-xs"
                {...register("preFuel", {
                  required: {
                    value: true,
                    message: " Previous Fuel Quantity required",
                  },
                })}
              />
              <label className="label">
                {errors.preFuel?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.preFuel.message}
                  </span>
                )}
              </label>
            </div>
            {/*  ReFuel Quantity*/}
            <div className="form-control w-full max-w-xs">
              <input
                type="number"
                step=".001"
                placeholder="ReFuel Quantity"
                className="input input-bordered w-full max-w-xs"
                {...register("reFuel", {
                  required: {
                    value: true,
                    message: " reFuel Quantity required",
                  },
                })}
              />
              <label className="label">
                {errors.reFuel?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.reFuel.message}
                  </span>
                )}
              </label>
            </div>

            {/* Pic of RH Reading */}
            <div className="form-control w-full max-w-xs">
              <label
                htmlFor="image"
                className={loading ? "btn loading mt-5" : "btn mt-5"}
              >
                Upload-RH-Photo
              </label>
              <input
                id="image"
                type="file"
                className="input input-bordered w-full max-w-xs hidden"
                onChange={handleImageUpload}
              />
            </div>
            <small className=" text-red-500">
              **Don't submit until loading finish,
              <p>if more time take then submit**</p>
            </small>
            {/* Remarks */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Remark:</span>
              </label>
              <textarea
                type="text"
                placeholder="Write  findings, if found "
                className="input input-bordered w-full max-w-xs"
                {...register("remark")}
              />
            </div>

            <input
              type="submit"
              className="btn btn-accent w-full max-w-xs m-2"
              /*   disabled={!imgUrl ? true : false} */
              value="Submit-Data"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default DgRefuelingUpdate;
