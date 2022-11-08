import React from 'react';

const FetchExcelTableRow = ({ data, index }) => {
    const {siteId,lat,long,priority,shareId,keyStatus,connectedSite,batteryInfo,batteryBackup,rectifierInfo,address}=data
    
    return (
      <>
            <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
                
          <th>{index+1}</th>
          <th>{siteId}</th>
          <th>{lat}</th>
          <th>{long}</th>
          <th>{priority}</th>
          <th>{shareId}</th>
          <th>{keyStatus}</th>
          <th>{connectedSite}</th>
          <th>{batteryInfo}</th>
          <th>{batteryBackup}</th>
          <th>{rectifierInfo}</th>
          <th>{address}</th>
        </tr>
      </>
    );
};

export default FetchExcelTableRow;