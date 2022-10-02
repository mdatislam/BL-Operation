import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../Pages/SharedPage/Loading";
import background from "../../src/images/bb.jpg";
import { signOut } from "firebase/auth";
import auth from "../firebase.init";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const DGServicingUpdate = () => {
  const [user] = useAuthState(auth);
  const [imgUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { data: sites, isLoading } = useQuery(["siteList"], () =>
    fetch(" http://localhost:5000/dgServiceInfo", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  // console.log(sites)
  if (isLoading) {
    return <Loading />;
  }

  const handleImageUpload = (event) => {
    setLoading(true);
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.set("image", imageFile);
    fetch(
      "https://api.imgbb.com/1/upload?key=035305de2b8938534ebaad927c214018",
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
    //console.log(" click me");
    const siteID = data.siteId;
    const presentSite = sites.filter((site) => site.siteId === siteID);
    //console.log(presentSite)

    const preRhReading = presentSite.map((s) => s.rhReading);
    const batteryPreSerialNo = presentSite.map((s) => s.batterySerialNo);
    const PreDate = presentSite.map((s) => s.date);
    // console.log(EmPreReading[0])

    /*   let date = new Date();
    date.setDate(date.getDate());
    let vv = date.toLocaleDateString("en-CA");   */

    const dgServicingData = {
      siteId: siteID,
      date: data.date2,
      batterySerialNo: data.dgBatteryNo,
      rhReading: data.rhReading,
      airFilter: data.airFilter,
      previousDate: PreDate[0],
      batteryPreSerialNo: batteryPreSerialNo[0],
      preRhReading: preRhReading[0],
      updaterName: user.displayName,
      updaterEmail: user.email,
      url: imgUrl,
      remark: data.remark,
    };

    fetch(`http://localhost:5000/dgServiceInfo/${siteID}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(dgServicingData),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          toast.error("Unauthorize access");
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/Login");
        }
        return res.json();
      })
      .then((dgData) => {
        console.log(dgData);
        if (dgData.upsertedCount || dgData.modifiedCount) {
          toast.success("Data Successfully Update");
        }
        setImageUrl("");
        reset();
        //console.log(pgData)
      });
  };
  return (
    <div
      className="flex justify-center justify-items-center bg-no-repeat bg-bottom bg-fixed"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="card  lg:w-96 bg-base-100 shadow-2xl my-8">
        <div className="card-body">
          <h2 className="text-center text-secondary-focus text-2xl font-bold mb-3">
            Update DG Servicing Info !!
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
                placeholder="Site ID"
                className="input input-bordered w-full max-w-xs"
                {...register("siteId", {
                  required: {
                    value: true,
                    message: " Site ID Required",
                  },
                })}
              />
              <label className="label">
                {errors.siteId?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.siteId.message}
                  </span>
                )}
              </label>
            </div>

            {/*  DG Battery serial No */}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder=" DG Battery Serial No"
                className="input input-bordered w-full max-w-xs"
                {...register("dgBatteryNo", {
                  required: {
                    value: true,
                    message: " DG battery Serial No required",
                  },
                })}
              />
              <label className="label">
                {errors.dgBatteryNo?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.dgBatteryNo.message}
                  </span>
                )}
              </label>
            </div>

            {/*  DG RH Reading*/}
            <div className="form-control w-full max-w-xs">
              <input
                type="number"
                placeholder=" Put Servicing DG RunHour "
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

            {/* Air filter use */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Air Filter:</span>
              </label>
              <select
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...register("airFilter", {
                  required: {
                    value: true,
                    message: " Air filter use Status required",
                  },
                })}
              >
                <option value="No"> No</option>
                <option value="Yes">Yes</option>
              </select>
              <label className="label">
                {errors.airFilter?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.airFilter.message}
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
              disabled={!imgUrl ? true : false}
              value="Submit-Data"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default DGServicingUpdate;
