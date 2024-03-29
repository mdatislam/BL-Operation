
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import usePgList from "../Pages/Hook/usePgList";
import useSiteList from "./../Pages/Hook/useSiteList";
import useUserList from "../Pages/Hook/useUserList";
import useAxiosSecure from "../Pages/Hook/useAxiosSecure";
import useVehicleList from "../Pages/Hook/useVehicleList";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const FuelUpdate = () => {
  const [user] = useAuthState(auth);
  const [siteList] = useSiteList();
  const [userList]=useUserList()
  const [vehicleList]=useVehicleList()
   const [axiosSecure]=useAxiosSecure()
  const [search, setSearch] = useState("");
  //const [admin] = useAdmin(user);
  const [PgList] = usePgList();
  
  const {
    register,
    reset,
    formState: {errors},
    handleSubmit,
  } = useForm();

  
  /*  today find code */
  let date = new Date();
  date.setDate(date.getDate());
  let today = date.toLocaleDateString("en-CA");
//console.log(userList)
  const availableUser = userList?.filter((u) => u.name !== user.displayName);

  
  /*  For site list auto suggestion */
  const handleSiteSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchItem = (searchItem) => {
    setSearch(searchItem);
  };

  const onSubmit = (data) => {
   
    const fuelInfo = {
      siteId: search,
      date: data.date,
      slipNo: data.slipNo,
      pgNo: data.pgNo,
      vehicleNo: data.carNo,
      fuelQuantity: data.fuel,
      fuelIssuer: data.fuelIssuer,
      fuelReceiverName: user.displayName,
      fuelReceiverEmail: user.email,
         remark: data.remark,
    };

    const updateFuel = async () => {
      const { data } = await axiosSecure.post("/fuelData", fuelInfo)
      if (data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Fuel Data has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        reset()
     
      }
      else{
        toast.error(`Warning: ${data.msg}`);
      }
      
    }
    updateFuel()

      };

  return (
    <div className="flex  justify-center justify-items-center mt-8">
      <div className="card w-96 bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-center text-secondary-focus text-2xl font-bold mb-3">
            Update Receive Fuel Info!
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Date input field */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Date:</span>
              </label>
              <input
                type="date"
                placeholder="Date"
                defaultValue={today}
                className="input input-bordered w-full max-w-xs"
                {...register("date", {
                  required: {
                    value: true,
                    message: " Date is required",
                  },
                })}
              />
              <label className="label">
                {errors.date?.type ==="required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.date.message}
                  </span>
                )}
              </label>
            </div>
            {/*  Slip Name */}
            <div className="form-control w-full max-w-xs">
              <input
                type="number"
                placeholder=" Fuel Slip No"
                required
                className="input input-bordered w-full max-w-xs"
                {...register("slipNo", {
                  required: {
                    value: true,
                    message: " Slip No is required",
                  },
                })}
              />
              <label className="label">
                {errors.slipNo?.type ==="required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.slipNo.message}
                  </span>
                )}
              </label>
            </div>
            {/*  PG No */}
            <div className="form-control w-full max-w-xs">
              <select
                type="text"
                placeholder=" PG Number "
                className="input input-bordered w-full max-w-xs"
                {...register("pgNo", {
                  required: {
                    value: true,
                    message: " PG No Required",
                  },
                })}
              >
                <option value=""> --------Select PG No-------------- </option>
                {PgList?.map((pg) => (
                  <option value={pg.pgNo}>{pg.pgNo}</option>
                ))}
              </select>
              <label className="label">
                {errors.pgNo?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.pgNo.message}
                  </span>
                )}
              </label>
            </div>
            {/* Vehicle No */}
            <div className="form-control w-full max-w-xs">
              <select
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...register("carNo", {
                  required: {
                    value: true,
                    message: " Vehicle No Required",
                  },
                })}
              >
                <option>--------Pick Car No----------</option>
                {vehicleList?.map((car) => (
                  <option value={car.vehicleNo}>{car.vehicleNo}</option>
                ))} 
              </select>
              <label className="label">
                {errors.carNo?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.carNo.message}
                  </span>
                )}
              </label>
            </div>
            {/*  Site ID */}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder="Site ID ( type only number )"
                onChange={handleSiteSearch}
                value={search}
                required
                className="input input-bordered w-full max-w-xs"
              />
              {/*  For site list auto suggestion */}

              <div className=" border-0 rounded-lg w-3/4 max-w-xs mt-2">
                {siteList
                  .filter((item) => {
                    const searchItem = search.toLowerCase();
                    const name1 = item.siteId.toLowerCase();
                    return (
                      searchItem &&
                      name1.includes(searchItem) &&
                      searchItem !== name1
                    );
                  })
                  .slice(0, 10)
                  .map((item, index) => (
                    <ul
                      className="menu p-2 w-52"
                      onClick={() => handleSearchItem(item.siteId)}
                      key={index}
                    >
                      <li className="text-blue-500 hover"> {item.siteId}</li>
                    </ul>
                  ))}
              </div>
              <label className="label"></label>
            </div>
            {/*  Fuel Quantity*/}
            <div className="form-control w-full max-w-xs">
              <input
                type="number"
                placeholder="Fuel Quantity"
                required
                className="input input-bordered w-full max-w-xs"
                {...register("fuel", {
                  required: {
                    value: true,
                    message: " Fuel Quantity required",
                  },
                })}
              />
              <label className="label">
                {errors.fuel?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.fuel.message}
                  </span>
                )}
              </label>
            </div>
            {/*  On Fuel receiver   Name */}

            
            {/*  On Call Engineer  Name */}
            <div className="form-control w-full max-w-xs">
              <select
                type="text"
                placeholder=" Fuel Issuer Name"
                className="input input-bordered w-full max-w-xs"
                {...register("fuelIssuer", {
                  required: {
                    value: true,
                    message: " Fuel Issuer Name required",
                  },
                })}
              >
                <option value="">
                  {" "}
                  -------- Select On Caller Name-------{" "}
                </option>
                {availableUser.map((user) => (
                  <option value={user.name}
                  key={user.name}
                  >{user.name} </option>
                ))}
              </select>
              <label className="label">
                {errors.fuelIssuer?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.fuelIssuer.message}
                  </span>
                )}
              </label>
            </div>
            {/* Remarks */}
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder=" Write Remark if have"
                className="input input-bordered w-full max-w-xs"
                {...register("remark")}
              />
              <label className="label"></label>
            </div>
            <input
              type="submit"
              className="btn btn-success btn-wide max-w-xs m-2"
             /*  disabled={isLoading ? true:false} */
              value="Submit-Data"
             
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FuelUpdate;
