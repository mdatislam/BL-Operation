import React from "react";

const OutstandingTask = () => {
  return (
    <div className="mt-8 bg-slate-200">
      <h1 className="text-warning text-center font-bold text-2xl  py-8">
        {" "}
        Outstanding Performance
      </h1>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://placeimg.com/260/400/arch"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Will be update later gradually!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutstandingTask;
