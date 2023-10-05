import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../SharedPage/Loading";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";


const SignUp = () => {
  const { createUser, updateUser, loading } = useContext(AuthContext)
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const [errorMsg, setError] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imgLoading,setImgLoading]=useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  let from = location.state?.from?.pathname || "/";


const handleImageUpload=(event)=>{
  setImgLoading(true);
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
      .then(imgResponse => {
        //console.log(imgResponse)
        const imgUrl = imgResponse.data.display_url
        setImageUrl(imgUrl)
        setImgLoading(false)
      })

}
  const onSubmit = async (data) => {
    //console.log(data);
    const name = data.name
    const password = data.password
    const email = data.email
    const photo = imageUrl
    // default profile image url "https://i.ibb.co/kmXfZgh/profile.png"

    if (imageUrl) {
      createUser(email, password)
        .then(result => {
          const user = result.user
          console.log('createUser', user)
          if (user) {
            updateUser(name, photo)
              .then(result => {
                const userInfo = {
                  name, email, password,
                  url: imageUrl || "https://i.ibb.co/kmXfZgh/profile.png", role: "general"
                }
                fetch('http://localhost:5000/user', {
                  method: 'PUT',
                  headers: {
                    'content-type': 'application/json'
                  },
                  body: JSON.stringify(userInfo)
                })
                  .then(res => res.json())
                  .then(data => {
                    if (data.insertedId) {
                      Swal.fire({
                        title: ` user ${user.displayName}  create successfully `,
                        width: 500,
                        padding: '3em',
                        color: '#FFCB24',
                        background: '#fff url(/images/trees.png)',
                        backdrop: `
                        rgba(0,0,123,0.4)
                      url("/images/nyan-cat.gif")
                      left top
                      no-repeat
                    `
                      })
                    }
                  })
                reset()
              })
          }
          navigate(from, { replace: true })
        })
        .catch((error) => {
          const errorMsg = error.message
          console.log(errorMsg)
          setError(errorMsg)
        })
    }



  };


  if (loading) {
    return <Loading />;
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <h1 className="text-2xl font-bold text-center py-2 mt-2">
          Register Here!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body mt-[-20px]">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name:</span>
              </label>
              <input
                type="text"
                placeholder="your name"
                className="input input-bordered"
                {...register("name", {
                  required: {
                    value: true,
                    message: "name is required",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>
            {/* For Image field */}
            <div className="form-control w-full max-w-xs">
              <label
                htmlFor="image"
                className={imgLoading ? "btn  loading  mt-5" : "btn  mt-5"}
              >
                Upload-Photo
              </label>
              <small className=" text-red-500">
                **Don't submit until loading finish,
                <p>if more time take then submit**</p>
              </small>
              <input
                id="image"
                name="imgName"
                type="file"
                className="input input-bordered w-full max-w-xs hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/*   email field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email:</span>
              </label>
              <input
                type="email"
                placeholder="enter a email"
              required
                className="input input-bordered"
                {...register("email", {
                  required: {
                    value: true,
                    message: "email is required",
                  },

                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "provide a valid email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            {/*  password field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
              required
                autoComplete="off"
                className="input input-bordered"
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is required",
                  },

                  minLength: {
                    value: 6,
                    message: "Password length at Least 6 character",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <label className="label">
                <p className="label-text-alt text-primary font-bold">
                  Have account ?
                  <Link to="/Login" className="label-text-alt link link-hover">
                    &nbsp; Go Login
                  </Link>
                </p>
              </label>
            </div>
            {errorMsg}
            <div className="form-control mt-2">
              <input
              /* disabled={imageUrl ? false:true} */
                type="submit"
                className="btn btn-primary"
                value="Register"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
