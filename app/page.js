"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const goToLogin=()=>{
    router.push('/login')
  }
  
  return (
    <>
      <div className=" text-white h-[81vh] flex flex-col justify-center items-center gap-7">
        <div className="flex justify-center items-center">
          <h1 className="text-7xl text-white font-bold font-sans">Get Me A Chai </h1>
          <img src="tea.gif" alt="" className="w-20" />
        </div>
        <p>A Crowdfunding platform for creaters. Get funded by your fans and followers. Start Now!</p>
        <div onClick={goToLogin} className="buttons readMore startHere flex items-center gap-3">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Start Here</button>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Read More</button>
        </div>
      </div>

      <div className="break w-full h-1 bg-white opacity-20 mt-16"></div>

{/* fans can buy------------------------------------------------------------------- */}
      <div className="text-white py-14">
        <h2 className="text-center text-2xl font-bold pb-14">Your fans can buy you a chai</h2>
        <div className="flex flex-col gap-10 lg:gap-0 lg:flex-row justify-evenly items-center">
          <div className="flex flex-col items-center gap-3">
            <img src="/clientMoney.gif" alt="" className="rounded-full w-20" />
            <h3>Fund Yourself</h3>
            <p>your fans are available to help you</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img src="/dollar.gif" alt="" className="rounded-full w-20" />
            <h3>Fund Yourself</h3>
            <p>your fans are available to help you</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img src="/group.gif" alt="" className="rounded-full w-20" />
            <h3>Fans want to help</h3>
            <p>your fans are available to help you</p>
          </div>
        </div>
      </div>

      <div className="break w-full h-1 bg-white opacity-20"></div>

{/* about us -------------------------------------------------------------------- */}
      <div className="text-white py-14 w-[95%] text-center mx-auto">
        <h2 className="text-center text-2xl font-bold pb-10">Learn More about us</h2>
        <div className="flex flex-col gap-10 items-center text-sm">
          <div className="">
            <p>At Get Me A Chai, we are dedicated to supporting developers, creators, and influencers by connecting them with their supporters. Our platform enables individuals to fund their projects and ideas, providing a space where creativity and innovation can thrive.</p>
          </div>
          <div className="">
            <p>Our mission is to empower talented individuals by facilitating financial support, allowing them to focus on what they do best – creating. Whether you're a developer coding the next big app, a content creator making engaging videos, or an influencer sharing your passion, Get Me A Chai is here to help you achieve your goals.</p>
          </div>
          <div className="">
            <p>We believe in the power of community and the impact of collective support. By providing a platform for patrons to contribute, we aim to transform dreams into reality and foster a culture of creativity and innovation.</p>
          </div>
        </div>
      </div>


    </>
  );
}
