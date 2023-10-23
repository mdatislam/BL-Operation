import React from 'react';
import Swal from 'sweetalert2';

const DgAllServiceRows = ({ dgInfo, index, setIsChecked, isChecked }) => {
  const {
    _id,
    siteId,
    airFilter,
    batterySerialNo,
    batteryPreSerialNo,
    date,
    remark,
    rhReading,
    updaterName,
    nextPlanDate,
    url,
    preRhReading,
    previousDate,
  } = dgInfo;

  const handleCheck = (e) => {
    const { value, checked } = e.target;
    //console.log(value, checked)

    if (checked) {
      setIsChecked([...isChecked, value]);
    } else {
      setIsChecked(isChecked.filter((e) => e !== value));
    }
  };

  const handlePicView = (imgUrl) => {
    console.log(url)
    if (imgUrl) {
      window.open(imgUrl, '_blank');

      //alternative way

      /* const anchor = document.createElement('a');
      anchor.href = imageUrl;
      anchor.download = 'image.jpg'; // Specify the desired file name
      anchor.click(); */
    }
    else {
      Swal.fire({
        title: `Sorry, Picture Not Found !! `,
        width: 400,
        padding: '2em',
        color: '#FFCB24',
        background: '#fff url(/images/trees.png)',
        backdrop: `
            rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `

      });
    }
  }

  return (
    <tr className="border-2 border-[#F0D786]  hover divide-x divide-gray-300 text-center">
      <td>
        <input
          type="checkbox"
          className="checkbox"
          value={siteId}
          onChange={(e) => handleCheck(e)}
        />
      </td>
      <td>{index + 1}</td>
      <td>{siteId}</td>
      <td>{previousDate} </td>
      <td>{preRhReading} </td>
      <td>{batteryPreSerialNo} </td>
      <td className="text-[#798fcb] font-bold">{date}</td>
      <td className="text-[#3d6ae8] font-bold">{rhReading} </td>
      <td className="text-[#3d6ae8] font-bold">{batterySerialNo}</td>
      <td className="text-[#3d6ae8] font-bold">{airFilter}</td>
     
      <td>
        <div className="flex items-center space-x-3">
          {/* <div className="avatar">
            <a
              target="_blank"
              rel="noreferrer"
              href={url}
              className="mask mask-squircle w-12 h-12 "
            >
              <img src={url} alt="pic of EM Reading" />
            </a>
          </div> */}
          <button className="btn btn-link" onClick={() => handlePicView(url)}>View Pic</button>
        </div>
      </td>
      <td>{updaterName} </td>

      <td>{remark}</td>
    </tr>
  );
};

export default DgAllServiceRows;