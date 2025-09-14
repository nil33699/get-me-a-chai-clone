"use client"
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useForm , SubmitHandler } from 'react-hook-form'
import { updateProfile } from '@/actions/userAction'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

const Dashboard = () => {
  const { data: session ,status} = useSession();

  const {
    register ,
    handleSubmit,
    watch,
    formState:{errors , isSubmitting}
  } = useForm()

  const submit = async (data) => {
    if (!session?.user?.name) {
      console.log("User not found");
      return;
    }

    console.log("Submitting Data: ", data); // 🔍 Debugging



    try {
      const response = await updateProfile(data, session.user.name);

      toast('Updated Successfully !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });



    } catch (error) {
      console.error("Update failed:", error);
      alert("Profile update failed. Please try again.");
    }
};

  const router = useRouter()

  useEffect(() => {
    if (status==="unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  return (
    <>
    <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />

    <div>{isSubmitting && <div>Loading...</div>}</div>
    <div className='text-white pt-3 pb-10'>
      <h1 className='text-2xl text-center pb-3'>Welcome to your Dashboard</h1>

      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3 justify-center items-center text-sm">
        
        {/* name */}
        <div className="flex flex-col w-1/3">
          <label htmlFor="name" className="text-left">Name</label>
          <input type="text" id="name" {...register("name",{required:true , minLength:{value:3,message:"must be greater than 3"}})} className=" mt-1 p-2 rounded-lg h-8 text-white bg-slate-700 " />
          {errors.name && <div className='text-red-500 text-sm pt-3'>{errors.name.message}</div>}
        </div>

        {/* email */}
        <div className="flex flex-col w-1/3">
          <label htmlFor="email" className="text-left">Email</label>
          <input type="text" id="email" defaultValue={session?.user?.email} {...register("email",{required:true , minLength:{value:3,message:"must be greater than 3"}})} className=" mt-1 p-2 rounded-lg h-8 text-white bg-slate-700 " />
          {errors.email && <div className='text-red-500 text-sm pt-3'>{errors.email.message}</div>}
        </div>
        
        {/* username */}
        <div className="flex flex-col w-1/3">
          <label htmlFor="username" className="text-left">Username</label>
          <input type="text" id="username" {...register("username",{required:true , minLength:{value:3,message:"must be greater than 3"}})} className=" mt-1 p-2 rounded-lg h-8 text-white bg-slate-700 " />
          {errors.username && <div className='text-red-500 text-sm pt-3'>{errors.username.message}</div>}
        </div>

        {/* profile picture */}
        <div className="flex flex-col w-1/3">
          <label htmlFor="profilePicture" className="text-left">Profile Picture</label>
          <input type="text" id="profilePicture" {...register("profilePicture",{required:true , minLength:{value:3,message:"must be greater than 3"}})} className=" mt-1 p-2 rounded-lg h-8 text-white bg-slate-700 " />
          {errors.profilePicture && <div className='text-red-500 text-sm pt-3'>{errors.profilePicture.message}</div>}
        </div>

        {/* cover picture */}
        <div className="flex flex-col w-1/3">
          <label htmlFor="coverPicture" className="text-left">Cover Picture</label>
          <input type="text" id="coverPicture" {...register("coverPicture",{required:true , minLength:{value:3,message:"must be greater than 3"}})} className=" mt-1 p-2 rounded-lg h-8 text-white bg-slate-700 " />
          {errors.coverPicture && <div className='text-red-500 text-sm pt-3'>{errors.coverPicture.message}</div>}
        </div>

        {/* razorpayId */}
        <div className="flex flex-col w-1/3">
          <label htmlFor="razorpayID" className="text-left">Razorpay ID</label>
          <input type="text" id="razorpayID" {...register("razorpayID",{required:true , minLength:{value:3,message:"must be greater than 3"}})} className=" mt-1 p-2 rounded-lg h-8 text-white bg-slate-700 " />
          {errors.razorpayID && <div className='text-red-500 text-sm pt-3'>{errors.razorpayID.message}</div>}
        </div>

        {/* razorpay Secret */}
        <div className="flex flex-col w-1/3">
          <label htmlFor="razorpaySecret" className="text-left">Razorpay Secret</label>
          <input type="text" id="razorpaySecret" {...register("razorpaySecret",{required:true , minLength:{value:3,message:"must be greater than 3"}})} className=" mt-1 p-2 rounded-lg h-8 text-white bg-slate-700 " />
          {errors.razorpaySecret && <div className='text-red-500 text-sm pt-3'>{errors.razorpaySecret.message}</div>}
        </div>
        <div className='w-1/3 mt-3'>
          <button disabled={isSubmitting} className='text-white bg-blue-800 w-full h-8 rounded-lg'><input type="submit" value="Save" /></button>
        </div>
      </form>


    </div>
    </>
  )
}

export default Dashboard
