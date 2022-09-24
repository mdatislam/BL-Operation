import React from 'react';

const EnergyMeter = () => {
    const date = new Date()
    date.setDate(date.getDate())
const default1 = date.toLocaleDateString('en-CA')
    return (
        <div>
          date2=  {default1}
        </div>
    );
};

export default EnergyMeter;