import React from "react";
import PG from "../../src/images/PG.jpg";
import { Link } from "react-router-dom";
import PgStatus from "./PgStatus";
import FuelBalanceInfo from "../DashBoard/FuelBalanceInfo";

const PgFuel = () => {
  return (
    <div className="px-2 lg:px-8 my-2">
      <div className="w-full md:w-3/4 mx-auto">
        <div className="lg:card w-full bg-base-100 shadow-xl">
          <div className="lg:card-body">

          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-4 ">
          <div className="">
            {/* <div className=" text-primary-content flex flex-col lg:flex-row gap-y-4 lg:gap-x-4">
              <div className="stat bg-[#6495ED] rounded-lg  ">
                <div className="stat-value">To Show</div>
                <div className="stat-title text-white font-bold"> All PG Run List </div>

                <div className="stat-actions">
                  <Link to="/AllPgRunList" className="btn btn-md btn-outline text-white ">
                   Click Here
                  </Link>
                </div>
              </div>

              <div className="stat bg-[#6492ed] rounded-lg ">
                <div className="stat-value">To Show</div>
                <div className="stat-title">Issued Fuel List</div>
                <div className="stat-actions flex  gap-x-2">
                  <Link to="/AllFuelList" className="btn btn-md btn-outline text-white">
                    Updated_Own
                  </Link>
                  <Link
                    to="/AllFuelListOncall"
                    className="btn btn-md btn-outline btn-warning"
                  >
                    Updated_Oncall
                  </Link>
                </div>
              </div>
            </div> */}
            <div className="card w-full bg-base-100 shadow-xl">
              <PgStatus />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgFuel;
