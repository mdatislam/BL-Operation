import React from "react";
import Swal from "sweetalert2";

const EmInfoListRow = ({ emInfo, index }) => {

  const {
    siteId,
    date,
    preDate,
    EmPreSerialNo,
    EmPreReading,
    EmSerialNo,
    EmReading,
    peakReading,
    offPeakReading,
    loadCurrent,
    updaterName,
    url,
    remark,
  } = emInfo;

  //console.log(url)

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
    <tr className="border-2 border-[#F0D786] hover divide-x divide-gray-300 text-center">
      <td>{index + 1}</td>
      <td>{siteId}</td>
      <td>{preDate} </td>
      <td>{EmPreSerialNo} </td>
      <td>{EmPreReading} </td>
      <td className="text-[#3d6ae8] font-bold">{date}</td>
      <td className="text-[#3d6ae8] font-bold">{EmSerialNo} </td>
      <td className="text-[#3d6ae8] font-bold">{EmReading}</td>
      <td className="text-[#3d6ae8] font-bold">{peakReading}</td>
      <td className="text-[#3d6ae8] font-bold">{offPeakReading}</td>
      <td>{loadCurrent} </td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            {/* <Link
              to="url"
              className="mask mask-squircle w-12 h-12 "
              target="_blank"
            >
              <img src={url} alt="pic of EM Reading" />
            </Link> */}
            <button className="btn btn-link" onClick={() => handlePicView(url)}>View Pic</button>
          </div>
        </div>
      </td>
      <td>{updaterName} </td>

      <td className='whitespace-pre-line '>{remark}</td>
    </tr>
  );
};

export default EmInfoListRow;
