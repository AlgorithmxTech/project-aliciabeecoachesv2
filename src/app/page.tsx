"use client";

import React, { useState } from "react";
import { FaQuoteRight } from "react-icons/fa6";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Layout from "@/components/common/Layout";
import { Modal } from "antd";
import Link from "next/link";
export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      setEmail("");
      setIsModalOpen(true); // ✅ Show the modal on success
    } else {
      Modal.error({
        title: "Subscription Failed",
        content: data.error || "Something went wrong 😢",
      });
    }
    setLoading(false);
  };
  return (
    <>
      <Navbar />
      <Layout>
        <div className=" flex  px-5 md:px-0 flex-col gap-10 justify-center py-10">
          <h1 className="text-3xl font-black ">
            Unlock Your Career Potential in Tech
          </h1>
          <h1 className="text-2xl  dark:text-white text-black ">
            Hi, I&apos;m Alicia Bee — founder of Alicia Bee Coaches. I help
            women working in IT tech support confidently transition into
            business analyst roles with no college degree or coding experience
            required. Through my monthly membership program, you&apos;ll get the
            tools, support, and strategy to take control of your career path and
            land a salaried role in tech.
          </h1>

          <div className="flex flex-col">
            <span className="text-2xl text-start font-bold pb-3">
              Who It&apos;s For
            </span>
            <h1 className="text-xl">
              If you&apos;re a woman already working in IT support resetting
              passwords, troubleshooting systems, and helping users but you know
              you&apos;re capable of more, you&apos;re in the right place.
              Whether you&apos;re feeling stuck or just ready for your next
              move, I&apos;m here to help you grow into a career that offers
              more flexibility, better pay, and long-term growth.
            </h1>
            <span className=" pt-4 pb-3 font-bold text-2xl">What I Offer </span>
            <h1 className="text-xl">
              My signature 12-week learning plan includes:
            </h1>
            <ul className="px-10 list-disc py-5 text-xl">
              <li>
                Video training to build foundational business analyst skills
              </li>
              <li>A guided reading list and hands-on workbook </li>
              <li>Weekly live sessions to get your questions answered </li>
              <li>
                Immediate access to all materials so you can learn at your pace{" "}
              </li>
            </ul>
            <h1 className="py-5 text-xl">
              For small businesses training 2–10 business analysts, I offer
              private live sessions to support your team&apos;s growth with company
              specific topics. Members complete the program in three months —
              gaining clarity, confidence, and career direction.{" "}
            </h1>
            <span className="text-2xl text-start font-bold pb-3">
              {" "}
              Why This Matters{" "}
            </span>
            <h1 className="py-5 text-xl">
            With over 12 years of experience working alongside technical teams,
            I&apos;ve seen firsthand how women can thrive in tech when given the
            right support. The business analyst role offers flexibility,
            influence, and long-term stability — all without the need for a
            traditional tech background. I built this program to keep the gate
            open — because someone did the same for me. Ready to make your move?
            Let&apos;s start this journey together. Drop your email below or visit my
            links page. 
            </h1>
        
            
            <Link className="text-center underline text-xl text-blue-400"  href={"https://linktr.ee/AliciaBeeCoaches"}>
            https://linktr.ee/AliciaBeeCoaches
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex md:flex-row md:gap-0 gap-4 items-center justify-center flex-col my-5 md:px-0 px-10">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                className="bg-white border border-black text-black px-10 py-4 shadow-lg"
              />
              <button
                className="flex gap-3 items-center text-white py-5 px-5 bg-[#a40000]"
                type="submit"
                disabled={loading}
              >
                <hr className="w-5" />
                <span className="font-bold uppercase">
                  {loading ? "Subscribing..." : "Subscribe"}
                </span>
              </button>
            </div>
            {message && <p>{message}</p>}
          </form>

          {/* Testimonial Part */}
          <div className="flex md:flex-row flex-col px-5 md:px-0 justify-between gap-10 dark:text-white text-black items-center">
            <div>
              <FaQuoteRight size={44} className="text-[#a40000]" />
              <h1 className="text-xl">
                &quot;Thank you for sharing your light with me! Our session was
                awesome and your suggestions were much appreciated!&quot;
              </h1>

              <div className="flex py-5 flex-col">
                <span className="font-bold">Jamillah K.</span>
              </div>
            </div>

            <div>
              <FaQuoteRight size={44} className="text-[#a40000]" />
              <h1 className="text-xl">
                “I&apos;m so grateful to have met you!
                <br /> You were able to identify where I needed help the most
                and suggest the tools I needed to get me there. Working with you
                has given me the push to keep going on this IT path. Thank you!”
              </h1>

              <div className="flex py-5 flex-col">
                <span className="font-bold">Chrystal M.</span>
              </div>
            </div>

            <div>
              <FaQuoteRight size={44} className="text-[#a40000]" />
              <h1 className="text-xl">
                “Thank you for sharing your light with me! Our session was
                awesome and your suggestions were much appreciated!”
              </h1>

              <div className="flex py-5 flex-col">
                <span className="font-bold">Daniella Y.</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Footer />

      <Modal
        title="Thank you!"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        okText="Close"
      >
        <p>You have successfully subscribed 🎉</p>
      </Modal>
    </>
  );
}
