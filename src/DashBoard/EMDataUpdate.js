import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import background from "../../src/images/bb.jpg";
import useSiteList from "./../Pages/Hook/useSiteList";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Pages/SharedPage/Loading";
import { BackspaceIcon } from "@heroicons/react/24/solid";


const EMDataUpdate = () => {
  const [user] = useAuthState(auth);
  const [siteList] = useSiteList();
  const [search, setSearch] = useState("");
  const [axiosSecure] = useAxiosSecure()
  const [imgUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()



  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {isLoading, data: siteEmInfo = [], } = useQuery({
    queryKey: ["siteEmInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get("/emInfo/all")
      return res.data
    }
  })

  // console.log(sites)
  if (isLoading ) {
    return <Loading />;
  }

  

  const handleImageUpload = (event) => {
    setLoading(true);
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.set("image", imageFile);
    fetch(
      "https://api.imgbb.com/1/upload?key=f84c57341c651748792aeb7c4d477c29",
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


  const onSubmit = async (data) => {
    
    //console.log(" click me");
    const siteID = search;
    
//console.log(siteEmInfo)
     const presentSite = siteEmInfo?.filter((site) => site.siteId === siteID);

   //console.log(presentSite)
     const EMData = {
      siteId: siteID,
      date: data.date2,
      EmSerialNo: data.emNo,
      EmReading: data.emReading,
      preDate: presentSite[0]?.date || "first update",
      EmPreSerialNo:presentSite[0]?.EmSerialNo ||" first update",
      EmPreReading:presentSite[0]?.EmReading || "first update",
      peakReading: data.peak,
      offPeakReading: data.offPeak,
      loadCurrent: data.loadCurrent,
      updaterName: user.displayName,
      updaterEmail: user.email,
      url: imgUrl || "",
      remark: data.remark,
    };
   //console.log(EMData)
    const updateEm = async () => {
      const { data } = await axiosSecure.put(`/emInfo/${siteID}`, EMData)
      //console.log(data)
      if (data.acknowledged) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'EM Data has been saved',
          showConfirmButton: false,
          timer: 2000
        })
        reset()
        navigate("/EmInfo")
      }
      else {
        toast.error(`Warning: ${data.msg}`);
      }

    }
    updateEm()


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
            to="/EmInfo"
            className="btn btn-outline btn-primary font-semiBold text-xl mb-2"
          >
           <BackspaceIcon className="h-6 w-6 text-green-400"/>
            Back &nbsp; EM info List
          </Link>
          <h2 className="text-center text-secondary-focus text-2xl font-bold mb-3">
            Update Energy Meter Info !!
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

            {/* Load Current */}
            <div className="form-control w-full max-w-xs">
              <input
                type="number"
                placeholder="Site's DC Load Current"
                className="input input-bordered w-full max-w-xs"
                {...register("loadCurrent", {
                  required: {
                    value: true,
                    message: " Load Current is required",
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

            {/*  EM serial No */}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder=" Energy Meter Serial No"
                className="input input-bordered w-full max-w-xs"
                {...register("emNo", {
                  required: {
                    value: true,
                    message: " Energy Meter Serial No required",
                  },
                })}
              />
              <label className="label">
                {errors.emNo?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.emNo.message}
                  </span>
                )}
              </label>
            </div>

            {/*  Energy Meter Reading*/}
            <div className="form-control w-full max-w-xs">
              <input
                type="number"
                step=".001"
                placeholder=" Put Total Meter Reading "
                className="input input-bordered w-full max-w-xs"
                {...register("emReading", {
                  required: {
                    value: true,
                    message: " Energy Meter Total Reading Required",
                  },
                })}
              />
              <label className="label">
                {errors.emReading?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.emReading.message}
                  </span>
                )}
              </label>
            </div>
            {/*  Energy Meter Peak Reading*/}
            <div className="form-control w-full max-w-xs">
              <input
                type="number"
                placeholder=" Put Peak Reading if have "
                className="input input-bordered w-full max-w-xs"
                {...register("peak")}
              />
              <label className="label"></label>
            </div>
            {/*  Energy Meter offPeak Reading*/}
            <div className="form-control w-full max-w-xs">
              <input
                type="number"
                placeholder="Put OffPeak Reading if have"
                className="input input-bordered w-full max-w-xs"
                {...register("offPeak")}
              />
              <label className="label"></label>
            </div>
            {/* Pic of EM Reading */}
            <div className="form-control w-full max-w-xs">
              <label
                htmlFor="image"
                className={loading ? "btn  loading  mt-5" : "btn  mt-5"}
              >
                Upload-Photo
              </label>
              <small className=" text-red-500">
                **Don't submit until loading finish,
                <p>if more time take then submit**</p>
              </small>
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
              /* className={isLoading ? "btn btn-warning btn-wide loading max-w-xs m-2"
                : "btn btn-success  btn-wide max-w-xs m-2"} */
              /* disabled={isLoading ? true:false} */
              className="btn btn-info btn-wide  max-w-xs m-2"
              value="Submit-Data"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EMDataUpdate;
