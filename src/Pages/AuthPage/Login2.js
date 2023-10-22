import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import loginBack from "../../images/authentication2.png";
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';




const Login2 = () => {
    const { loginUser, loading: authLoading } = useContext(AuthContext);
    const [loading, setLoading] = useState(false); // Local loading state for login operation
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        setLoading(authLoading);
    }, [authLoading]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        setLoading(true); // Set loading state to true when form is submitted

        try {
           
            const result = await loginUser(email, password);
            const user = result.user;
            setLoading(true)
            const updateToken =  localStorage.getItem('accessToken')

            if (user && updateToken) {
                navigate(from, { replace: true });
                Swal.fire({
                    title: `welcome-To-Rangpur,O&M `,
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
                setLoading(false);
            }
        } catch (error) {
            const errorMessage = error.message;
            if (errorMessage.toLowerCase().includes("password")) {
                setError("Error: Incorrect password. Please try again.");
            } else if (errorMessage.toLowerCase().includes("user")) {
                setError("Error: Incorrect User-Id. Please try again.");
            }
            else if (errorMessage.toLowerCase().includes("querySrv ETIMEOUT")) {
                setError("Error: Please Check your net connection.");
            }
        } finally {
            setLoading(false); // Ensure loading state is set to false regardless of success or failure
        }
    };


    return (
        <div className="card bg-base-300 shadow-xl  border-2 ">
            <div className="hero  bg-base-200 mt-5">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center hidden lg:block">
                        <img src={loginBack} alt="logimg" />
                    </div>

                    <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-5" onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="text-center">
                                <h1 className="text-xl font-bold"> Login now !</h1>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" name='email' required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" name='password' required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                {/* For login Error Message show  */}
                                <label className="label">
                                    <strong className='text-red-500 label-text-alt'>{error}</strong>
                                    {/* { admin && <p >New here?<Link className="label-text-alt link link-hover" to="/Signup" >Create New account</Link></p>} */}
                                </label>

                            </div>


                            <div className="form-control mt-6">
                                <input className={loading ? "btn btn-warning" : "btn btn-success"} type="submit" value="Login" />
                            </div>
                        </div>
                    </form>

                </div>
            </div>


        </div>
    );
};

export default Login2;