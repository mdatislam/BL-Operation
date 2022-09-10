import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../firebase.init';

const PgRunUpdate = () => {
    const [user]=useAuthState(auth)
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    } = useForm();
    
    const onSubmit =  (data) => {
        //console.log(data)
        const PgRunData = {
          site: data.siteName,
          date: data.date,
          pgStartTime: data.startTime,
            pgStoptTime: data.stopTime,
            pgNo:data.pgNo,
          onCallName:data.onCallName,
          email:user.email
        };
         //console.log(PgRunData);
        fetch('http://localhost:5000/pgRunData', {
            method: 'POST',
            headers: {
                'content-type':'application/json',
            },
            body:JSON.stringify(PgRunData)
        })
            .then(res => res.json())
            .then(pgData => {
                if (pgData.insertedId) {
                    toast.success('Data Successfully Update')
                }
                reset()
            //console.log(pgData)
        })
     }

  /*  const { data:services, isLoading } = useQuery('serviceName', () => fetch('https://floating-earth-43239.herokuapp.com/servicesName').then(res => res.json()))
   // console.log(services)
    if(isLoading)
    { return <Loading/>} */

     return (
       <div className="flex  justify-center justify-items-center mt-8">
         <div class="card w-96 bg-base-100 shadow-xl">
           <div class="card-body">
             <h2 class="text-center text-2xl font-bold mb-3">
               ADD PG Run Data!
             </h2>
             <form onSubmit={handleSubmit(onSubmit)}>
               {/*  Name input field */}

               <div class="form-control w-full max-w-xs">
                 <label className="label">
                   <span className="label-text">Date:</span>
                 </label>
                 <input
                   type="date"
                   placeholder="Date"
                   class="input input-bordered w-full max-w-xs"
                   {...register("date", {
                     required: {
                       value: true,
                       message: " Date is required",
                     },
                   })}
                 />
                 <label class="label">
                   {errors.date?.type === "required" && (
                     <span class="label-text-alt text-red-500">
                       {errors.date.message}
                     </span>
                   )}
                 </label>
               </div>
               {/*  Site Name */}
               <div class="form-control w-full max-w-xs">
                 <input
                   type="text"
                   placeholder=" Site Name"
                   class="input input-bordered w-full max-w-xs"
                   {...register("siteName", {
                     required: {
                       value: true,
                       message: " Site Name is required",
                     },
                   })}
                 />
                 <label class="label">
                   {errors.siteName?.type === "required" && (
                     <span class="label-text-alt text-red-500">
                       {errors.siteName.message}
                     </span>
                   )}
                 </label>
               </div>

               {/*  PG Start Time */}
               <div class="form-control w-full max-w-xs">
                 <label className="label">
                   <span className="label-text">PG Start Time:</span>
                 </label>
                 <input
                   type="time"
                   placeholder="startTime"
                   class="input input-bordered w-full max-w-xs"
                   {...register("startTime", {
                     required: {
                       value: true,
                       message: " Start Time is required",
                     },
                   })}
                 />
                 <label class="label">
                   {errors.startTime?.type === "required" && (
                     <span class="label-text-alt text-red-500">
                       {errors.startTime.message}
                     </span>
                   )}
                 </label>
               </div>

               {/*  PG Stop Time */}
               <div class="form-control w-full max-w-xs">
                 <label className="label">
                   <span className="label-text">PG Stop Time:</span>
                 </label>
                 <input
                   type="time"
                   placeholder="stopTime"
                   class="input input-bordered w-full max-w-xs"
                   {...register("stopTime", {
                     required: {
                       value: true,
                       message: " stop Time is required",
                     },
                   })}
                 />
                 <label class="label">
                   {errors.stopTime?.type === "required" && (
                     <span class="label-text-alt text-red-500">
                       {errors.stopTime.message}
                     </span>
                   )}
                 </label>
               </div>
               {/*  PG NO*/}
               <div class="form-control w-full max-w-xs">
                 <input
                   type="text"
                   placeholder="PG Number"
                   class="input input-bordered w-full max-w-xs"
                   {...register("pgNo", {
                     required: {
                       value: true,
                       message: " PG Number is required",
                     },
                   })}
                 />
                 <label class="label">
                   {errors.pgNo?.type === "required" && (
                     <span class="label-text-alt text-red-500">
                       {errors.pgNo.message}
                     </span>
                   )}
                 </label>
               </div>
               {/*  On Call Engineer  Name */}
               <div class="form-control w-full max-w-xs">
                 <input
                   type="text"
                   placeholder=" On Call  Name"
                   class="input input-bordered w-full max-w-xs"
                   {...register("onCallName", {
                     required: {
                       value: true,
                       message: " onCall Name is required",
                     },
                   })}
                 />
                 <label class="label">
                   {errors.onCallName?.type === "required" && (
                     <span class="label-text-alt text-red-500">
                       {errors.onCallName.message}
                     </span>
                   )}
                 </label>
               </div>

               <input
                 type="submit"
                 class="btn btn-accent w-full max-w-xs m-2"
                 value="ADD"
                 /*   <button class="btn btn-success">Success</button> */
               />
             </form>
           </div>
         </div>
       </div>
     );
    
};;

export default PgRunUpdate;