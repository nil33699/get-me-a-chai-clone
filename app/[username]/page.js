import React from 'react'
import PaymentPage from '@/components/paymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import { User } from '@/models/userDashShema'

const profile = async ({ params }) => {
  const checkUser = async () => {
    await connectDb()
    let u = await User.findOne({ username: params.username })
    if (!u) {
      return notFound()
    }
  }
  await checkUser()
  
  return (
    <>
      <PaymentPage username={params.username}/>
    </>
  )
}

export default profile

export async function generateMetadata({params}) {
  return {
    title:`${params.username} - You are We are `,
    description:"You guys are ready for extreme fun ",
  }
}
