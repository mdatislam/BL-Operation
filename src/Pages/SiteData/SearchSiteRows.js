import React from "react";

const SearchSiteRows = ({ siteInfo, setSiteDataEdit }) => {
  const {
    siteId,
    lat,
    long,
    priority,
    keyStatus,
    batteryInfo,
    batteryBackup,
    connectedSite,
    rectifierInfo,
    mobileNo1,
    mobileNo2,
    snag,
    unUsed,
    remark,
  } = siteInfo;
  return (
    <div className="px-2 mb-3">
      <div className="card w-full bg-base-100 shadow">
        <div className="card-body">
          <h2 className=" bg-sky-100 shadow-lg mb-2 rounded-xl py-1 text-center font-bold text-lg text-pink-600">
            Existing Info of {siteId}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-4">
            <div className="col-start-1 col-span-3">
              <div className="stats stats-horizontal  shadow-xl bg-base-200">
                <div className="stat">
                  <div className="stat-title">Battery Info:</div>
                  <div className="card-title">{batteryInfo}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Battery Backup</div>
                  <div className="card-title">{batteryBackup}</div>
                </div>
              </div>

              <div className="stats stats-horizontal  shadow-xl bg-base-200 mt-4 ">
                <div className="stat">
                  <div className="stat-title">Key Info:</div>
                  <div className="card-title">{keyStatus}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Connected Site:</div>
                  <div className="card-title">{connectedSite}</div>
                </div>
              </div>
            </div>
            {/*  <div className="divider divider-horizontal">---OR----</div> */}
            <div className=" lg:col-start-4 col-span-3">
              <div className="stats stats-horizontal shadow-xl bg-base-200">
                <div className="stat">
                  <div className="stat-title">Latitude:</div>
                  <div className="card-title">{lat}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Longitude</div>
                  <div className="card-title">{long}</div>
                </div>
              </div>

              <div className="stats stats-horizontal shadow-xl bg-base-200 mt-4">
                <div className="stat">
                  <div className="stat-title">Priority:</div>
                  <div className="card-title">{priority}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Rectifier Info:</div>
                  <div className="card-title">{rectifierInfo}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="stats stats-horizontal shadow-xl bg-base-200 mt-4">
            <div className="stat">
              <div className="stat-title">Mobile No_1:</div>
              <div className="card-title">{mobileNo1}</div>
            </div>
          </div>
          <div className="stats stats-horizontal shadow-xl bg-base-200 mt-4">
            <div className="stat">
              <div className="stat-title">Mobile No_2:</div>
              <div className="card-title">{mobileNo2}</div>
            </div>
          </div>
          <div className="stats stats-horizontal shadow-xl bg-base-200 mt-4">
            <div className="stat">
              <div className="stat-title">Un Used List:</div>
              <div className="card-title">{unUsed}</div>
            </div>
          </div>
          <div className="stats stats-horizontal shadow-xl bg-base-200 mt-4">
            <div className="stat">
              <div className="stat-title">Snag List:</div>
              <div className="card-title">{snag}</div>
            </div>
          </div>
          <div className="stats stats-horizontal shadow-xl bg-base-200 mt-4">
            <div className="stat">
              <div className="stat-title">Remarks:</div>
              <div className="card-title">{remark}</div>
            </div>
          </div>

          <div className="card-actions justify-center">
            <label
              htmlFor="siteEdit"
              className="btn btn-info btn-sm mt-2"
              onClick={() => setSiteDataEdit(siteInfo)}
            >
              {" "}
              To Edit
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSiteRows;
