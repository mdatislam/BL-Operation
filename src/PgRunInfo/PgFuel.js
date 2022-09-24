import React from "react";
import FuelBalance from "../DashBoard/FuelBalance";
import PG from "../../src/images/PG.jpg";
import { Link } from "react-router-dom";

const PgFuel = () => {
  return (
    <div className="px-2 lg:px-16 my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <div>
          <div className="lg:card w-full bg-base-100 shadow-xl">
            <div className="lg:card-body">
              {/*  <h2 className="card-title">Card title!</h2> */}
              <div className="grid h-12 card bg-[#6495ED] rounded-box place-items-center mb-4">
                <h2 className="text-[#006400] card-title font-bold ">
                  Fuel Balance Summary
                </h2>
              </div>
              <FuelBalance />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 ">
          <div className="card w-full bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={PG}
                alt="PG Pic"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body">
              <div className="stats bg-[#6495ED] text-primary-content">
                <div className="stat">
                  <div className="stat-title">PG Run List</div>
                  <div className="stat-value">To Show </div>

                  <div className="stat-actions">
                    <Link
                      to="/AllPgRunList"
                      className="btn btn-wide btn-warning"
                    >
                      PG Run List
                    </Link>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title">Issued Fuel</div>
                  <div className="stat-value">To Show</div>
                  <div className="stat-actions">
                    <Link to="/AllFuelList" className="btn btn-wide btn-accent">
                      Fuel Issue List
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgFuel;
