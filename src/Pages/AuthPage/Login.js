import React from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from './../../firebase.init';
import Loading from './../SharedPage/Loading';
import useToken from './../Hook/useToken';

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate()
  const location = useLocation()

  const [token] =useToken(user || gUser)

  if (gLoading || loading) {
    return <Loading/>;
  }

  let signInError;
  if (error || gError) {
    signInError = (
      <p className=" text-red-500">
        <small>{error?.message || gError?.message}</small>
      </p>
    );
  }
  const onSubmit = (data) => {
    //console.log(data)
    const password = data.password;
    const email = data.email;
    signInWithEmailAndPassword(email, password);
  };

  let from = location.state?.from?.pathname || "/Home"
  if (token) {
    navigate(from,{replace:true})
  }
  return (
    <div className="hero h-screen bg-base-200 mt-[-30px]">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <h1 className="text-2xl font-bold text-center py-2 mt-2">Login now!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body mt-[-25px]">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
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
                className="input input-bordered"
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is required",
                  },

                  minLength: {
                    value: 6,
                    message: "password length must more then 6 charecter",
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
              <label className="label mt-[-15px]">
                <Link to="xx" className="label-text-alt  link-hover">
                  Forgot password?
                </Link>
              </label>
            </div>
      {signInError}
            <div className="form-control mt-2">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
            <label className="label">
              <p className="label-text-alt text-primary font-bold">
                New here ?
                <Link to="/Signup" className="label-text-alt link link-hover">
                  &nbsp; Please Register
                </Link>
              </p>
            </label>
          </div>
        </form>
        <div class="divider mt-[-20px]">OR</div>
        <div className="hero w-full max-w-sm mb-3">
          <button onClick={() => signInWithGoogle()} class="btn btn-outline">
            Sign with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
