import React from 'react';

const DgServicePlanSitesRow = ({dgService,index}) => {

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
   
  
  let resultDate = addDaysToDate(dgService.date, 180); //Date format: YYYY-mm-dd

  // Format the result date to your desired format (DD-Mon-YYYY)
  let formattedResultDate = `${resultDate.getDate()}-${getMonthAbbreviation(resultDate.getMonth())}-${resultDate.getFullYear()}`;


    return (
       
            <tr className='divide-y-2 divide-orange-300 text-center'>
                                    <td className='border-b-2 border-orange-300 '>{index + 1}</td>
                                    <td>{dgService.siteId}</td>
                                    <td>{dgService.date}</td>
           
                                    <td>{formattedResultDate} </td>

                                </tr>
        
    );
};

export default DgServicePlanSitesRow;