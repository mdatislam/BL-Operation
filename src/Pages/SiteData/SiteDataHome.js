import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
//import Loading from "../SharedPage/Loading";
import EditSiteData from "./EditSiteData";
import SearchSiteRows from "./SearchSiteRows";
import mobile from "./../../images/Mobile Tower2.jpg";
import useSiteList from "../Hook/useSiteList";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import newTower from "./../../images/newTower.png";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const SiteDataHome = () => {
  const [user] = useAuthState(auth);
  const [siteList] = useSiteList();
  const [axiosSecure] = useAxiosSecure()
  // const [siteName, setSiteName] = useState("");
  const [search, setSearch] = useState("");
  const [selectSite, setSelectSite] = useState([]);
  const [siteDataEdit, setSiteDataEdit] = useState([]);
  const [visible, setVisible] = useState(false);
 


  const handleSearchSite = (e) => {
    setSearch(e.target.value);
  };


  const handleSearch = async (site) => {
    //console.log(site)
    if (search !== "") {
      const res = await axiosSecure.get(`/searchSite?site=${site}`)
      setSelectSite(res.data);
    } else {
      toast.error("Please enter valid site Id");
    }
  };



  const handleSearchItem = (searchItem) => {
    setSearch(searchItem);
  };

  //console.log(selectSite);
   //console.log(siteDataEdit);

  const {
    register,
    reset,
    //formState: { errors },
    handleSubmit,
  } = useForm();

  let date = new Date();
  date.setDate(date.getDate());
  let today = date.toLocaleDateString("en-CA");

  const onSubmit = (data) => {
    const siteNo= data.siteId
      const newSiteInfo = {
      siteId: data.siteId,
      shareId:  data.shareId !== ""?data.shareId:siteDataEdit.shareId,
      keyStatus:  data.keyStatus !=="" ? data.keyStatus:siteDataEdit.keyStatus,
      address: data.address !== ""?data.address:siteDataEdit.address,
      rectifierInfo: data.rectifierInfo !== ""?data.rectifierInfo:siteDataEdit.rectifierInfo,
      batteryInfo: data.batteryInfo !=="" ?data.batteryInfo : siteDataEdit.batteryInfo,
      loadCurrent: data.loadCurrent || siteDataEdit.loadCurrent,
      mobileNo1:  data.mobileNo1 !== ""?data.mobileNo1: siteDataEdit.mobileNo1,
      lat: data.lat || siteDataEdit.lat,
      long: data.long ||  siteDataEdit.long,
      snag: data.snag !== "" ?data.snag : siteDataEdit.snag,
      remark: data.remark !==""?data.remark:siteDataEdit.remark,
      updaterName: user.displayName,
      updaterEmail: user.email,
      date: today,
    };

    const siteEdit= async()=>{
      const {data}= await axiosSecure.put(`/siteInfo/${siteNo}`,newSiteInfo)
  
        //console.log(pgData);
        if (data.upsertedCount || data.modifiedCount) {
          toast.success(`Site ${data.siteId} update Successfully`);
        }
        reset();
        setVisible(null);
      };
    siteEdit()
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-2 gap-y-5 mt-2 mb-3  lg:mx-3 ">
      <div className="lg:col-span-4 col-start-1 bg-sky-200 rounded-lg">
        <h2 className="font-bold text-pink-500 mt-3 text-xl text-center">
          To View Site Info !!
        </h2>
        <div className="flex flex-row gap-x-2 my-5 justify-center">
          <input
            type="text"
            name="select"
            onChange={handleSearchSite}
            className="input input-bordered border-sky-400"
            placeholder="Put site no"
            value={search}
          />

          <button className="btn btn-info" onClick={() => handleSearch(search)}>
            View
          </button>
        </div>

        {/*  For site list auto suggestion */}
        <div className=" border-0 rounded-lg w-3/4 max-w-xs text-center mx-auto ">
          {siteList
            .filter((item) => {
              const searchItem = search.toLowerCase();
              const name1 = item.siteId.toLowerCase();
              return (
                searchItem && name1.includes(searchItem) && searchItem !== name1
              );
            })
            .slice(0, 10)
            .map((item, index) => (
              <ul
                className="menu p-2 w-52 justify-center"
                onClick={() => handleSearchItem(item.siteId)}
                key={index}
              >
                <li className="text-blue-500 hover"> {item.siteId}</li>
              </ul>
            ))}
        </div>
        {search &&
          selectSite.map((site) => (
            <SearchSiteRows
              key={site._id}
              siteInfo={site}
              setSiteDataEdit={setSiteDataEdit}
            />
          ))}
        {siteDataEdit && (
          <EditSiteData
            setSiteDataEdit={setSiteDataEdit}
            siteDataEdit={siteDataEdit}
            axiosSecure={axiosSecure}
          />
        )}

        {/* New site add */}
        <div className="card card-compact w-96 mx-auto bg-base-100 shadow-xl text-center justify-center mb-3 ">
          {/* <figure>
            <img src={newTower} alt="Shoes" />
          </figure> */}
          <div className="card-body px-2">
            <h2 className="text-xl font-semibold text-pink-600">
              ADD New Site{" "}
            </h2>
            <p>Click Below Button !!!</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-sm btn-outline btn-primary"
                onClick={() => setVisible(true)}
              >
                <PlusCircleIcon className="h-6 w-6 text-green-400" />
                New Site
              </button>
            </div>
          </div>
        </div>

        {visible && (
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mb-3 border-2 border-blue-200 rounded-lg p-3 lg:px-12"
            >
              <div className=" form-control mb-3">
                <label className="input-group">
                  <span className="font-bold w-32">Site ID:</span>
                  <input
                    type="text"
                    required
                    className="input input-bordered w-full max-w-xs"
                    {...register("siteId")}
                  />
                </label>
              </div>

              <div className=" form-control mb-3">
                <label className="input-group">
                  <span className="font-bold w-32">Share Site ID:</span>
                  <input
                    type="text"
                    required
                    className="input input-bordered w-full max-w-xs"
                    {...register("shareId")}
                  />
                </label>
              </div>
              <div className=" form-control mb-3">
                <label className="input-group">
                  <span className="font-bold w-32">Key Info:</span>
                  <input
                    type="text"
                    autoFocus
                    className="input input-bordered w-full max-w-xs"
                    {...register("keyStatus")}
                  />
                </label>
              </div>

              <div className="  input-group mb-3">
                <label className="input-group">
                  <span className=" font-bold w-32">Rectifier info:</span>
                  <input
                    type="text"
                    autoFocus
                    className="input input-bordered w-full max-w-xs"
                    {...register("rectifierInfo")}
                  />
                </label>
              </div>

              <div className="flex input-group mb-3">
                <label className="input-group">
                  <span className=" font-bold w-32">Battery Info:</span>
                  <input
                    type="text"
                    autoFocus
                    className="input input-bordered w-full max-w-xs"
                    {...register("batteryInfo")}
                  />
                </label>
              </div>
              <div className="flex input-group mb-3">
                <label className="input-group">
                  <span className=" font-bold w-32">Site Load Current:</span>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    {...register("loadCurrent")}
                  />
                </label>
              </div>
              <div className="flex input-group mb-3">
                <label className="input-group">
                  <span className=" font-bold w-32">Mobile No_1:</span>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    {...register("mobileNo1")}
                  />
                </label>
              </div>
              <div className="flex input-group mb-3">
                <label className="input-group">
                  <span className=" font-bold w-32">Lat:</span>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    {...register("lat")}
                  />
                </label>
              </div>

              <div className="flex input-group mb-3">
                <label className="input-group">
                  <span className=" font-bold w-32">Long:</span>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    {...register("long")}
                  />
                </label>
              </div>

              <div className="flex input-group mb-3">
                <label className="input-group">
                  <span className=" font-bold w-32">Address:</span>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    {...register("address")}
                  />
                </label>
              </div>
              <div className="flex input-group mb-3">
                <label className="input-group">
                  <span className=" font-bold w-32">Snags List:</span>
                  <textarea
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    {...register("snag")}
                  />
                </label>
              </div>
              <div className="flex input-group mb-3">
                <label className="input-group">
                  <span className=" font-bold w-32">Remark:</span>
                  <textarea
                    type="text"
                    placeholder=" Remarks if have"
                    className="input input-bordered w-full max-w-xs "
                    {...register("remark")}
                  />
                </label>
              </div>
              <div className="flex flex-row justify-center items-center">
                <input
                  type="submit"
                  className="btn btn-primary btn-sm max-w-xs m-2"
                  value="Update Data"
                />

                <button
                  className="btn btn-sm  btn-error
              "
                  onClick={() => setVisible(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* 2nd part */}
      <div className="lg:col-end-7 col-span-2">
        <div className="card w-full bg-[#1e7b82] text-primary-content">
          <figure>
            <img src={mobile} alt="Tower pic" />
          </figure>
          <div className="card-body text-center">
            <h2 className="text-white font-bold text-xl text-center">
              To View All Site Info!
            </h2>
            <p className="text-yellow-600">Click Bellow Buttons?</p>
            <div className="card-actions justify-center">
              <NavLink
                to="/siteDataInfo"
                className="btn bg-[#d99ddb] btn-outline rounded-lg btn-md"
              >
                {" "}
                Site Info
              </NavLink>
              <NavLink
                to="/snagList"
                className="btn bg-[#139d76] btn-outline rounded-lg btn-md"
              >
                {" "}
                Snag list
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteDataHome;
