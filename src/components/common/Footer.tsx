import React from 'react'
import { FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa6'
import petrionImage from '../../../public/images/patrion_icon.svg'
import Image from 'next/image'
import Link from 'next/link'
const Footer = () => {
    return (
        <div className='w-full bg-gray-900 py-10 text-white'>
            <div className='max-w-[1080px] mx-auto flex flex-col items-center gap-5'>
                <div className='flex items-center flex-col'>
                    <span>
                        Alice Bee Coaches
                    </span>
                    <span>
                        hello@alicebeecoaches.com
                    </span>
                    <span>6600 Chase Oaks Blvd., Ste, 150 </span>
                    <span>Plano, TX 75023</span>
                </div>
                {/* social media links */}
                <div className='flex gap-5 '>
                    <div className='rounded-full p-2 bg-[#a40000]'>
                        <Link href={'https://www.tiktok.com/@aliciabeecoaches'}>
                            <FaTiktok size={24} className='text-black' />
                  
                        </Link>

                    </div>
                    <div className='rounded-full p-2 bg-[#a40000]'>
                        <Link href={'https://instagram.com/AliciaBeeCoaches'}>

                            <FaInstagram size={24} className=' text-black' />
                        </Link>
                    </div>
                    <div className='rounded-full p-2 bg-[#a40000]'>
                        <Link href={'https://www.youtube.com/@AliciaBeeCoaches'}>

                            <FaYoutube size={24} className=' text-black' />
                        </Link>
                    </div>
                    <div className='rounded-full p-2 bg-[#a40000]'>
                        <Link href={'https://www.patreon.com/AliciaBeeCoaches'}>
                        <Image
                            src={petrionImage}
                            alt='patreon_logo'
                            className='w-[24px] h-[24px]'
                        />
                        </Link>
                      
                    </div>

                </div>

                <div className="flex flex-col py-5 justify-between w-full items-center">
                    <span>©2025 by ABC&apos;s of Agile with Alicia Bee Coaches.</span>
                    <span>
                        Developed by{' '}
                        <a
                            href="https://www.algorithmx.tech/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Algorithmx
                        </a>
                    </span>
                </div>


            </div>

        </div>
    )
}

export default Footer