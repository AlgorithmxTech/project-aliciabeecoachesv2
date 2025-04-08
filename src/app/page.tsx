"use client"

import React, { useState } from "react";
import { FaQuoteRight } from "react-icons/fa6";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Layout from "@/components/common/Layout";
import { Modal } from "antd";
export default function Home() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()
    if (res.ok) {
      setEmail('')
      setIsModalOpen(true)  // ✅ Show the modal on success
    } else {
      Modal.error({
        title: 'Subscription Failed',
        content: data.error || 'Something went wrong 😢',
      });
    }
    setLoading(false)
  }
  return (
<>
<Navbar/>
<Layout>


<div className=" flex items-center px-5 md:px-0 flex-col gap-10 justify-center py-10">

  <h1 className="text-4xl py-20 text-center bg-gradient-to-r  dark:from-white from-black to-red-500 text-transparent bg-clip-text italic ">
  I&apos;m Alicia Bee, founder of Alicia Bee Coaches. I specialize in helping women with 5+ years of work experience transition into fulfilling tech careers - no college degree or coding experience required. Through my weekly live sessions on You Tube and resources in my community on Patreon, I provide practical guidance to help you take control of your career path. 

Ready to start your journey into tech? Connect with me and let&apos;s begin!

  </h1>

  <h1 className="dark:text-white text-black md:px-20 px-5 text-center text-xl uppercase">
  Take my 45-minute webinar to evaluate if a tech role should be your next move.

It&apos;s designed to evaluate your analytical skills and help you explore your options. 

This webinar is available with the basic membership level on my Patreon site,

which includes a 7-day free trial, click here to register.
  </h1>
<form onSubmit={handleSubmit}>
<div className="flex md:flex-row md:gap-0 gap-4 flex-col my-5 md:px-0 px-10">
    <input
    type="email" 
    value={email} 
    onChange={handleEmailChange} 
    placeholder="Enter Your Email"
    className="bg-white border border-black text-black px-10 py-4 shadow-lg"
    />
    <button className="flex gap-3 items-center py-5 px-5 bg-red-500"
       type="submit"
       disabled={loading}>
      <hr className="w-5"/>
      <span className="font-bold uppercase">{loading ? 'Subscribing...' : 'Subscribe'}</span>
    </button>

  </div>
  {message && <p>{message}</p>}
</form>


  {/* Testimonial Part */}
  <div className="flex md:flex-row flex-col px-5 md:px-0 justify-between gap-10 dark:text-white text-black items-center">
    <div>
      <FaQuoteRight size={44} className="text-red-500" />
      <h1 className="text-2xl">
      &quot;Thank you for sharing your light with me! Our session was awesome and your suggestions were much appreciated!&quot;
      </h1>

      <div className="flex py-5 flex-col">
        <span className="font-bold">Jamillah K</span>
        <span>client</span>
      </div>
    </div>

    <div>
      <FaQuoteRight size={44} className="text-red-500" />
      <h1 className="text-2xl">
      “I&apos;m so grateful to have met you!<br/> You were able to identify where I needed help the most and suggest the tools I needed to get me there. Working with you has given me the push to keep going on this IT path. Thank you!”
      </h1>

      <div className="flex py-5 flex-col">
        <span className="font-bold">Chrystal M.</span>
        <span>client</span>
      </div>
    </div>


    <div>
      <FaQuoteRight size={44} className="text-red-500" />
      <h1 className="text-2xl">
      “Thank you for sharing your light with me! Our session was awesome and your suggestions were much appreciated!”
      </h1>

      <div className="flex py-5 flex-col">
        <span className="font-bold">Daniella Y.</span>
        <span>client</span>
      </div>
    </div>
  </div>
</div>
</Layout>
<Footer/>

<Modal
        title="Thank you!"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        okText="Close"
      >
        <p>You have successfully subscribed  🎉</p>
      </Modal>
</>



  
  );
}