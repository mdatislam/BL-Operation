import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import useAxiosSecure from "../Hook/useAxiosSecure";

const ProfileChange = ({ profile, setProfile }) => {
  const { name, email } = profile;
  const [user] = useAuthState(auth);
  const [axiosSecure] = useAxiosSecure()
  const navigate = useNavigate();

  const [imgUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleImageUpload = (event) => {
    setLoading(true);
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.set("image", imageFile);
    fetch(
      "https://api.imgbb.com/1/upload?key=f84c57341c651748792aeb7c4d477c29",
      {
        method: "POST",

        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data1) => {
        // console.log(data);
        setImageUrl(data1.data.display_url);
        setLoading(false);
      });
  };

  const onSubmit = (data) => {
    //console.log(" click me");

    const profileData = {
      updaterName: user.displayName,
      updaterEmail: user.email,

      role: data.role,
      otherRole: data.otherRole,
      url: imgUrl,
    };

    axiosSecure.put(`/profileChange/${email}`, profileData)

      .then((profileData) => {
        //console.log(profileData);
        if (profileData.upsertedCount || profileData.modifiedCount) {
          toast.success("Data Successfully Update");
        }
        setImageUrl("");
        reset();
        setProfile(null);
      });
  };
  return (
    <div className="">
      <input type="checkbox" id="profileChange" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative mt-28 border-4 border-sky-500 p-2">
          <label
            htmlFor="profileChange"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-center text-purple-700 my-1">Update user!</h3>
          <p className="py-2">
            {/*Data entry part start  */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Date input field */}

              <div className="form-control w-full max-w-xs">

                <input
                  type="text"
                  disabled
                  value={name}
                  className="input input-bordered w-full max-w-xs"
                />
                <label className="label"></label>
              </div>

              {/* email id */}
              <div className="form-control w-full max-w-xs">

                <input
                  type="email"
                  disabled
                  value={email}
                  className="input input-bordered w-full max-w-xs"
                />
                <label className="label"></label>
              </div>

              {/* user Role */}
              <div className="form-control w-full max-w-xs">
                <input
                  type="text"
                  placeholder="user Role"
                  className="input input-bordered border-2 border-sky-300 w-full max-w-xs"
                  {...register("role", {
                    required: {
                      value: true,
                      message: " Role defined is Required ",
                    },
                  })}
                />
                <label className="label">
                  {errors.role?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.role.message}
                    </span>
                  )}
                </label>
              </div>
              {/* Other Role */}

              <div className="form-control w-full max-w-xs">
                <input
                  type="text"
                  placeholder="user other Role, if have"
                  className="input input-bordered border-2 border-sky-300 w-full max-w-xs"
                  {...register("otherRole")}
                />
                <label className="label"></label>
              </div>

              {/* Pic of User */}
              <div className="form-control w-full max-w-xs">
                <label
                  htmlFor="image"
                  className={loading ? "btn  loading  mt-2" : "btn  mt-2"}
                >
                  Upload-Photo
                </label>
                <input
                  id="image"
                  type="file"
                  className="input input-bordered w-full max-w-xs hidden"
                  onChange={handleImageUpload}
                />
              </div>
              <input
                type="submit"
                className="btn btn-accent w-full max-w-xs m-2"
                /* disabled={!imgUrl ? true : false} */
                value="Submit-Data"
              />
            </form>
            {/*  Data entry part end*/}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileChange;
