import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Pages/SharedPage/Loading';
import AllPgRunRows from './AllPgRunRows';

const AllPgRunList = () => {

     const { data: pgRunData, isLoading } = useQuery(["list"], () =>
    fetch("http://localhost:5000/pgRunAll", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
    return (
      <div className="px-16 mt-12 mb-8">
        <div className="grid h-12 card bg-[#6495ED] rounded-box place-items-center mb-4">
          <h2 className="text-[#006400] card-title font-bold ">
             All Approved PG Run  Record
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead className="border-3  text-[#FFcb24]">
              <tr className=" border-3 bg-[#555555]">
                <th>SN</th>

                <th>Date</th>
                <th>Site ID</th>
                <th>PG No</th>
                <th>
                  <div>PG Start</div>
                  <div>Time</div>
                </th>
                <th>
                  <div>PG Stop</div>
                  <div>Time</div>
                </th>
                <th>Duration</th>
                <th>Consumption</th>
                <th>
                  {" "}
                  <div>Approval</div>
                  <div>Responsible</div>
                </th>
                <th>PG Runner</th>
                <th>
                  <div>Approval</div>
                  <div>Status</div>
                </th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {pgRunData.map((pgRun, index) => (
                <AllPgRunRows
                  key={pgRun._id}
                  pgRun={pgRun}
                  index={index}
                ></AllPgRunRows>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AllPgRunList;