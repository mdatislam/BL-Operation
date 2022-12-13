import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const EditSiteData = ({ siteDataEdit, setSiteDataEdit,refetch }) => {
  const [user] = useAuthState(auth);
  const {
    siteId,
    keyStatus,
    rectifierInfo,
    batteryInfo,
    batteryBackup,
    mobileNo1,
    mobileNo2,
    unUsed,
    snagInfo,
    remark,
  } = siteDataEdit;
  const navigate = useNavigate();

  const { register, handleSubmit,reset } = useForm();

  let date = new Date();
  date.setDate(date.getDate());
  let today = date.toLocaleDateString("en-CA");

  const onSubmit = (data) => {
    const updateSiteData = {
      keyStatus: data.keyInfo,
      batteryBackup: data.batteryBackup,
      rectifierInfo: data.rectifierInfo,
      batteryInfo: data.batteryInfo,
      mobileNo1: data.mobileNo1,
      mobileNo2: data.mobileNo2,
      unUsed: data.unUsed,
        snag: data.sanag,
      remark:data.remark,
      updaterName: user.displayName,
      updaterEmail: user.email,
      date: today,
    };

    fetch(`http://localhost:5000/siteInfo/${siteId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updateSiteData),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          toast.error("Unauthorize access");
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/Login");
        }
        return res.json();
      })
      .then((siteData) => {
        //console.log(pgData);
        if (siteData.upsertedCount || siteData.modifiedCount) {
          toast.success("Data Successfully Update");
        }
        reset();
        setSiteDataEdit(null);
        refetch();
      });
  };
  return (
    <div>
      <input type="checkbox" id="siteEdit" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="siteEdit"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className=" text-center font-bold text-pink-600 text-xl mb-4 ">
            Existing Info of {siteId}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="  input-group mb-3">
              <span className=" font-bold">Key Info:</span>
              <input
                type="text"
                defaultValue={keyStatus}
                className=""
                {...register("keyInfo", {
                  required: {
                    value: true,
                    message: " Date is required",
                  },
                })}
              />
            </div>

            <div className="  input-group mb-3">
              <span className=" font-bold">Rectifier :</span>
              <input
                type="text"
                defaultValue={rectifierInfo}
                className=""
                {...register("rectifierInfo", {
                  required: {
                    value: true,
                    message: " Date is required",
                  },
                })}
              />
            </div>

            <div className="flex input-group mb-3">
              <span className=" font-bold">Battery Info:</span>
              <input
                type="text"
                defaultValue={batteryInfo}
                className="input w-full max-w-xs"
                {...register("batteryInfo", {
                  required: {
                    value: true,
                    message: " Date is required",
                  },
                })}
              />
            </div>
            <div className="flex input-group mb-3">
              <span className=" font-bold">Mobile No_1:</span>
              <input
                type="text"
                defaultValue={mobileNo1}
                className="input w-full max-w-xs"
                {...register("mobileNo1", {
                  required: {
                    value: true,
                    message: " Date is required",
                  },
                })}
              />
            </div>
            <div className="flex input-group mb-3">
              <span className=" font-bold">Mobile No_2:</span>
              <input
                type="text"
                defaultValue={mobileNo2}
                className="input w-full max-w-xs"
                {...register("mobileNo2", {
                  required: {
                    value: true,
                    message: " Date is required",
                  },
                })}
              />
            </div>

            <div className="flex input-group mb-3">
              <span className=" font-bold">Battery Backup:</span>
              <input
                type="text"
                defaultValue={batteryBackup}
                className="input w-full max-w-xs"
                {...register("batteryBackup", {
                  required: {
                    value: true,
                    message: " Date is required",
                  },
                })}
              />
            </div>

            <div className="flex input-group mb-3">
              <span className=" font-bold">UnUsed Items:</span>
              <input
                type="text"
                defaultValue={unUsed}
                className="input w-full max-w-xs"
                {...register("unUsed", {
                  required: {
                    value: true,
                    message: " Date is required",
                  },
                })}
              />
            </div>
            <div className="flex input-group mb-3">
              <span className=" font-bold">Snags List:</span>
              <textarea
                type="text"
                defaultValue={snagInfo}
                className="input w-full max-w-xs"
                {...register("unUsed", {
                  required: {
                    value: true,
                    message: " Date is required",
                  },
                })}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <textarea
                placeholder=" Remarks if have"
                className="input input-bordered w-full max-w-xs mx-2 "
                {...register("remark", {
                  required: {
                    value: true,
                    message: " Fault specific  is required",
                  },
                })}
              />
              <label className="label"></label>
            </div>
            <input
              type="submit"
              className="btn btn-primary w-full max-w-xs m-2"
              /* onClick={() => handlePgEdit(pgEdit)} */
              value="Update Data"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSiteData;