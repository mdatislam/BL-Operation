import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../SharedPage/Loading";
import EditSiteData from "./EditSiteData";
import SearchSiteRows from "./SearchSiteRows";
import mobile from "./../../images/Mobile Tower2.jpg";
import useSiteList from "../Hook/useSiteList";
import { toast } from "react-toastify";

const SiteDataHome = () => {
  const [user] = useAuthState(auth);
  const [siteList] = useSiteList();
  // const [siteName, setSiteName] = useState("");
  const [search, setSearch] = useState("");
  const [selectSite, setSelectSite] = useState([]);
  const [siteDataEdit, setSiteDataEdit] = useState([]);

  const handleSearch = (site) => {
    //console.log(site)
    if (search !== "") {
      fetch(
        `https://bl-operation-server-production.up.railway.app/searchSite?site=${site}`
      )
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          setSelectSite(data);
        });
    } else {
      toast.error("Please enter valid site Id");
    }
  };

  const handleSearchSite = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchItem = (searchItem) => {
    setSearch(searchItem);
  };

  //console.log(selectSite);
  // console.log(siteDataEdit);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-2 gap-y-5 mt-2 mb-3 px-1 lg:mx-3 ">
      <div className="lg:col-span-4 col-start-1 bg-sky-300 rounded-lg">
        <h2 className="font-bold text-pink-500 mt-3 text-xl text-center">
          Enter Site ID To View Site Info !!
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
        <div className=" border-0 rounded-lg w-3/4 max-w-xs text-center">
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
          selectSite?.map((site) => (
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
            
          />
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
