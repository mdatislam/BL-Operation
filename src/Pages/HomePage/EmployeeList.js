import React from 'react';

const EmployeeList = ({emp}) => {
    const {name,designation,pic}=emp
    return (
        <div class="card card-compact w-70 bg-base-100 shadow-xl">
  
   <img src={pic} className="w-65" alt="em"></img>
   
  <div class="card-body">
    <h2 class="card-title">{name}</h2>
    <p className='font-bold text-sm'>{designation}</p>
  </div>
</div>
    );
};

export default EmployeeList;