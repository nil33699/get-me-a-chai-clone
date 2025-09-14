"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { initiate, fetchUser, fetchPayments } from '@/actions/userAction'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = ({ username }) => {

  const [paymentForm, setPaymentForm] = useState({ name: "", message: "", amount: "" })
  const [currentUser, setcurrentUser] = useState({})
  const [payment, setPayment] = useState([])

  const searchParams = useSearchParams();

  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
  }

  useEffect(() => {

    getData();

  }, [])

  useEffect(() => {

    if (searchParams.get("paymentdone") == "true") {

      toast('Thanks for Donation 😊', {
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
    }

  }, [])

  const getData = async () => {
    let u = await fetchUser(username);
    setcurrentUser(u);

    let p = await fetchPayments(username);
    setPayment(p);
    return u;

  }


  const pay = async (amount) => {

    let a = await initiate(amount, username, paymentForm)
    let orderId = a.id;

    var options = {
      "key": process.env.NEXT_PUBLIC_key_ID,
      "amount": amount,
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderId,
      "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();

  }

  return (
    <div>
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
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        <div className='profile flex flex-col text-white'>

          <div className="relative w-full h-[60vh] bg-slate-500">
            <img src={currentUser.coverPicture} alt="" className='w-full bg-contain h-full' />
            <div className=' absolute -bottom-16 left-[43.8%] w-[170px] h-[170px]'>
              <img src={`${currentUser.profilePicture}`} alt="" className='w-full h-full object-cover object-center rounded-lg border-2 border-white' />
            </div>
            <div className='flex flex-col justify-center items-center gap-1 py-20'>
              <h3 className='text-3xl'>@{username}</h3>
              <p className='text-sm text-gray-200 pt-2'>Creating custom photomode software for games</p>
              <p className='text-sm text-gray-400'>5,027 paid members  &bull;  57 posts</p>
            </div>
          </div>
          {/* ----------------------------------------------------------------------------------------- */}
          <div className='flex flex-col md:flex-row items-center justify-center gap-3 mt-52 px-4 md:px-12 pb-12 text-white'>

            <div className='w-full md:w-1/2 bg-slate-900 min-h-[330px] rounded-lg px-7 order-2 md:order-1'>
              <h2 className='text-3xl pt-7 pb-5'>Supporters</h2>
              <div className='flex flex-col gap-4'>
                {payment.length == 0 ? (<div>No Payments Yet</div>) : (
                  
                    payment.map((v, i) => {
                      return (
                        <div className='flex items-center gap-3' key={v.oid}>
                          <img src="/avatar-jumping.gif" alt="" className='w-7 h-7 rounded-full border-2 border-black' />
                          <span className='text-[15px]'>{v.name} donated<span className='font-bold'> {v.amount} </span> with a message "{v.message}"</span>
                        </div>
                      )
                    })
                  )
                }

              </div>

            </div>
            {/* -----------------------------------------------f-o-r-m----------------------------- */}
            <div className='w-full md:w-1/2 bg-slate-900 min-h-[330px] rounded-lg px-7 order-1 md:order-2'>

              <h2 className='text-3xl pt-7 pb-5'>Make a Payment</h2>
              <div>
                <div className='flex flex-col gap-2'>
                  <input onChange={(e) => handleChange(e)} type="text" name="name" id="name" placeholder='Enter Name' className='text-sm p-2 rounded-lg h-8 bg-slate-700 ' />
                  <input onChange={(e) => handleChange(e)} type="text" name="message" id="message" placeholder='Enter Message' className='text-sm p-2 rounded-lg h-8 bg-slate-700 ' />
                  <input onChange={(e) => handleChange(e)} type="text" name="amount" id="amount" placeholder='Enter Amount' className='text-sm p-2 rounded-lg h-8 bg-slate-700 ' />
                  <button onClick={() => pay(Number.parseInt(paymentForm.amount))} disabled={paymentForm.name?.length < 3 || paymentForm.message?.length < 4 || paymentForm.amount?.length < 2} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100"><input type="submit" value="Pay" /></button>
                </div>
                <div className='flex flex-row flex-wrap mt-1 gap-2'>
                  <span onClick={() => pay(10)} className='bg-slate-700 px-2 py-2 rounded-lg text-sm cursor-pointer'>Pay $10</span>
                  <span onClick={() => pay(20)} className='bg-slate-700 px-2 py-2 rounded-lg text-sm cursor-pointer'>Pay $30</span>
                  <span onClick={() => pay(50)} className='bg-slate-700 px-2 py-2 rounded-lg text-sm cursor-pointer'>Pay $50</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </>
    </div>
  )
}

export default PaymentPage
