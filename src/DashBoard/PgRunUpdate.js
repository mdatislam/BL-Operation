import React from 'react';
import { useForm } from 'react-hook-form';

const PgRunUpdate = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    } = useForm();
    
    const onSubmit = async (data) => { }

  /*  const { data:services, isLoading } = useQuery('serviceName', () => fetch('https://floating-earth-43239.herokuapp.com/servicesName').then(res => res.json()))
   // console.log(services)
    if(isLoading)
    { return <Loading/>} */

     return (
       <div className="flex  justify-center justify-items-center mt-8">
         <div class="card w-96 bg-base-100 shadow-xl">
           <div class="card-body">
             <h2 class="text-center text-2xl font-bold">ADD PG Run Data!</h2>
             <form onSubmit={handleSubmit(onSubmit)}>
               {/*  Name input field */}

               <div class="form-control w-full max-w-xs">
                 <label class="label">
                   <span class="label-text">Name</span>
                 </label>
                 <input
                   type="text"
                   placeholder="Doctor Name"
                   class="input input-bordered w-full max-w-xs"
                   {...register("name", {
                     required: {
                       value: true,
                       message: " Name is required",
                     },
                   })}
                 />
                 <label class="label">
                   {errors.name?.type === "required" && (
                     <span class="label-text-alt text-red-500">
                       {errors.name.message}
                     </span>
                   )}
                 </label>
               </div>

               {/*  email input field */}
               <div class="form-control w-full max-w-xs">
                 <label class="label">
                   <span class="label-text">Email</span>
                 </label>
                 <input
                   type="email"
                   placeholder="Doctor Email"
                   class="input input-bordered w-full max-w-xs"
                   {...register("email", {
                     required: {
                       value: true,
                       message: " Email is required",
                     },
                     pattern: {
                       value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                       message: "Provide a valid email",
                     },
                   })}
                 />
                 <label class="label">
                   {errors.email?.type === "required" && (
                     <span class="label-text-alt text-red-500">
                       {errors.email.message}
                     </span>
                   )}
                   {errors.email?.type === "pattern" && (
                     <span class="label-text-alt  text-red-500">
                       {errors.email.message}
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