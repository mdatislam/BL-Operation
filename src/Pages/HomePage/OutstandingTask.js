import React, { useState } from "react";

const OutstandingTask = () => {
  const [search,setSearch]=useState("")
  let data = [
    {"name":"Atiq"},
    {"name":"Atifa"},
    {"name":"Adwa"},
    {"name":"Baba"},
    {"name":"Bablu"},
    {"name":"Belal"},
   
  ]

  const handleSearch = (e) => {
  setSearch(e.target.value)
  }
  
  const handleSearchItem = (searchItem) => {
    
    setSearch(searchItem);
  };

  return (
    <div className="mb-24 mx-24 h">
      <input
       
        type="text"
        placeholder=" Energy Meter Serial No"
        className="input input-bordered w-full max-w-xs"
        value={search}
        onChange={handleSearch}
      />

      <div className=" border-2 rounded-lg w-3/4 max-w-xs mt-2">
        {data
          .filter((item) => {
            const searchItem = search.toLowerCase();
            const name1 = item.name.toLowerCase();
            return (
              searchItem && name1.startsWith(searchItem) && searchItem !== name1
            );
          })
          .slice(0, 10)
          .map((item, index) => (
            <ul
              
              className="menu p-2 w-52"
              onClick={() => handleSearchItem(item.name)}
              key={index}
            >
              <li className="text-blue-500 hover"> {item.name}</li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default OutstandingTask;
