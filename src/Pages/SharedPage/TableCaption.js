import React from 'react';

const TableCaption = ({ tableHeading,bgColor }) => { 
    return (

        <caption class=" caption-top py-2 bg-slate-500 rounded-t-lg " style={{backgroundColor:bgColor}}>
            <div className=' '>
                <h2 className='text-center text-xl font-bold  text-white'> {tableHeading}</h2>
            </div>
        </caption>


    );
};

export default TableCaption;