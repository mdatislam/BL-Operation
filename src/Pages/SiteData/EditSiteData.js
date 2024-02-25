import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../firebase.init";



const EditSiteData = ({ siteDataEdit, setSiteDataEdit, refetch, axiosSecure }) => {
  const [user] = useAuthState(auth);

  const {
    siteId,
    keyStatus,
    rectifierInfo,
    batteryInfo,
    batteryBackup,
    mobileNo1,
    loadCurrent,
    unUsed,
    snag,
    remark,
  } = siteDataEdit;

 //console.log(siteDataEdit)


  const { register, handleSubmit, reset } = useForm();

  let date = new Date();
  date.setDate(date.getDate());
  let today = date.toLocaleDateString("en-CA");

  const onSubmit = (data) => {
    const updateSiteData = {
      keyStatus: data.keyStatus || siteDataEdit.keyStatus,
      batteryBackup: data.batteryBackup || siteDataEdit.batteryBackup,
      rectifierInfo: data.rectifierInfo || siteDataEdit.rectifierInfo,
      batteryInfo: data.batteryInfo || siteDataEdit.batteryInfo,
      mobileNo1: data.mobileNo1 || siteDataEdit.mobileNo1,
      loadCurrent: data.loadCurrent || siteDataEdit.loadCurrent,
      unUsed: data.unUsed || siteDataEdit.unUsed,
      snag: data.snag || siteDataEdit.snag,
      remark: data.remark || siteDataEdit.remark,
      updaterName: user.displayName,
      updaterEmail: user.email,
      date: today,
    };

    let confrmMsg = window.confirm(
      "Are you Check All Fields ?\n If YES press Ok otherwise Cancel"
    );
    if (confrmMsg) {

      const siteEdit = async () => {
        const { data } = await axiosSecure.put(`/siteInfo/${siteId}`, updateSiteData)

        //console.log(data);
        if (data.upsertedCount || data.modifiedCount) {
          toast.success(`Site ${data.siteId} update Successfully`);
        }
        reset();
        setSiteDataEdit(null);
      };
      siteEdit()

    }
    else {
      toast.warning("Not update, Please Click All Unchanged field");
    }
  };
  return (
    <div>
      <input type="checkbox" id="siteEdit" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="siteEdit"
            className="btn btn-sm btn-circle btn-error absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className=" text-center font-bold text-pink-600 text-xl mb-4 ">
            Existing Info of {siteId}
          </h3>
          {/* <h5 className="text-red-500 font-bold text-xs mb-2">
            NB:Where data already available & not need to change Please only "
            click" that fields before update.
          </h5> */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-3 border-2 border-blue-200 rounded-lg p-3"
          >
            <div className=" form-control mb-3">
              <label className="input-group">
                <span className="font-bold">Key Info:</span>
                <input
                  type="text"
                  defaultValue={keyStatus}
                  autoFocus
                  className="input input-bordered w-full max-w--xs"
                  {...register("keyStatus")}
                />
              </label>
            </div>

            <div className="  input-group mb-3">
              <label className="input-group">
                <span className=" font-bold">Rectifier info:</span>
                <input
                  type="text"
                  defaultValue={rectifierInfo}
                  autoFocus
                  className="input input-bordered w-full max-w--xs"
                  {...register("rectifierInfo")}
                />
              </label>
            </div>

            <div className="flex input-group mb-3">
              <label className="input-group">
                <span className=" font-bold">Battery Info:</span>
                <input
                  type="text"
                  defaultValue={batteryInfo}
                  autoFocus
                  className="input input-bordered w-full max-w--xs"
                  {...register("batteryInfo")}
                />
              </label>
            </div>
            <div className="flex input-group mb-3">
              <label className="input-group">
                <span className=" font-bold">Mobile No_1:</span>
                <input
                  type="text"
                  defaultValue={mobileNo1}
                  className="input input-bordered w-full max-w--xs"
                  {...register("mobileNo1")}
                />
              </label>
            </div>
            <div className="flex input-group mb-3">
              <label className="input-group">
                <span className=" font-bold">Site Load Current:</span>
                <input
                  type="text"
                  defaultValue={loadCurrent}
                  className="input input-bordered w-full max-w--xs"
                  {...register("loadCurrent")}
                />
              </label>
            </div>

            <div className="flex input-group mb-3">
              <label className="input-group">
                <span className=" font-bold">Battery Backup:</span>
                <input
                  type="text"
                  defaultValue={batteryBackup}
                  className="input input-bordered w-full max-w--xs"
                  {...register("batteryBackup")}
                />
              </label>
            </div>

            <div className="flex input-group mb-3">
              <label className="input-group">
                <span className=" font-bold">UnUsed Items:</span>
                <input
                  type="text"
                  defaultValue={unUsed}
                  className="input input-bordered w-full max-w--xs"
                  {...register("unUsed")}
                />
              </label>
            </div>
            <div className="flex input-group mb-3">
              <label className="input-group">
                <span className=" font-bold">Snags List:</span>
                <textarea
                  type="text"
                  defaultValue={snag}
                  className="input input-bordered w-full max-w--xs"
                  {...register("snag")}
                />
              </label>
            </div>
            <div className="form-control w-full max-w-xs mb-3">
              <label className="input-group">
                <span className=" font-bold">Remark:</span>
                <textarea
                  type="text"
                  defaultValue={remark}
                  placeholder=" Remarks if have"
                  className="input input-bordered w-full max-w--xs "
                  {...register("remark")}
                />
              </label>
            </div>
            <div className="flex flex-row justify-center items-center">
              {
                <input
                  type="submit"
                  className="btn btn-primary btn-sm max-w-xs m-2"
                  /*    onClick={() => handlePgEdit(pgEdit) */
                  value="Update Data"
                />
              }

              <label htmlFor="siteEdit" className="btn btn-sm  btn-error">
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSiteData;
