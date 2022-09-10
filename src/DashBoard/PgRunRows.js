import React from 'react';

const PgRunRows = ({ pgRun,index,pgRunner }) => {
    const { date, site, pgNo, pgStartTime, pgStoptTime, onCallName } = pgRun;
    //console.log(pgRun)
    return (
      <tr>
        <th>{index + 1}</th>
        <td>{date}</td>
        <td>{site}</td>
        <td>{pgNo}</td>
        <td>{pgStartTime}</td>
        <td>{pgStoptTime}</td>
        <td>{onCallName}</td>
            <td>{ pgRunner}</td>
      </tr>
    );
};

export default PgRunRows;