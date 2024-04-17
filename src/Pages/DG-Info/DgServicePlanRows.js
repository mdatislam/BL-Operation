import React from 'react';

const DgServicePlanRows = ({dgInfo,index }) => {
  const { siteId, airFilter, date, remark, rhReading, nextPlanDate } = dgInfo;

  /*  difference calculation */

  let dateObject = new Date(date).toDateString();
  let serviceDateMsec = Date.parse(dateObject);
  let date2 = new Date();
  let todayMsec = Date.parse(date2);
  const dayDifference = todayMsec - serviceDateMsec;
  const day = (dayDifference / (1000 * 3600 * 24)).toFixed(0);
   // console.log(day);

   // Function to get the abbreviation of the month
  function getMonthAbbreviation(monthIndex) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[monthIndex];
  }

  function addDaysToDate(dateString, days) {
    let date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date;
  } 
   
  
  let resultDate = addDaysToDate(date, 180); //Date format: YYYY-mm-dd

  // Format the result date to your desired format (DD-Mon-YYYY)
  let formattedResultDate = `${resultDate.getDate()}-${getMonthAbbreviation(resultDate.getMonth())}-${resultDate.getFullYear()}`;


   
    
  return (
    <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
      <td className='w-12'>{index + 1}</td>
      <td>{siteId}</td>

      <td className=" ">{date}</td>
      <td className=" ">{rhReading} </td>
      <td className=" ">{airFilter}</td>
      <td className=" ">{day}</td>
      <td className="text-[#e41fe4f6] font-bold">{formattedResultDate}</td>
      <td>{remark}</td>
    </tr>
  );
};

export default DgServicePlanRows;