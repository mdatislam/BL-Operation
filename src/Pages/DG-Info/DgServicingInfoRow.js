import React from 'react';

const DgServicingInfoRow = ({ dgInfo, index }) => {
    const {
      siteId,
        airFilter,
      batterySerialNo,
      batteryPreSerialNo,
      date,
      remark,
      rhReading,
      updaterName,
      url,
      preRhReading,
      previousDate,
    } = dgInfo;
    return (
      <tr className="border-2 border-[#F0D786] hover">
        <td>{index + 1}</td>
        <td>{siteId}</td>
        <td>{previousDate} </td>
        <td>{preRhReading} </td>
        <td>{batteryPreSerialNo} </td>
        <td className="text-[#3d6ae8] font-bold">{date}</td>
        <td className="text-[#3d6ae8] font-bold">{rhReading} </td>
        <td className="text-[#3d6ae8] font-bold">{batterySerialNo}</td>
        <td className="text-[#3d6ae8] font-bold">{airFilter}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <a
                href={url}
                className="mask mask-squircle w-12 h-12 "
                target="_blank"
              >
                <img src={url} alt="pic of EM Reading" />
              </a>
            </div>
          </div>
        </td>
        <td>{updaterName} </td>

        <td>{remark}</td>
      </tr>
    );
};

export default DgServicingInfoRow;


