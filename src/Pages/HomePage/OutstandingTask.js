import React, { useState } from "react";

const OutstandingTask = () => {
  let presentDate = new Date("2022-11-10")
  const planDate = new Date(presentDate.setDate(presentDate.getDate() + 10)).toDateString()
  
  const [date,setDate]= useState("")
  
  const handle = (e) => {

    const x = e.target.value
  setDate(x)
    
  }
    console.log(date);
  const d= new Date(date).toDateString()
  return (
    <div className="mb-24 mx-24 h">
      <input type="date" className="input input-bordered w-full max-w-xs"
      onChange={handle}/>
      {planDate}
      <h5> { d}</h5>
    </div>
  );
};

export default OutstandingTask;
