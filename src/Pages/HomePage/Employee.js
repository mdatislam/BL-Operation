import React, { useEffect, useState } from 'react';
import EmployeeList from './EmployeeList';

const Employee = () => {
    const [employees,setEmployee]=useState([])
    useEffect(()=>{
        fetch('employee.json')
        .then(res=>res.json())
        .then(data=>{
           //console.log(data)
            setEmployee(data)
        }
            )
    },[])
    return (
        <div className='mt-12 bg-slate-100 px-8 mb-4'>
            <h1 className='text-warning text-center font-bold text-2xl  py-8'> Total O&amp;M  Employees:{employees.length}</h1>
            <div className='grid lg:grid-cols-4 gap-4 gap-y-4'>
            {
                employees.map(emp=> <EmployeeList
                key={emp.id}
                emp={emp}></EmployeeList>)
            }
            </div>
           
        </div>
    );
};

export default Employee;